import { createContext, useCallback, useContext, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { gsap, getLenis, scrollToTarget } from "../../lib/smooth";

const TransitionCtx = createContext({ go: () => {} });
export const useTransition = () => useContext(TransitionCtx);

const COLS = 6;

/**
 * Route curtain: six lime columns rise in a stagger, the route swaps while the screen is covered,
 * then the columns lift off. A document-level click handler routes every internal <a>
 * (including react-router <Link>s deep inside the blog) through it.
 */
export function TransitionProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const cols = useRef([]);
  const curtain = useRef(null);
  const word = useRef(null);
  const busy = useRef(false);
  const loc = useRef(location);
  loc.current = location;

  const go = useCallback((to) => {
    if (busy.current) return;
    const url = new URL(to, window.location.origin);
    const same = url.pathname === loc.current.pathname;

    // Same page: just glide to the anchor.
    if (same) {
      if (url.hash) scrollToTarget(url.hash, { offset: 0 });
      else scrollToTarget(0);
      return;
    }

    busy.current = true;
    const lenis = getLenis();
    lenis?.stop();
    const label = url.pathname === "/" ? "Home" : url.pathname.replace(/^\/|\/.*$/g, "") || "Home";
    word.current.textContent = label;

    gsap.timeline({ onComplete: () => { busy.current = false; lenis?.start(); } })
      .set(curtain.current, { pointerEvents: "all", visibility: "visible" })
      .fromTo(cols.current, { yPercent: 101 }, { yPercent: 0, duration: 0.7, ease: "expo.inOut", stagger: { each: 0.05, from: "center" } })
      .fromTo(word.current, { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.5, ease: "expo.out" }, "-=0.35")
      .add(() => {
        navigate(url.pathname + url.search + url.hash);
        window.scrollTo(0, 0);
      })
      .to({}, { duration: 0.25 })
      .to(word.current, { yPercent: -110, opacity: 0, duration: 0.4, ease: "expo.in" })
      .to(cols.current, { yPercent: -101, duration: 0.8, ease: "expo.inOut", stagger: { each: 0.05, from: "edges" } }, "-=0.2")
      .set(curtain.current, { pointerEvents: "none", visibility: "hidden" });
  }, [navigate]);

  useEffect(() => {
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest?.("a[href]");
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      const href = a.getAttribute("href");
      if (!href || href.startsWith("mailto:") || href.startsWith("tel:")) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      e.preventDefault();
      go(url.pathname + url.search + url.hash);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [go]);

  // After a route change, honour a #hash target once the new page is mounted.
  useEffect(() => {
    if (!location.hash) return undefined;
    const t = setTimeout(() => scrollToTarget(location.hash, { immediate: true }), 60);
    return () => clearTimeout(t);
  }, [location.pathname, location.hash]);

  return (
    <TransitionCtx.Provider value={{ go }}>
      {children}
      <div ref={curtain} className="pf-curtain" aria-hidden="true">
        {Array.from({ length: COLS }, (_, i) => (
          <div className="pf-curtain__col" key={i} ref={(el) => { cols.current[i] = el; }} />
        ))}
        <span className="pf-curtain__mask"><span ref={word} className="pf-curtain__word" /></span>
      </div>
    </TransitionCtx.Provider>
  );
}
