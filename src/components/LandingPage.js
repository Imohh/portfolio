import { useEffect } from "react";
import Hero from "../sections/Hero";
import About from "../sections/About";
import Work from "../sections/Work";
import Skills from "../sections/Skills";
import Words from "../sections/Words";
import { ScrollTrigger } from "../lib/smooth";

export default function LandingPage({ ready }) {
  useEffect(() => {
    const t = setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="pf-home">
      <Hero ready={ready} />
      <About />
      <Work />
      <Skills />
      <Words />
    </div>
  );
}
