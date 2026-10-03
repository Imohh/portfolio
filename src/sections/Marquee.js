import { useEffect, useRef } from "react";
import { gsap, getLenis } from "../lib/smooth";

const Star = () => (
  <svg className="pf-marquee__star" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 0l2.2 8.1L22.4 6l-6 6 6 6-8.2-2.1L12 24l-2.2-8.1L1.6 18l6-6-6-6 8.2 2.1z" fill="currentColor" />
  </svg>
);

/** Infinite type band. Scroll velocity changes its speed, direction and skew. */
export default function Marquee({ items, base = 0.55 }) {
  const track = useRef(null);

  useEffect(() => {
    const el = track.current;
    const half = () => el.scrollWidth / 2;
    let x = 0;
    let dir = -1;
    const skewTo = gsap.quickTo(el, "skewX", { duration: 0.6, ease: "power3" });
    const tick = () => {
      const v = getLenis()?.velocity ?? 0;
      if (Math.abs(v) > 0.4) dir = v > 0 ? -1 : 1;
      x += dir * (base + Math.min(Math.abs(v), 60) * 0.35);
      const w = half();
      if (x <= -w) x += w;
      if (x > 0) x -= w;
      gsap.set(el, { x });
      skewTo(Math.max(-12, Math.min(12, v * -0.35)));
    };
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, [base]);

  const row = items.map((t, i) => (
    <span className="pf-marquee__item" key={i}>
      <span className={i % 2 ? "is-outline" : ""}>{t}</span>
      <Star />
    </span>
  ));

  return (
    <div className="pf-marquee" aria-hidden="true">
      <div ref={track} className="pf-marquee__track">{row}{row}{row}{row}</div>
    </div>
  );
}
