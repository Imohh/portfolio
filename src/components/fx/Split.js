import { Fragment, useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../../lib/smooth";

/**
 * Turns "Crafting *digital experiences* that matter" into masked word spans.
 * Words wrapped in *asterisks* get the serif-italic accent style.
 */
export function parseWords(text) {
  let em = false;
  return text.split(" ").map((raw) => {
    const starts = raw.startsWith("*");
    const ends = raw.endsWith("*");
    if (starts) em = true;
    const word = raw.replace(/\*/g, "");
    const out = { word, em };
    if (ends) em = false;
    return out;
  });
}

/**
 * Masked word reveal. `on="scroll"` plays when scrolled into view,
 * `on="ready"` waits for the `ready` prop (used by the hero after the preloader).
 */
export default function Split({ text, as: Tag = "h2", className = "", on = "scroll", ready = true, delay = 0, stagger = 0.045 }) {
  const root = useRef(null);

  useLayoutEffect(() => {
    const words = root.current.querySelectorAll(".pf-split__in");
    gsap.set(words, { yPercent: 115, rotate: 4 });
    if (on === "ready" && !ready) return undefined;

    const play = () =>
      gsap.to(words, { yPercent: 0, rotate: 0, duration: 1.1, ease: "expo.out", stagger, delay });

    if (on === "ready") {
      const tween = play();
      return () => tween.kill();
    }
    const st = ScrollTrigger.create({ trigger: root.current, start: "top 88%", once: true, onEnter: play });
    return () => st.kill();
  }, [on, ready, delay, stagger, text]);

  return (
    <Tag ref={root} className={`pf-split ${className}`} aria-label={text.replace(/\*/g, "")}>
      {parseWords(text).map((w, i) => (
        <Fragment key={i}>
          <span className="pf-split__mask" aria-hidden="true">
            <span className={`pf-split__in${w.em ? " pf-em" : ""}`}>{w.word}</span>
          </span>
          {" "}
        </Fragment>
      ))}
    </Tag>
  );
}
