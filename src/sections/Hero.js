import { useEffect, useRef, useState } from "react";
import { BsArrowUpRight } from "react-icons/bs";
import { gsap } from "../lib/smooth";
import HeroGL from "../components/hero/HeroGL";
import Roll from "../components/fx/Roll";
import Magnetic from "../components/fx/Magnetic";
import { socialLinks } from "../data";

const ROLES = ["Frontend Engineer", "Creative Developer", "Interface Craftsman", "MERN Stack Builder"];

function RoleCycle({ ready }) {
  const el = useRef(null);
  const [i, setI] = useState(0);

  useEffect(() => {
    if (!ready) return undefined;
    const id = setInterval(() => {
      gsap.to(el.current, {
        yPercent: -105, duration: 0.5, ease: "expo.in",
        onComplete: () => { setI((n) => (n + 1) % ROLES.length); gsap.fromTo(el.current, { yPercent: 105 }, { yPercent: 0, duration: 0.7, ease: "expo.out" }); },
      });
    }, 2600);
    return () => clearInterval(id);
  }, [ready]);

  return <span className="pf-role"><span ref={el}>{ROLES[i]}</span></span>;
}

const lagosTime = () => new Intl.DateTimeFormat("en-GB", { timeZone: "Africa/Lagos", hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date());

export default function Hero({ ready }) {
  const root = useRef(null);
  const [time, setTime] = useState(lagosTime);

  useEffect(() => {
    const id = setInterval(() => setTime(lagosTime()), 15000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    gsap.set(".pf-hero__in", { yPercent: 120 });
    if (!ready) return undefined;
    const tw = gsap.to(".pf-hero__in", { yPercent: 0, duration: 1.2, ease: "expo.out", stagger: 0.07, delay: 0.9 });
    return () => tw.kill();
  }, [ready]);

  return (
    <section ref={root} className="pf-hero" id="home">
      <h1 className="pf-sr">Imoh Precious &mdash; Frontend Engineer based in Lagos, Nigeria</h1>

      <div className="pf-stage">
        <HeroGL ready={ready} />

        <div className="pf-stage__kicker">
          <span className="pf-mask"><span className="pf-hero__in pf-label">(Portfolio &rsquo;{String(new Date().getFullYear()).slice(2)})</span></span>
          <span className="pf-mask pf-stage__role"><span className="pf-hero__in"><RoleCycle ready={ready} /></span></span>
        </div>

        <div className="pf-stage__coords">
          <span className="pf-mask"><span className="pf-hero__in pf-label">6.5244&deg; N, 3.3792&deg; E</span></span>
          <span className="pf-mask"><span className="pf-hero__in pf-label">Lagos &mdash; {time}</span></span>
        </div>
      </div>

      <div className="pf-hero__foot">
        <p className="pf-hero__blurb pf-mask"><span className="pf-hero__in">
          I design and build digital products that move &mdash; precise, fast, and a little unreasonable about the details.
        </span></p>

        <div className="pf-hero__cta pf-mask"><span className="pf-hero__in">
          <Magnetic strength={0.35}>
            <a href="/#work" className="pf-btn" data-cursor="Go">
              <Roll>See the work</Roll>
              <span className="pf-btn__ico"><BsArrowUpRight /></span>
            </a>
          </Magnetic>
        </span></div>

        <div className="pf-hero__side pf-mask"><span className="pf-hero__in">
          <span className="pf-status"><i />Available for work</span>
          <ul>
            {socialLinks.map((s) => (
              <li key={s.label}><a href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}>{s.icon}</a></li>
            ))}
          </ul>
        </span></div>
      </div>
    </section>
  );
}
