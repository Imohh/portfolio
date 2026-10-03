import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../lib/smooth";

/** Mono section label whose rule draws itself in. */
export function Label({ n, children, className = "" }) {
  const root = useRef(null);
  useLayoutEffect(() => {
    const line = root.current.querySelector("i");
    gsap.set(line, { scaleX: 0 });
    const st = ScrollTrigger.create({
      trigger: root.current, start: "top 92%", once: true,
      onEnter: () => gsap.to(line, { scaleX: 1, duration: 1.2, ease: "expo.out" }),
    });
    return () => st.kill();
  }, []);
  return (
    <div ref={root} className={`pf-label pf-sec-label ${className}`}>
      <span>{n}</span><i /><span>{children}</span>
    </div>
  );
}

/** Curved leading edge of a section that flattens as it arrives. */
export function Dome({ color = "bone" }) {
  const el = useRef(null);
  useLayoutEffect(() => {
    const tw = gsap.fromTo(el.current, { height: "10vw" }, {
      height: 0, ease: "none",
      scrollTrigger: { trigger: el.current.parentNode, start: "top bottom", end: "top 25%", scrub: true },
    });
    return () => { tw.scrollTrigger?.kill(); tw.kill(); };
  }, []);
  return <div ref={el} className={`pf-dome pf-dome--${color}`} aria-hidden="true" />;
}
