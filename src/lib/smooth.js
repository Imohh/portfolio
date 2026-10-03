import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let lenis = null;
let tick = null;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const isFinePointer = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

/** One Lenis instance, driven by the GSAP ticker so ScrollTrigger and WebGL share a single clock. */
export function startSmooth() {
  if (lenis) return lenis;
  lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9, smoothWheel: !prefersReducedMotion() });
  lenis.on("scroll", ScrollTrigger.update);
  tick = (t) => lenis.raf(t * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  return lenis;
}

export function stopSmooth() {
  if (!lenis) return;
  gsap.ticker.remove(tick);
  lenis.destroy();
  lenis = null;
  tick = null;
}

export const getLenis = () => lenis;

export function scrollToTarget(target, opts = {}) {
  // the footer is position:fixed and revealed by scrolling, so "#contact" means "scroll to the end"
  if (target === "#contact") target = lenis ? lenis.limit : document.documentElement.scrollHeight;
  if (lenis) lenis.scrollTo(target, { duration: 1.6, easing: (t) => 1 - Math.pow(1 - t, 4), force: true, ...opts });
  else if (typeof target === "number") window.scrollTo(0, target);
  else document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
}

export { gsap, ScrollTrigger };

