import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Plane, Texture } from "ogl";
import { gsap } from "../../lib/smooth";

const vertex = /* glsl */ `
  attribute vec2 uv;
  attribute vec3 position;
  uniform vec2 uRes;
  uniform vec2 uPos;
  uniform vec2 uSize;
  uniform vec2 uVel;
  uniform float uScale;
  uniform float uTime;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec2 p = vec2(position.x, -position.y); // screen y runs down
    float sp = length(uVel);

    // tilt with horizontal speed, then scale in
    float a = clamp(uVel.x * 0.0035, -0.3, 0.3);
    mat2 rot = mat2(cos(a), -sin(a), sin(a), cos(a));
    vec2 pix = uPos + rot * (p * uSize * uScale);

    // corners trail behind the motion, plus a travelling ripple perpendicular to it
    float lag = length(p) * 1.35;
    pix -= uVel * lag * 1.1;
    vec2 perp = sp > 0.001 ? vec2(-uVel.y, uVel.x) / sp : vec2(0.0);
    pix += perp * sin(uv.y * 6.2831 + uTime * 9.0) * min(sp, 60.0) * 0.12;

    gl_Position = vec4(pix.x / uRes.x * 2.0 - 1.0, 1.0 - pix.y / uRes.y * 2.0, 0.0, 1.0);
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  uniform sampler2D tA;
  uniform sampler2D tB;
  uniform float uAspA;
  uniform float uAspB;
  uniform float uMix;
  uniform vec2 uSize;
  uniform vec2 uVel;
  uniform float uAlpha;
  varying vec2 vUv;

  // cover-fit anchored to the top of the image (the screenshots are full-page)
  vec2 cover(vec2 uv, float img, float box) {
    vec2 r = vec2(1.0);
    if (img > box) r.x = box / img; else r.y = img / box;
    return uv * r + vec2((1.0 - r.x) * 0.5, 1.0 - r.y);
  }

  vec3 sampleMix(vec2 uv, float m) {
    float box = uSize.x / uSize.y;
    vec3 a = texture2D(tA, cover(uv + vec2(0.0, m * 0.05), uAspA, box)).rgb;
    vec3 b = texture2D(tB, cover(uv - vec2(0.0, (1.0 - m) * 0.05), uAspB, box)).rgb;
    return mix(a, b, smoothstep(0.0, 1.0, m));
  }

  void main() {
    vec2 shift = uVel / uSize * 0.5;
    vec3 col;
    col.r = sampleMix(vUv + shift, uMix).r;
    col.g = sampleMix(vUv, uMix).g;
    col.b = sampleMix(vUv - shift, uMix).b;

    // rounded corners via SDF
    float R = 14.0;
    vec2 q = abs(vUv - 0.5) * uSize - (uSize * 0.5 - R);
    float d = length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - R;
    float alpha = (1.0 - smoothstep(-1.0, 1.0, d)) * uAlpha;

    gl_FragColor = vec4(col * alpha, alpha);
  }
`;

/**
 * One fixed, full-viewport canvas that renders a single liquid plane following the cursor.
 * Rows in the work list just tell it which image to show.
 */
export default function WorkGL({ images, active }) {
  const canvas = useRef(null);
  const api = useRef({});

  useEffect(() => {
    let renderer;
    try {
      renderer = new Renderer({ canvas: canvas.current, alpha: true, premultipliedAlpha: true, dpr: Math.min(window.devicePixelRatio || 1, 2) });
    } catch (e) {
      return undefined;
    }
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);

    const blank = new Texture(gl, { image: new Uint8Array([8, 8, 10, 255]), width: 1, height: 1, generateMipmaps: false });
    const textures = images.map(() => ({ tex: new Texture(gl, { generateMipmaps: false, minFilter: gl.LINEAR }), aspect: 1, loaded: false, loading: false }));

    const program = new Program(gl, {
      vertex, fragment, transparent: true, depthTest: false, depthWrite: false, cullFace: false,
      uniforms: {
        tA: { value: blank }, tB: { value: blank },
        uAspA: { value: 1 }, uAspB: { value: 1 }, uMix: { value: 1 },
        uRes: { value: [1, 1] }, uPos: { value: [0, 0] }, uSize: { value: [360, 470] },
        uVel: { value: [0, 0] }, uScale: { value: 0 }, uAlpha: { value: 1 }, uTime: { value: 0 },
      },
    });
    const mesh = new Mesh(gl, { geometry: new Plane(gl, { width: 1, height: 1, widthSegments: 24, heightSegments: 24 }), program });

    const resize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      program.uniforms.uRes.value = [window.innerWidth, window.innerHeight];
      const w = Math.min(380, window.innerWidth * 0.3);
      program.uniforms.uSize.value = [w, w * 1.3];
    };
    resize();
    window.addEventListener("resize", resize);

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { x: target.x, y: target.y };
    const vel = { x: 0, y: 0 };
    const onMove = (e) => { target.x = e.clientX; target.y = e.clientY; };
    window.addEventListener("mousemove", onMove, { passive: true });

    const load = (i) => {
      const t = textures[i];
      if (t.loaded || t.loading) return;
      t.loading = true;
      const img = new Image();
      img.onload = () => { t.tex.image = img; t.aspect = img.naturalWidth / img.naturalHeight; t.loaded = true; };
      img.src = images[i];
    };

    let shown = null;
    const tick = (time) => {
      const u = program.uniforms;
      if (u.uScale.value < 0.002 && shown === null) return;
      // smoothed follow; velocity (px/frame) drives the liquid distortion
      const px = pos.x, py = pos.y;
      pos.x += (target.x - pos.x) * 0.14;
      pos.y += (target.y - pos.y) * 0.14;
      vel.x += ((pos.x - px) - vel.x) * 0.25;
      vel.y += ((pos.y - py) - vel.y) * 0.25;
      // sit beside the cursor rather than on it, so the row title stays readable
      const sz = u.uSize.value;
      u.uPos.value = [pos.x + sz[0] * 0.62, pos.y - sz[1] * 0.04];
      u.uVel.value = [Math.max(-90, Math.min(90, vel.x)), Math.max(-90, Math.min(90, vel.y))];
      u.uTime.value = time;
      // keep the sampler pointing at whichever images have finished loading
      const cur = shown;
      if (cur !== null && textures[cur].loaded) {
        const tb = textures[cur];
        if (u.uMix.value >= 1) { u.tA.value = tb.tex; u.uAspA.value = tb.aspect; }
        u.tB.value = tb.tex; u.uAspB.value = tb.aspect;
      }
      renderer.render({ scene: mesh });
    };
    gsap.ticker.add(tick);

    api.current.set = (idx) => {
      const u = program.uniforms;
      if (idx === null) {
        gsap.to(u.uScale, { value: 0, duration: 0.5, ease: "expo.inOut", onComplete: () => { shown = null; gl.clear(gl.COLOR_BUFFER_BIT); } });
        return;
      }
      load(idx);
      const prev = shown;
      shown = idx;
      gsap.killTweensOf(u.uScale);
      if (prev === null || u.uScale.value < 0.05) {
        u.uMix.value = 1;
        const tb = textures[idx];
        u.tA.value = tb.tex; u.uAspA.value = tb.aspect;
        pos.x = target.x; pos.y = target.y;
      } else {
        // freeze the outgoing image into slot A and wipe to the new one
        const tp = textures[prev];
        u.tA.value = tp.tex; u.uAspA.value = tp.aspect;
        u.uMix.value = 0;
        gsap.to(u.uMix, { value: 1, duration: 0.7, ease: "power3.inOut" });
      }
      gsap.to(u.uScale, { value: 1, duration: 0.9, ease: "expo.out" });
    };

    return () => {
      gsap.ticker.remove(tick);
      gsap.killTweensOf(program.uniforms.uScale);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [images]);

  useEffect(() => { api.current.set?.(active); }, [active]);

  return <canvas ref={canvas} className="pf-workgl" aria-hidden="true" />;
}
