import { Fragment, useCallback, useLayoutEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "../lib/smooth";
import Magnetic from "../components/fx/Magnetic";
import { testimonials } from "../data";
import { Dome, Label } from "./Bits";

const N = testimonials.length;
const DURATION = 8;
const pad = (n) => String(n + 1).padStart(2, "0");

export default function Words() {
  const root = useRef(null);
  const quote = useRef(null);
  const bar = useRef(null);
  const timer = useRef(null);
  const busy = useRef(false);
  const [i, setI] = useState(0);
  const [started, setStarted] = useState(false);

  const go = useCallback((next) => {
    if (busy.current) return;
    busy.current = true;
    timer.current?.kill();
    gsap.to(quote.current.querySelectorAll(".pf-q__w"), {
      yPercent: -115, duration: 0.55, ease: "expo.in", stagger: 0.006,
      onComplete: () => setI((next + N) % N),
    });
    gsap.to(".pf-words__who > *", { opacity: 0, y: -12, duration: 0.3, stagger: 0.04 });
  }, []);

  useLayoutEffect(() => {
    const st = ScrollTrigger.create({ trigger: root.current, start: "top 70%", once: true, onEnter: () => setStarted(true) });
    return () => st.kill();
  }, []);

  // every time the quote changes (or the section first enters), rise in and restart the clock
  useLayoutEffect(() => {
    const words = quote.current.querySelectorAll(".pf-q__w");
    if (!started) { gsap.set(words, { yPercent: 115 }); return undefined; }
    gsap.fromTo(words, { yPercent: 115 }, { yPercent: 0, duration: 1.1, ease: "expo.out", stagger: 0.012, onComplete: () => { busy.current = false; } });
    gsap.fromTo(".pf-words__who > *", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.8, ease: "expo.out", stagger: 0.06, delay: 0.2 });
    timer.current = gsap.fromTo(bar.current, { scaleX: 0 }, { scaleX: 1, duration: DURATION, ease: "none", onComplete: () => go(i + 1) });
    return () => timer.current?.kill();
  }, [i, started, go]);

  const t = testimonials[i];
  const long = t.quote.length > 170;

  return (
    <section ref={root} className="pf-words pf-section" id="words">
      <Dome color="ink" />
      <div className="pf-wrap">
        <Label n="04">Words</Label>

        <blockquote ref={quote} className={`pf-q${long ? " is-long" : ""}`} aria-live="polite">
          <span className="pf-q__mark" aria-hidden="true">&ldquo;</span>
          {t.quote.split(" ").map((w, k) => (
            <Fragment key={`${i}-${k}`}>
              <span className="pf-split__mask"><span className="pf-q__w">{w}</span></span>
              {" "}
            </Fragment>
          ))}
        </blockquote>

        <div className="pf-words__bar"><span ref={bar} /></div>

        <div className="pf-words__meta">
          <div className="pf-words__who">
            <b>{t.name}</b>
            <span className="pf-label">{t.role}</span>
          </div>

          <div className="pf-words__ctrl">
            <span className="pf-words__count">{pad(i)}<small> / {pad(N - 1)}</small></span>
            <Magnetic strength={0.5}><button className="pf-round" onClick={() => go(i - 1)} aria-label="Previous">&larr;</button></Magnetic>
            <Magnetic strength={0.5}><button className="pf-round" onClick={() => go(i + 1)} aria-label="Next">&rarr;</button></Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
