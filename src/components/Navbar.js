import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { gsap, getLenis } from "../lib/smooth";
import Roll from "./fx/Roll";
import Magnetic from "./fx/Magnetic";

const LINKS = [
  { id: "about", label: "About", n: "01" },
  { id: "work", label: "Work", n: "02" },
  { id: "skills", label: "Toolbox", n: "03" },
  { id: "words", label: "Words", n: "04" },
  { id: "contact", label: "Contact", n: "05" },
];

/**
 * Fixed bar drawn with mix-blend-mode: difference, so it reads on the dark sections and
 * flips to ink on the bone section with no per-section theming. Hides on scroll down.
 */
export default function Navbar() {
  const { pathname } = useLocation();
  const home = pathname === "/";
  const bar = useRef(null);
  const rail = useRef(null);
  const menu = useRef(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  // hide on scroll down, show on scroll up; drive the progress rail
  useEffect(() => {
    let id;
    const bind = () => {
      const lenis = getLenis();
      if (!lenis) { id = requestAnimationFrame(bind); return; }
      const off = lenis.on("scroll", ({ direction, scroll, limit }) => {
        if (open) return;
        gsap.to(bar.current, { yPercent: direction === 1 && scroll > 160 ? -120 : 0, duration: 0.6, ease: "expo.out", overwrite: true });
        if (rail.current) rail.current.style.setProperty("--p", limit ? scroll / limit : 0);
        if (home && limit && scroll / limit > 0.985) setActive("contact");
      });
      id = off;
    };
    bind();
    return () => { if (typeof id === "function") id(); else cancelAnimationFrame(id); };
  }, [open, home]);

  // which section are we in
  useEffect(() => {
    if (!home) { setActive(""); return undefined; }
    const els = LINKS.filter((l) => l.id !== "contact").map((l) => document.getElementById(l.id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [home, pathname]);

  // full-screen menu: circle wipe from the button
  useEffect(() => {
    const m = menu.current;
    if (open) {
      getLenis()?.stop();
      gsap.set(m, { visibility: "visible" });
      gsap.fromTo(m, { clipPath: "circle(0% at calc(100% - 52px) 40px)" }, { clipPath: "circle(150% at calc(100% - 52px) 40px)", duration: 1, ease: "expo.inOut" });
      gsap.fromTo(".pf-menu__link span", { yPercent: 110 }, { yPercent: 0, duration: 1, ease: "expo.out", stagger: 0.06, delay: 0.35 });
    } else if (m.style.visibility === "visible") {
      getLenis()?.start();
      gsap.to(m, { clipPath: "circle(0% at calc(100% - 52px) 40px)", duration: 0.7, ease: "expo.inOut", onComplete: () => gsap.set(m, { visibility: "hidden" }) });
    }
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <header ref={bar} className="pf-nav">
        <a href="/" className="pf-nav__logo" aria-label="Home" data-cursor="Home">
          <Roll>Imoh</Roll><sup>&reg;</sup>
        </a>

        <nav className="pf-nav__links" aria-label="Primary">
          {LINKS.map((l) => (
            <a key={l.id} href={`/#${l.id}`} className={active === l.id && home ? "is-active" : ""}>
              <i />
              <Roll>{l.label}</Roll>
            </a>
          ))}
          <a href="/thoughts" className={pathname.startsWith("/thoughts") ? "is-active" : ""}>
            <i />
            <Roll>Thoughts</Roll>
          </a>
        </nav>

        <Magnetic strength={0.5} className="pf-nav__menu-wrap">
          <button className={`pf-nav__menu${open ? " is-open" : ""}`} onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Menu">
            <span /><span />
          </button>
        </Magnetic>
      </header>

      <div ref={rail} className="pf-rail" aria-hidden="true"><span /></div>

      <div ref={menu} className="pf-menu" style={{ visibility: "hidden" }}>
        <nav className="pf-menu__nav" aria-label="Menu">
          {[...LINKS, { id: "thoughts", label: "Thoughts", n: "06", href: "/thoughts" }].map((l) => (
            <a key={l.id} href={l.href || `/#${l.id}`} className="pf-menu__link" onClick={() => setOpen(false)}>
              <span><em>{l.n}</em>{l.label}</span>
            </a>
          ))}
        </nav>
        <div className="pf-menu__foot">
          <a href="mailto:imohokonp@gmail.com">imohokonp@gmail.com</a>
          <span>Lagos, Nigeria</span>
        </div>
      </div>
    </>
  );
}
