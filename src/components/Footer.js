import { Fragment, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { AiFillGithub, AiOutlineTwitter, AiFillInstagram } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { BsArrowUpRight } from "react-icons/bs";
import { gsap, ScrollTrigger, scrollToTarget } from "../lib/smooth";
import FooterGL from "./fx/FooterGL";
import Roll from "./fx/Roll";
import Magnetic from "./fx/Magnetic";
import { parseWords } from "./fx/Split";

const SOCIALS = [
  { href: "https://github.com/imohh", label: "GitHub", icon: <AiFillGithub /> },
  { href: "https://twitter.com/imoh_xo", label: "Twitter", icon: <AiOutlineTwitter /> },
  { href: "https://www.linkedin.com/in/precious-imoh/", label: "LinkedIn", icon: <FaLinkedinIn /> },
  { href: "https://www.instagram.com/imoh_xo", label: "Instagram", icon: <AiFillInstagram /> },
];

function useLagosClock() {
  const fmt = useRef(new Intl.DateTimeFormat("en-GB", { timeZone: "Africa/Lagos", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }));
  const [t, setT] = useState(() => fmt.current.format(new Date()));
  useEffect(() => {
    const id = setInterval(() => setT(fmt.current.format(new Date())), 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

/**
 * The footer is position:fixed *underneath* the page; <main> carries a bottom margin equal to its
 * height, so scrolling to the end peels the page away like a curtain. Behind the UI sits an
 * interactive ink canvas (FooterGL) that draws the headline and wordmark.
 */
export default function Footer() {
  const root = useRef(null);
  const time = useLagosClock();
  const [noGL, setNoGL] = useState(false);
  const onFail = useCallback(() => setNoGL(true), []);

  useLayoutEffect(() => {
    const main = document.querySelector(".pf-main");
    if (!main) return undefined;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: main, start: "bottom bottom", end: "bottom top", scrub: 0.6 },
      });
      tl.fromTo(".pf-foot__fade", { opacity: 0, y: 40 }, { opacity: 1, y: 0, stagger: 0.08, ease: "none" }, 0.2)
        .fromTo(root.current, { scale: 0.94, transformOrigin: "50% 100%" }, { scale: 1, ease: "none" }, 0);
    }, root);
    return () => ctx.revert();
  }, []);

  // keep <main>'s bottom margin in sync with the real footer height
  useLayoutEffect(() => {
    const main = document.querySelector(".pf-main");
    if (!main) return undefined;
    const sync = () => {
      main.style.marginBottom = `${root.current.offsetHeight}px`;
      ScrollTrigger.refresh();
    };
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(root.current);
    return () => { ro.disconnect(); main.style.marginBottom = ""; };
  }, []);

  return (
    <footer ref={root} className="pf-foot" id="contact">
      {!noGL && <FooterGL onFail={onFail} />}

      <div className="pf-foot__ui">
        <div className="pf-foot__top">
          <span className="pf-label pf-foot__fade">05 &mdash; Contact</span>
          <span className="pf-label pf-foot__fade">Lagos, NG &mdash; {time} WAT</span>
        </div>

        {noGL ? (
          <h2 className="pf-foot__head" aria-label="Let's build something extraordinary">
            {parseWords("Let's build something *extraordinary.*").map((w, i) => (
              <Fragment key={i}>
                <span className={w.em ? "pf-em" : ""}>{w.word}</span>{" "}
              </Fragment>
            ))}
          </h2>
        ) : (
          <h2 className="pf-sr">Let&rsquo;s build something extraordinary.</h2>
        )}

        <div className="pf-foot__row pf-foot__fade">
          <Magnetic strength={0.3}>
            <a href="mailto:imohokonp@gmail.com" className="pf-foot__mail" data-cursor="Write">
              <Roll>imohokonp@gmail.com</Roll>
              <BsArrowUpRight />
            </a>
          </Magnetic>
          <ul className="pf-foot__social">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}>{s.icon}<Roll>{s.label}</Roll></a>
              </li>
            ))}
          </ul>
        </div>

        <div className="pf-foot__base pf-foot__fade">
          <span>&copy; 2021 Imoh Precious</span>
          <span>Built with precision - Imoh</span>
          <button onClick={() => scrollToTarget(0)} className="pf-foot__top-btn">
            <Roll>Back to top</Roll> &uarr;
          </button>
        </div>
      </div>

      {noGL && <div className="pf-foot__mark" aria-hidden="true">IMOH</div>}
    </footer>
  );
}
