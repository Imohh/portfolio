import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { BsArrowUpRight } from "react-icons/bs";
import { gsap, isFinePointer } from "../lib/smooth";
import Split from "../components/fx/Split";
import Roll from "../components/fx/Roll";
import WorkGL from "../components/work/WorkGL";
import { projects } from "../data";
import { Label } from "./Bits";

export default function Work() {
  const root = useRef(null);
  const [active, setActive] = useState(null);
  const fine = useMemo(() => isFinePointer(), []);
  const images = useMemo(() => projects.map((p) => p.img), []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".pf-row").forEach((row) => {
        const line = row.querySelector(".pf-row__line");
        const items = row.querySelectorAll(".pf-row__in");
        gsap.set(line, { scaleX: 0 });
        gsap.set(items, { yPercent: 110 });
        gsap.timeline({ scrollTrigger: { trigger: row, start: "top 90%", once: true } })
          .to(line, { scaleX: 1, duration: 1.4, ease: "expo.out" }, 0)
          .to(items, { yPercent: 0, duration: 1.1, ease: "expo.out", stagger: 0.05 }, 0.1);
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="pf-work pf-section" id="work">
      <div className="pf-wrap">
        <Label n="02">Selected work</Label>
        <div className="pf-work__head">
          <Split text="Things I've *shipped,* in no particular order." className="pf-h2" />
          <p className="pf-work__count pf-label">({String(projects.length).padStart(2, "0")}) projects &mdash; hover to preview</p>
        </div>
      </div>

      <ul className="pf-rows" onMouseLeave={() => setActive(null)}>
        {projects.map((p, i) => (
          <li key={p.title}>
            <a
              className="pf-row pf-hov"
              href={p.demoLink}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => fine && setActive(i)}
              onFocus={() => fine && setActive(i)}
              onBlur={() => setActive(null)}
            >
              <span className="pf-row__line" />
              <span className="pf-mask pf-row__n"><span className="pf-row__in pf-label">0{i + 1}</span></span>
              <span className="pf-mask pf-row__title"><span className="pf-row__in"><Roll>{p.title}</Roll></span></span>
              <span className="pf-mask pf-row__tag"><span className="pf-row__in"><b>{p.tag}</b><small>{p.stack}</small></span></span>
              <span className="pf-mask pf-row__year"><span className="pf-row__in pf-label">{p.year}</span></span>
              <span className="pf-row__arrow"><BsArrowUpRight /></span>
              <img className="pf-row__thumb" src={p.img} alt="" loading="lazy" />
            </a>
          </li>
        ))}
      </ul>

      {fine && <WorkGL images={images} active={active} />}
    </section>
  );
}
