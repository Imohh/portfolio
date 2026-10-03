import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../lib/smooth";
import Split, { parseWords } from "../components/fx/Split";
import { Label } from "./Bits";

const STATEMENT =
  "I'm *Imoh Precious*, a frontend engineer in Lagos who treats the browser as a canvas. The blend between economics and tech has taught me to think in systems; years of shipping taught me that the details are the product. I build interfaces that feel *effortless* and look unforgettable, I love creating experiences, and I'm currently doing it at *Punch.*";

const CAPABILITIES = [
  ["Interface engineering", "React · Next.js · TypeScript"],
  // ["Motion & WebGL", "GSAP · GLSL shaders · scroll choreography"],
  ["Full-stack products", "Node · Express · MongoDB · PostgreSQL"],
  ["Mobile Applications", "React Native · Expo"],
];

const STATS = [
  { n: 5, suf: "+", label: "Years shipping" },
  { n: 30, suf: "+", label: "Projects delivered" },
  { n: 10, suf: "+", label: "Happy clients" },
];

function Counter({ n, suf }) {
  const el = useRef(null);
  useLayoutEffect(() => {
    const o = { v: 0 };
    const st = ScrollTrigger.create({
      trigger: el.current, start: "top 90%", once: true,
      onEnter: () => gsap.to(o, { v: n, duration: 2.2, ease: "expo.out", onUpdate: () => { el.current.textContent = Math.round(o.v) + suf; } }),
    });
    return () => st.kill();
  }, [n, suf]);
  return <span ref={el}>0{suf}</span>;
}

export default function About() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // statement: every word lights up as the paragraph crosses the viewport
      gsap.fromTo(".pf-about__w", { opacity: 0.12 }, {
        opacity: 1, stagger: 0.12, ease: "none",
        scrollTrigger: { trigger: ".pf-about__statement", start: "top 78%", end: "bottom 55%", scrub: 0.4 },
      });
      gsap.utils.toArray(".pf-cap").forEach((row) => {
        gsap.fromTo(row, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: "expo.out", scrollTrigger: { trigger: row, start: "top 92%", once: true } });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="pf-about pf-section" id="about">
      <div className="pf-wrap">
        <Label n="01">About</Label>

        <p className="pf-about__statement" aria-label={STATEMENT.replace(/\*/g, "")}>
          {parseWords(STATEMENT).map((w, i) => (
            <span key={i} aria-hidden="true" className={`pf-about__w${w.em ? " pf-em" : ""}`}>{w.word} </span>
          ))}
        </p>

        <div className="pf-about__grid">
          <div>
            <div className="pf-label pf-about__sub">What I do</div>
            <ul className="pf-caps">
              {CAPABILITIES.map(([t, d], i) => (
                <li className="pf-cap" key={t} data-cursor="">
                  <span className="pf-cap__n">0{i + 1}</span>
                  <span className="pf-cap__t">{t}</span>
                  <span className="pf-cap__d">{d}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pf-about__aside">
            <ul className="pf-stats">
              {STATS.map((s) => (
                <li key={s.label}>
                  <b><Counter n={s.n} suf={s.suf} /></b>
                  <span className="pf-label">{s.label}</span>
                </li>
              ))}
            </ul>

            <Split as="blockquote" className="pf-about__quote" text="*“I can change the world.* The source codes ain't that complex!”" />
            <p className="pf-label pf-about__off">Off the clock &mdash; table tennis, travel, and naming 150+ country flags.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
