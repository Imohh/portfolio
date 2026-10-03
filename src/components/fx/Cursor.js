import { useEffect, useRef } from "react";
import { gsap, isFinePointer } from "../../lib/smooth";

/**
 * Blend-mode cursor. Any element can opt in with data-cursor="Label";
 * links and buttons grow the ring automatically.
 */
export default function Cursor() {
  const ring = useRef(null);
  const label = useRef(null);

  useEffect(() => {
    if (!isFinePointer()) return undefined;
    const el = ring.current;
    const xTo = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3" });
    document.documentElement.classList.add("has-cursor");

    const move = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
      el.classList.add("is-on");
    };
    const over = (e) => {
      const t = e.target.closest?.("[data-cursor], a, button, input, textarea");
      const text = t?.getAttribute?.("data-cursor");
      el.classList.toggle("is-link", !!t && !text);
      el.classList.toggle("is-label", !!text);
      if (text) label.current.textContent = text === "drag" ? "Drag" : text;
    };
    const down = () => el.classList.add("is-down");
    const up = () => el.classList.remove("is-down");
    const out = () => el.classList.remove("is-on");

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseover", over, { passive: true });
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    document.documentElement.addEventListener("mouseleave", out);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.documentElement.removeEventListener("mouseleave", out);
    };
  }, []);

  return (
    <div ref={ring} className="pf-cursor" aria-hidden="true">
      <span className="pf-cursor__bg" />
      <span ref={label} className="pf-cursor__label" />
    </div>
  );
}
