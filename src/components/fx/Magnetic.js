import { useEffect, useRef } from "react";
import { gsap, isFinePointer } from "../../lib/smooth";

/** Pulls its child toward the pointer when it gets close, springs back on leave. */
export default function Magnetic({ children, strength = 0.35, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !isFinePointer()) return undefined;
    const inner = el.firstElementChild;
    const xTo = gsap.quickTo(el, "x", { duration: 0.9, ease: "elastic.out(1, 0.4)" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.9, ease: "elastic.out(1, 0.4)" });
    const ixTo = gsap.quickTo(inner, "x", { duration: 0.9, ease: "elastic.out(1, 0.4)" });
    const iyTo = gsap.quickTo(inner, "y", { duration: 0.9, ease: "elastic.out(1, 0.4)" });

    const move = (e) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      xTo(dx * strength);
      yTo(dy * strength);
      ixTo(dx * strength * 0.4);
      iyTo(dy * strength * 0.4);
    };
    const leave = () => { xTo(0); yTo(0); ixTo(0); iyTo(0); };
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", leave);
    };
  }, [strength]);

  return (
    <span ref={ref} className={`pf-magnetic ${className}`}>
      {children}
    </span>
  );
}
