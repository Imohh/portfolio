import { useEffect, useRef, useState } from "react";
import { Renderer, Program, Mesh, Triangle, Texture, Flowmap, Vec2 } from "ogl";
import { gsap, ScrollTrigger, prefersReducedMotion } from "../../lib/smooth";
import portrait from "../../Assets/opt/portrait.jpg";

const vertex = /* glsl */ `
  attribute vec2 uv;
  attribute vec2 position;
  varying vec2 vUv;
  void main() { vUv = uv; gl_Position = vec4(position, 0.0, 1.0); }
`;

/*
 * One full-stage fragment shader composes the whole hero:
 *   page background -> giant name (offscreen 2D canvas texture) -> lime disc -> the person
 * The source photo is a purple disc on a navy card. Both are colour-keyed: navy becomes transparent,
 * purple becomes acid lime. That gives real depth: the name sits *behind* his head and shoulders,
 * turns ink-black where it crosses the lime disc, and the whole stack is smeared by one shared
 * flowmap, so letters and portrait ripple together around the cursor.
 */
const fragment = /* glsl */ `
  precision highp float;
  uniform sampler2D tPhoto;
  uniform sampler2D tText;
  uniform sampler2D tFlow;
  uniform float uTime;
  uniform float uScroll;
  uniform float uInPortrait;
  uniform float uIn1;
  uniform float uIn2;
  uniform vec4 uRect;   // portrait rect in uv space (x0, y0, x1, y1), y up
  uniform vec4 uBands;  // vertical extents of the two name lines in uv space
  varying vec2 vUv;

  const vec3 BG   = vec3(0.031, 0.031, 0.039);
  const vec3 LIME = vec3(0.745, 1.0, 0.333);

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
  }

  struct Shot { vec3 col; float disc; float person; float inside; };

  Shot shoot(vec2 uv) {
    vec2 pu = (uv - uRect.xy) / (uRect.zw - uRect.xy);
    float inside = step(0.0, pu.x) * step(pu.x, 1.0) * step(0.0, pu.y) * step(pu.y, 1.0);
    vec3 c = texture2D(tPhoto, clamp(pu, 0.0, 1.0)).rgb;
    float lum = dot(c, vec3(0.299, 0.587, 0.114));
    float purple = clamp((min(c.r, c.b) - c.g) * 4.0, 0.0, 1.0);
    float navy = clamp((c.b - max(c.r, c.g) - 0.02) * 18.0, 0.0, 1.0) * (1.0 - purple);

    vec3 disc = LIME * clamp(lum / 0.41, 0.25, 1.15);
    disc *= 0.82 + 0.28 * smoothstep(1.1, 0.0, distance(pu, vec2(0.34, 0.72)));
    vec3 person = mix(c, c * c * (3.0 - 2.0 * c), 0.25);

    Shot s;
    s.col = mix(person, disc, purple);
    s.disc = purple * inside;
    s.person = (1.0 - purple) * (1.0 - navy) * inside;
    s.inside = inside;
    return s;
  }

  float band(float y, vec2 b) { return smoothstep(b.x - 0.0015, b.x, y) * (1.0 - smoothstep(b.y, b.y + 0.0015, y)); }

  void main() {
    vec3 flow = texture2D(tFlow, vUv).rgb;
    float speed = length(flow.xy);
    vec2 breathe = vec2(noise(vUv * 3.0 + uTime * 0.15), noise(vUv * 3.0 - uTime * 0.12)) - 0.5;

    // portrait layer (parallaxes slower than the type)
    vec2 pUv = vUv - flow.xy * 0.085 - breathe * 0.005;
    pUv.y -= uScroll * 0.07;
    vec2 split = flow.xy * 0.03;
    Shot a = shoot(pUv + split);
    Shot b = shoot(pUv);
    Shot c = shoot(pUv - split);
    // only split channels where the offset sample is still inside the photo (no fringe at the rect edge)
    vec3 pc = vec3(a.inside > 0.5 ? a.col.r : b.col.r, b.col.g, c.inside > 0.5 ? c.col.b : b.col.b);

    float rag = noise(vec2(vUv.x * 7.0, 1.7)) * 0.22;
    float wipe = smoothstep(0.0, 0.07, uInPortrait * 1.3 - (1.0 - vUv.y) * 0.9 - rag);

    // type layer: each line slides up inside its own mask
    vec2 tUv = vUv - flow.xy * 0.13 - breathe * 0.008;
    tUv.y -= uScroll * 0.16;
    float h1 = uBands.y - uBands.x;
    float h2 = uBands.w - uBands.z;
    vec2 t1 = vec2(tUv.x, tUv.y - (1.0 - uIn1) * h1 * 1.25);
    vec2 t2 = vec2(tUv.x, tUv.y - (1.0 - uIn2) * h2 * 1.25);
    float T1 = texture2D(tText, t1).a * band(tUv.y, uBands.xy) * band(t1.y, uBands.xy);
    float T2 = texture2D(tText, t2).a * band(tUv.y, uBands.zw) * band(t2.y, uBands.zw);
    float T = max(T1, T2);

    // compose
    vec3 col = BG;
    col = mix(col, vec3(0.96), T);
    col = mix(col, mix(pc, BG, T), b.disc * wipe);
    col = mix(col, pc, b.person * wipe);

    // heat bloom where the paint moves fastest, plus film grain
    col += LIME * smoothstep(0.4, 1.3, speed) * 0.14;
    col += (hash(vUv * 900.0 + fract(uTime) * 40.0) - 0.5) * 0.04;

    gl_FragColor = vec4(col, 1.0);
  }
`;

/** Where everything sits, in CSS pixels of the stage (y runs down). */
function layout(W, H) {
  const mobile = W < 760;
  let f1, f2, x, yb1, yb2;
  if (mobile) {
    // lock-up: both words justified to the same measure
    f1 = (W * 0.9) / 2.62;
    f2 = (W * 0.9) / 5.32;
    x = W * 0.05;
    yb1 = H * 0.27 + f1 * 0.76;
    yb2 = yb1 + f2 * 1.05;
  } else {
    f1 = f2 = Math.min(W * 0.14, H * 0.3);
    x = W * 0.045;
    yb1 = H * 0.56;
    yb2 = yb1 + f1 * 0.86;
  }
  const pw = mobile ? W * 0.82 : Math.min(W * 0.34, H * 0.96 * 0.886);
  const ph = pw / 0.886;
  const px = mobile ? W * 0.16 : W * 0.965 - pw;
  // on phones the head must clear the name, so the portrait starts below the second line
  const py = mobile ? Math.max(yb2 + f2 * 0.2, H - ph + H * 0.03) : H - ph;
  return { f1, f2, x, yb1, yb2, rect: [px / W, 1 - (py + ph) / H, (px + pw) / W, 1 - py / H] };
}

function drawName(canvas, W, H, dpr, L) {
  canvas.width = Math.min(4096, Math.round(W * dpr));
  canvas.height = Math.min(4096, Math.round(H * dpr));
  const ctx = canvas.getContext("2d");
  ctx.setTransform(canvas.width / W, 0, 0, canvas.height / H, 0, 0);
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = "#fff";
  ctx.textBaseline = "alphabetic";
  const draw = (str, size, x, y) => {
    ctx.font = `800 ${size}px "Bricolage Grotesque", "Arial Black", sans-serif`;
    if ("letterSpacing" in ctx) ctx.letterSpacing = `${(-0.045 * size).toFixed(2)}px`;
    ctx.fillText(str, x, y);
  };
  draw("IMOH", L.f1, L.x, L.yb1);
  draw("PRECIOUS", L.f2, L.x, L.yb2);
  const cap = 0.76;
  return [
    1 - (L.yb1 + L.f1 * 0.08) / H, 1 - (L.yb1 - L.f1 * cap) / H,
    1 - (L.yb2 + L.f2 * 0.08) / H, 1 - (L.yb2 - L.f2 * cap) / H,
  ];
}

export default function HeroGL({ ready }) {
  const wrap = useRef(null);
  const canvas = useRef(null);
  const uniforms = useRef(null);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    let renderer;
    try {
      renderer = new Renderer({ canvas: canvas.current, dpr: Math.min(window.devicePixelRatio || 1, 1.5), alpha: false, antialias: false });
    } catch (e) {
      setFallback(true);
      return undefined;
    }
    const gl = renderer.gl;
    const flowmap = new Flowmap(gl, { size: 256, falloff: 0.2, alpha: 0.9, dissipation: 0.965 });

    const photo = new Texture(gl, { minFilter: gl.LINEAR, generateMipmaps: false });
    const img = new Image();
    img.onload = () => { photo.image = img; };
    img.src = portrait;

    const textCanvas = document.createElement("canvas");
    const text = new Texture(gl, { image: textCanvas, minFilter: gl.LINEAR, generateMipmaps: false });

    const program = new Program(gl, {
      vertex, fragment,
      uniforms: {
        tPhoto: { value: photo }, tText: { value: text }, tFlow: flowmap.uniform,
        uTime: { value: 0 }, uScroll: { value: 0 },
        uInPortrait: { value: 0 }, uIn1: { value: 0 }, uIn2: { value: 0 },
        uRect: { value: [0, 0, 1, 1] }, uBands: { value: [0, 0, 0, 0] },
      },
    });
    uniforms.current = program.uniforms;
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

    const build = () => {
      if (!wrap.current) return;
      const W = wrap.current.clientWidth;
      const H = wrap.current.clientHeight;
      if (!W || !H) return;
      renderer.setSize(W, H);
      flowmap.aspect = W / H;
      const L = layout(W, H);
      program.uniforms.uRect.value = L.rect;
      program.uniforms.uBands.value = drawName(textCanvas, W, H, renderer.dpr, L);
      text.image = textCanvas;
      text.needsUpdate = true;
    };
    let alive = true;
    // the name is rasterised with the web font, so redraw once it has loaded
    (document.fonts ? document.fonts.load('800 100px "Bricolage Grotesque"') : Promise.resolve()).then(() => alive && build());
    build();
    const ro = new ResizeObserver(build);
    ro.observe(wrap.current);

    // pointer -> flowmap
    const mouse = new Vec2(-1);
    const velocity = new Vec2();
    const last = { x: 0, y: 0, t: 0, has: false };
    let lastMove = performance.now();
    let moved = false;
    const clamp = (v) => Math.max(-1.6, Math.min(1.6, v));

    const feed = (cx, cy, t) => {
      if (!wrap.current) return;
      const r = wrap.current.getBoundingClientRect();
      const x = cx - r.left;
      const y = cy - r.top;
      mouse.set(x / r.width, 1 - y / r.height);
      if (!last.has) { last.x = x; last.y = y; last.t = t; last.has = true; }
      const dt = Math.max(10.4, t - last.t);
      velocity.set(clamp((x - last.x) / dt), clamp(-(y - last.y) / dt));
      last.x = x; last.y = y; last.t = t;
      moved = true;
    };
    const onMove = (e) => { lastMove = performance.now(); feed(e.clientX, e.clientY, lastMove); };
    const onTouch = (e) => { const p = e.touches[0]; if (p) { lastMove = performance.now(); feed(p.clientX, p.clientY, lastMove); } };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });

    const still = prefersReducedMotion();
    let visible = true;
    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; });
    io.observe(wrap.current);

    const scroll = ScrollTrigger.create({
      trigger: wrap.current, start: "top top", end: "bottom top",
      onUpdate: (self) => { program.uniforms.uScroll.value = self.progress; },
    });

    const tick = (time) => {
      if (!visible || !wrap.current) return;
      const t = time * 1000;
      program.uniforms.uTime.value = time;

      // idle "ghost" cursor so the paint is alive on touch screens and when the user pauses
      if (!still && t - lastMove > 2200) {
        const r = wrap.current.getBoundingClientRect();
        feed(r.left + r.width * (0.55 + 0.38 * Math.sin(time * 0.6)), r.top + r.height * (0.55 + 0.25 * Math.sin(time * 0.95 + 1.3)), t);
      }

      if (!moved) { mouse.set(-1); velocity.set(0); }
      moved = false;
      flowmap.mouse.copy(mouse);
      flowmap.velocity.lerp(velocity, velocity.len() ? 0.2 : 0.08);
      flowmap.update();
      renderer.render({ scene: mesh });
    };
    gsap.ticker.add(tick);

    return () => {
      alive = false;
      gsap.ticker.remove(tick);
      scroll.kill();
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  useEffect(() => {
    if (!ready || !uniforms.current) return undefined;
    const u = uniforms.current;
    const tl = gsap.timeline({ delay: 0.1 });
    tl.to(u.uIn1, { value: 1, duration: 1.5, ease: "expo.out" }, 0)
      .to(u.uIn2, { value: 1, duration: 1.5, ease: "expo.out" }, 0.14)
      .to(u.uInPortrait, { value: 1, duration: 2.1, ease: "power3.inOut" }, 0.25);
    return () => tl.kill();
  }, [ready]);

  return (
    <div ref={wrap} className="pf-stage__gl">
      {fallback ? (
        <div className="pf-stage__fallback"><img src={portrait} alt="Imoh Precious" /><b>Imoh<br />Precious</b></div>
      ) : (
        <canvas ref={canvas} role="img" aria-label="Imoh Precious" />
      )}
    </div>
  );
}
