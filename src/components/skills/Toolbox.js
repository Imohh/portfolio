import { useEffect, useRef } from "react";
import Matter from "matter-js";
import { gsap, ScrollTrigger, prefersReducedMotion, isFinePointer } from "../../lib/smooth";

const { Engine, Composite, Bodies, Body, Mouse, MouseConstraint } = Matter;

/**
 * Real rigid-body physics (Matter.js) driving plain DOM nodes: every pill is a chamfered body,
 * the engine owns position + rotation, React owns the markup. Drops in when scrolled to,
 * and can be grabbed and thrown with the mouse.
 */
export default function Toolbox({ items }) {
  const box = useRef(null);
  const still = prefersReducedMotion();

  useEffect(() => {
    if (still) return undefined;
    const el = box.current;
    const pills = Array.from(el.querySelectorAll("[data-pill]"));
    const engine = Engine.create({ gravity: { x: 0, y: 1.25 }, enableSleeping: true });
    let bodies = [];
    let walls = [];
    let active = false;
    let dropped = false;

    const buildWalls = () => {
      Composite.remove(engine.world, walls);
      const { clientWidth: w, clientHeight: h } = el;
      const t = 200;
      const opts = { isStatic: true, friction: 0.4 };
      walls = [
        Bodies.rectangle(w / 2, h + t / 2, w + t * 2, t, opts),
        Bodies.rectangle(-t / 2, h / 2 - 400, t, h + 1000, opts),
        Bodies.rectangle(w + t / 2, h / 2 - 400, t, h + 1000, opts),
      ];
      Composite.add(engine.world, walls);
    };

    buildWalls();

    bodies = pills.map((pill, i) => {
      const w = pill.offsetWidth;
      const h = pill.offsetHeight;
      const b = Bodies.rectangle(el.clientWidth * (0.15 + 0.7 * Math.random()), -120 - i * 90, w, h, {
        chamfer: { radius: h / 2 },
        restitution: 0.35, friction: 0.25, frictionAir: 0.012, density: 0.002,
        angle: (Math.random() - 0.5) * 1.2,
      });
      b.plugin = { pill, w, h };
      return b;
    });

    let mc;
    if (isFinePointer()) {
      const mouse = Mouse.create(el);
      // Matter swallows the wheel by default; give it back to the page.
      mouse.element.removeEventListener("wheel", mouse.mousewheel);
      mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
      mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);
      mc = MouseConstraint.create(engine, { mouse, constraint: { stiffness: 0.18, damping: 0.1, render: { visible: false } } });
      Composite.add(engine.world, mc);
    }

    const drop = () => {
      if (dropped) return;
      dropped = true;
      bodies.forEach((b, i) => {
        setTimeout(() => {
          Composite.add(engine.world, b);
          Body.setVelocity(b, { x: (Math.random() - 0.5) * 6, y: 2 });
          Body.setAngularVelocity(b, (Math.random() - 0.5) * 0.2);
          gsap.set(b.plugin.pill, { opacity: 1 });
        }, i * 110);
      });
      // once everything has landed, close the lid so thrown pills stay in the box
      setTimeout(() => {
        const { clientWidth: w } = el;
        Composite.add(engine.world, Bodies.rectangle(w / 2, -60, w + 400, 120, { isStatic: true }));
      }, bodies.length * 110 + 2500);
    };

    const st = ScrollTrigger.create({
      trigger: el, start: "top 70%", end: "bottom top",
      onEnter: () => { active = true; drop(); },
      onEnterBack: () => { active = true; },
      onLeave: () => { active = false; },
      onLeaveBack: () => { active = false; },
    });

    const tick = () => {
      if (!active) return;
      Engine.update(engine, 1000 / 60);
      bodies.forEach((b) => {
        const { pill, w, h } = b.plugin;
        pill.style.transform = `translate3d(${b.position.x - w / 2}px, ${b.position.y - h / 2}px, 0) rotate(${b.angle}rad)`;
      });
    };
    gsap.ticker.add(tick);

    const onResize = () => buildWalls();
    window.addEventListener("resize", onResize);

    return () => {
      gsap.ticker.remove(tick);
      st.kill();
      window.removeEventListener("resize", onResize);
      Composite.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, [still, items]);

  return (
    <div ref={box} className={`pf-toolbox${still ? " is-static" : ""}`} data-cursor="drag">
      {items.map((s, i) => (
        <div data-pill className={`pf-pill pf-pill--${i % 4}`} key={s.label} style={still ? undefined : { opacity: 0 }}>
          <span className="pf-pill__icon">{s.icon}</span>
          {s.label}
        </div>
      ))}
    </div>
  );
}
