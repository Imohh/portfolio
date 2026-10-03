import { useEffect } from "react";
import Hero from "../sections/Hero";
import About from "../sections/About";
import Work from "../sections/Work";
import Skills from "../sections/Skills";
import Words from "../sections/Words";
import Marquee from "../sections/Marquee";
import { ScrollTrigger } from "../lib/smooth";

const BAND = ["Frontend Engineering", "Creative Development", "Motion & WebGL", "Design Systems", "Full-stack Products"];

export default function LandingPage({ ready }) {
  useEffect(() => {
    const t = setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="pf-home">
      <Hero ready={ready} />
      <Marquee items={BAND} />
      <About />
      <Work />
      <Skills />
      <Words />
    </div>
  );
}
