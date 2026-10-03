import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle, Texture, Flowmap, Vec2 } from "ogl";
import { gsap, ScrollTrigger } from "../../lib/smooth";

const vertex = /* glsl */ `
  attribute vec2 uv;
  attribute vec2 position;
  varying vec2 vUv;
  void main() { vUv = uv; gl_Position = vec4(position, 0.0, 1.0); }
`;

/*
 * The footer is one lime sheet of paper. A deliberate hover near the type nudges a soft ink
 * well under the pointer, with a gentle liquid edge — calm by default, since this is also where
 * someone is reading how to actually reach out. Headline and wordmark rise in as the page above
 * peels away.
 */
const fragment = /* glsl */ `
  precision highp float;
  uniform sampler2D tText;
  uniform sampler2D tFlow;
  uniform float uTime;
  uniform float uIn1;
  uniform float uIn2;
  uniform vec4 uBands;   // headline (yMin, yMax), wordmark (yMin, yMax) in uv, y up
  varying vec2 vUv;

  const vec3 INK  = vec3(0.031, 0.031, 0.039);
  const vec3 LIME = vec3(0.745, 1.0, 0.333);

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
  }
  float band(float y, vec2 b) { return smoothstep(b.x - 0.0015, b.x, y) * (1.0 - smoothstep(b.y, b.y + 0.0015, y)); }

  float type(vec2 uv, float split) {
    float h1 = uBands.y - uBands.x;
    float h2 = uBands.w - uBands.z;
    vec2 a = vec2(uv.x + split, uv.y - (1.0 - uIn1) * h1 * 1.25);
    vec2 b = vec2(uv.x + split, uv.y - (1.0 - uIn2) * h2 * 1.25);
    float t1 = texture2D(tText, a).a * band(uv.y, uBands.xy) * band(a.y, uBands.xy);
    float t2 = texture2D(tText, b).a * band(uv.y, uBands.zw) * band(b.y, uBands.zw);
    return max(t1, t2);
  }

  void main() {
    vec3 flow = texture2D(tFlow, vUv).rgb;
    float energy = length(flow.xy);
    vec2 breathe = vec2(noise(vUv * 3.0 + uTime * 0.12), noise(vUv * 3.0 - uTime * 0.1)) - 0.5;

    // the ink: a soft field around the stroke with a gently liquid edge — a higher
    // threshold means a passing cursor no longer swathes the whole sheet, only a
    // deliberate lingering hover does
    float edgeNoise = noise(vUv * 14.0 + uTime * 0.4) * 0.07;
    float m = smoothstep(0.22, 0.3, energy + edgeNoise * energy);
    float rim = m * (1.0 - smoothstep(0.0, 0.55, m));

    vec2 tUv = vUv - flow.xy * 0.05 - breathe * 0.003;
    vec2 s = flow.xy * 0.012;
    vec3 T = vec3(type(tUv, s.x), type(tUv, 0.0), type(tUv, -s.x));

    vec3 onLime = mix(LIME, INK, T);
    vec3 onInk  = mix(INK, LIME, T);
    vec3 col = mix(onLime, onInk, m);

    col += vec3(1.0) * rim * 0.14;
    col += (hash(vUv * 900.0 + fract(uTime) * 40.0) - 0.5) * 0.02;
    gl_FragColor = vec4(col, 1.0);
  }
`;

const HEAD = ["Let’s build", "something", "extraordinary."];

function layout(W, H) {
  const mobile = W < 760;
  const g = Math.max(18, Math.min(32, W * 0.022));
  const f = mobile ? W * 0.14 : Math.min(W * 0.095, H * 0.15);
  const lead = 0.96;
  const y0 = (mobile ? 150 : H * 0.17) + f * 0.8;
  const fw = mobile ? W * 0.36 : Math.min(W * 0.24, H * 0.32);
  const markBase = H + fw * 0.04;
  return { mobile, g, f, lead, y0, fw, markBase, markH: fw * 0.76 };
}

function draw(canvas, W, H, dpr, L) {
  canvas.width = Math.min(4096, Math.round(W * dpr));
  canvas.height = Math.min(4096, Math.round(H * dpr));
  const ctx = canvas.getContext("2d");
  ctx.setTransform(canvas.width / W, 0, 0, canvas.height / H, 0, 0);
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = "#fff";
  ctx.textBaseline = "alphabetic";
  const font = (style, weight, size, family) => {
    ctx.font = `${style} ${weight} ${size}px ${family}`;
  };
  const sans = '"Bricolage Grotesque", "Arial Black", sans-serif';
  const serif = '"Instrument Serif", Georgia, serif';
  const spacing = (px) => { if ("letterSpacing" in ctx) ctx.letterSpacing = `${px.toFixed(2)}px`; };

  HEAD.forEach((line, i) => {
    const y = L.y0 + i * L.f * L.lead;
    if (i < 2) { font("normal", 700, L.f, sans); spacing(-0.055 * L.f); }
    else { font("italic", 400, L.f * 1.04, serif); spacing(-0.01 * L.f); }
    ctx.fillText(line, L.g, y);
  });

  font("normal", 800, L.fw, sans);
  spacing(-0.06 * L.fw);
  ctx.textAlign = "center";
  ctx.fillText("IMOH", W / 2, L.markBase);
  ctx.textAlign = "left";

  const v = (y) => 1 - y / H;
  return [
    v(L.y0 + 2 * L.f * L.lead + L.f * 0.3), v(L.y0 - L.f * 0.78),
    v(H + 2), v(L.markBase - L.fw * 0.76),
  ];
}

/** Interactive ink canvas behind the footer UI. Only renders while the footer is being revealed. */
export default function FooterGL({ onFail }) {
  const wrap = useRef(null);
  const canvas = useRef(null);

  useEffect(() => {
    let renderer;
    try {
      renderer = new Renderer({ canvas: canvas.current, dpr: Math.min(window.devicePixelRatio || 1, 1.5), alpha: false, antialias: false });
    } catch (e) {
      onFail?.();
      return undefined;
    }
    const gl = renderer.gl;
    const foot = wrap.current.parentNode;
    // Tighter falloff (smaller stroke) and faster dissipation (settles sooner once
    // the pointer moves away) — this is the contact section, so the ink should
    // follow a deliberate hover, not linger or spread into a lasting distraction.
    const flowmap = new Flowmap(gl, { size: 256, falloff: 0.18, alpha: 1, dissipation: 0.94 });

    const textCanvas = document.createElement("canvas");
    const text = new Texture(gl, { image: textCanvas, minFilter: gl.LINEAR, generateMipmaps: false });
    const program = new Program(gl, {
      vertex, fragment,
      uniforms: {
        tText: { value: text }, tFlow: flowmap.uniform,
        uTime: { value: 0 }, uIn1: { value: 0 }, uIn2: { value: 0 }, uBands: { value: [0, 0, 0, 0] },
      },
    });
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

    const build = () => {
      if (!wrap.current) return;
      const W = wrap.current.clientWidth;
      const H = wrap.current.clientHeight;
      if (!W || !H) return;
      renderer.setSize(W, H);
      flowmap.aspect = W / H;
      const L = layout(W, H);
      foot.style.setProperty("--mark-h", `${Math.round(L.markH)}px`);
      program.uniforms.uBands.value = draw(textCanvas, W, H, renderer.dpr, L);
      text.image = textCanvas;
      text.needsUpdate = true;
      renderer.render({ scene: mesh }); // paint the lime sheet immediately; no black flash before the footer is revealed
    };
    let alive = true;
    const fonts = document.fonts
      ? Promise.all([document.fonts.load('700 100px "Bricolage Grotesque"'), document.fonts.load('italic 400 100px "Instrument Serif"')])
      : Promise.resolve();
    fonts.then(() => alive && build());
    build();
    const ro = new ResizeObserver(build);
    ro.observe(wrap.current);

    // pointer -> flowmap
    const mouse = new Vec2(-1);
    const velocity = new Vec2();
    const last = { x: 0, y: 0, t: 0, has: false };
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
    const onMove = (e) => feed(e.clientX, e.clientY, performance.now());
    const onTouch = (e) => { const p = e.touches[0]; if (p) feed(p.clientX, p.clientY, performance.now()); };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });

    const main = document.querySelector(".pf-main");
    let active = false;
    const root = document.documentElement;

    const triggers = [];
    if (main) {
      // render + steer the cursor/nav colours only while the footer is actually on screen
      triggers.push(ScrollTrigger.create({
        trigger: main, start: "bottom bottom", end: "bottom top",
        onToggle: (self) => { active = self.isActive; },
        onUpdate: (self) => root.classList.toggle("in-foot", self.progress > 0.55),
        onLeaveBack: () => root.classList.remove("in-foot"),
      }));
      // headline then wordmark rise as the curtain lifts
      const tl = gsap.timeline({ scrollTrigger: { trigger: main, start: "bottom bottom", end: "bottom top", scrub: 0.6 } });
      tl.fromTo(program.uniforms.uIn1, { value: 0 }, { value: 1, ease: "none", duration: 0.65 }, 0)
        .fromTo(program.uniforms.uIn2, { value: 0 }, { value: 1, ease: "none", duration: 0.65 }, 0.25);
      triggers.push(tl.scrollTrigger, tl);
    }

    const tick = (time) => {
      if (!active || !wrap.current) return;
      program.uniforms.uTime.value = time;

      // No idle auto-brush: this is the contact section, so the ink stays calm
      // — lime, legible, at rest — until someone actually reaches toward it.
      if (!moved) { mouse.set(-1); velocity.set(0); }
      moved = false;
      flowmap.mouse.copy(mouse);
      flowmap.velocity.lerp(velocity, velocity.len() ? 0.22 : 0.08);
      flowmap.update();
      renderer.render({ scene: mesh });
    };
    gsap.ticker.add(tick);

    return () => {
      alive = false;
      gsap.ticker.remove(tick);
      triggers.forEach((t) => t.kill());
      root.classList.remove("in-foot");
      ro.disconnect();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [onFail]);

  return (
    <div ref={wrap} className="pf-foot__gl" aria-hidden="true">
      <canvas ref={canvas} />
    </div>
  );
}
