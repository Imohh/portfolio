import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "../lib/smooth";

const LETTERS = ["I", "M", "O", "H"];
const WORDS = ["Interfaces", "Motion", "Systems", "Details", "Craft"];
const FONT = '"Bricolage Grotesque", "Arial Black", sans-serif';

/**
 * IMOH is cut out of an ink sheet, so the four letters are windows. Lime floods up behind them
 * on a rolling wave while the counter climbs; at 100 the lime drains away, the real hero
 * starts playing behind the windows, and the camera dives into the left wall of the O until that
 * one stroke is bigger than the screen and the site is simply there.
 */
function Pre({ onReveal, onDone }) {
  const root = useRef(null);
  const svg = useRef(null);
  const mask = useRef(null);
  const band = useRef(null);
  const clipG = useRef(null);
  const zoomG = useRef(null);
  const letterEls = useRef([]);
  const lime = useRef(null);
  const dark = useRef(null);
  const num = useRef(null);
  const wordEl = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      onReveal();
      gsap.set(root.current, { pointerEvents: "none" }); // see the same note below — the page is live now, stop blocking taps to it
      const t = gsap.to(root.current, { opacity: 0, duration: 0.5, delay: 0.3, onComplete: onDone });
      return () => t.kill();
    }

    let alive = true;
    let tl;

    const run = () => {
      const W = window.innerWidth;
      const H = window.innerHeight;
      const mobile = W < 760;

      // ---- measure the lettering with the real font
      const F = Math.min((W * (mobile ? 0.92 : 0.86)) / 2.62, (H * 0.62) / 0.74);
      const track = -0.045 * F;
      const cvs = document.createElement("canvas");
      const ctx = cvs.getContext("2d");
      ctx.font = `800 ${F}px ${FONT}`;
      const adv = LETTERS.map((c) => ctx.measureText(c).width);
      const total = adv.reduce((a, b) => a + b, 0) + track * (LETTERS.length - 1);
      const capH = ctx.measureText("H").actualBoundingBoxAscent;
      const baseline = H * 0.5 + capH * 0.5 - H * 0.025;
      let x = (W - total) / 2;
      const xs = adv.map((a) => { const cur = x; x += a + track; return cur; });

      // ---- find the middle of the O's left wall by scanning a row of its rasterised glyph
      const o = ctx.measureText("O");
      const asc = o.actualBoundingBoxAscent;
      const pad = Math.ceil(F * 0.1);
      cvs.width = Math.ceil(o.width + pad * 2);
      cvs.height = Math.ceil(asc + o.actualBoundingBoxDescent + pad * 2);
      const c2 = cvs.getContext("2d");
      c2.font = `800 ${F}px ${FONT}`;
      c2.fillStyle = "#000";
      c2.textBaseline = "alphabetic";
      c2.fillText("O", pad, pad + asc);
      const row = c2.getImageData(0, Math.round(pad + asc / 2), cvs.width, 1).data;
      let a = -1;
      let b = -1;
      for (let i = 0; i < cvs.width; i++) {
        const on = row[i * 4 + 3] > 128;
        if (on && a < 0) a = i;
        if (!on && a >= 0) { b = i; break; }
      }
      const wall = a >= 0 && b > a ? b - a : F * 0.2;
      const originX = xs[2] + ((a >= 0 ? (a + b) / 2 : pad + wall / 2) - pad);
      const originY = baseline - asc / 2;
      const S = Math.max(W, H) * 1.35 / wall; // the wall must outgrow the screen

      // ---- place everything
      svg.current.setAttribute("viewBox", `0 0 ${W} ${H}`);
      svg.current.querySelectorAll("[data-full]").forEach((el) => { el.setAttribute("width", W); el.setAttribute("height", H); });
      mask.current.setAttribute("width", W);
      mask.current.setAttribute("height", H);
      band.current.setAttribute("y", baseline - capH - F * 0.04);
      band.current.setAttribute("height", capH + F * 0.1);
      band.current.setAttribute("width", W);
      letterEls.current.forEach((el, i) => {
        el.setAttribute("x", xs[i]);
        el.setAttribute("y", baseline);
        el.setAttribute("font-size", F);
      });
      gsap.set(letterEls.current, { y: capH * 1.2 });
      gsap.set(root.current, { visibility: "visible" });

      // ---- the lime flood: one oversized layer rising by transform only (wave edges scroll via CSS)
      const prog = { v: 0 };
      const setLevel = gsap.quickSetter(lime.current, "yPercent");
      setLevel(112);

      let w = -1;
      const paint = () => {
        if (!num.current) return;
        setLevel(112 - prog.v * 114);
        num.current.textContent = String(Math.round(prog.v * 100)).padStart(3, "0");
        const idx = Math.min(WORDS.length - 1, Math.floor(prog.v * WORDS.length));
        if (idx !== w) {
          w = idx;
          wordEl.current.textContent = WORDS[idx];
          gsap.fromTo(wordEl.current, { yPercent: 100 }, { yPercent: 0, duration: 0.6, ease: "expo.out" });
        }
      };

      tl = gsap.timeline();
      tl.from(".pf-pre__meta > *", { yPercent: 110, duration: 0.9, ease: "expo.out", stagger: 0.07 }, 0)
        .to(letterEls.current, { y: 0, duration: 1.3, ease: "expo.out", stagger: 0.1 }, 0.15)
        .to(prog, { v: 1, duration: 2.7, ease: "power2.inOut", onUpdate: paint }, 0.5)
        // ---- the dive
        .to(".pf-pre__ui", { opacity: 0, duration: 0.35, ease: "power2.out" }, ">+=0.15")
        .add(() => {
          clipG.current.removeAttribute("clip-path");
          // The real page is live underneath from this exact moment, but this
          // overlay — opaque or not — still sits on top with no pointer-events
          // of its own set, so it keeps swallowing every tap for the ~2s dive
          // still ahead of it. Release it here, the same moment the page
          // actually becomes the thing to interact with.
          gsap.set(root.current, { pointerEvents: "none" });
          onReveal();                                  // hero starts playing behind the windows
        }, "<")
        .to([lime.current, dark.current], { opacity: 0, duration: 0.4, ease: "power1.out" }, "<0.05")
        .to(zoomG.current, { scale: S, svgOrigin: `${originX} ${originY}`, duration: 2.0, ease: "expo.in" }, "<0.1")
        .add(() => onDone());
    };

    const fonts = document.fonts ? document.fonts.load(`800 100px ${FONT}`) : Promise.resolve();
    Promise.race([fonts, new Promise((r) => setTimeout(r, 2500))]).then(() => alive && run());

    return () => {
      alive = false;
      tl?.kill();
    };
  }, [onDone, onReveal]);

  return (
    <div ref={root} className="pf-pre" style={{ visibility: "hidden" }}>
      <div ref={dark} className="pf-pre__dark" />
      <div ref={lime} className="pf-pre__lime">
        <svg className="pf-pre__wave pf-pre__wave--b" viewBox="0 0 1200 100" preserveAspectRatio="none"><path d="M0 40 Q150 0 300 40 T600 40 T900 40 T1200 40 V100 H0 Z" /></svg>
        <svg className="pf-pre__wave" viewBox="0 0 1200 100" preserveAspectRatio="none"><path d="M0 55 Q150 10 300 55 T600 55 T900 55 T1200 55 V100 H0 Z" /></svg>
      </div>

      <svg ref={svg} className="pf-pre__panel" aria-hidden="true" preserveAspectRatio="none">
        <defs>
          <clipPath id="pf-pre-band"><rect ref={band} x="0" /></clipPath>
          <mask id="pf-pre-mask" ref={mask} maskUnits="userSpaceOnUse" x="0" y="0">
            <rect data-full fill="#fff" />
            <g ref={clipG} clipPath="url(#pf-pre-band)">
              <g ref={zoomG} fill="#000" style={{ fontFamily: FONT, fontWeight: 800 }}>
                {LETTERS.map((c, i) => (
                  <text key={c} ref={(el) => { letterEls.current[i] = el; }}>{c}</text>
                ))}
              </g>
            </g>
          </mask>
        </defs>
        <rect data-full fill="#08080a" mask="url(#pf-pre-mask)" />
      </svg>

      <div className="pf-pre__ui">
        <div className="pf-pre__meta">
          <span>Imoh Precious</span>
          <span>Portfolio &mdash; {new Date().getFullYear()}</span>
          <span>Lagos, NG</span>
        </div>
        <div className="pf-pre__foot">
          <span className="pf-pre__mask"><span ref={wordEl} className="pf-pre__word">Interfaces</span></span>
          <span ref={num} className="pf-pre__num">000</span>
        </div>
      </div>
    </div>
  );
}

export default Pre;
