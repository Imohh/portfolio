import { useEffect, useCallback } from "react";
import {
  AiFillGithub,
  AiOutlineTwitter,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import {
  DiJavascript1,
  DiReact,
  DiNodejs,
  DiMongodb,
  DiGit,
  DiPhp,
} from "react-icons/di";
import {
  SiNextdotjs,
  SiPostgresql,
  SiTypescript,
  SiVisualstudiocode,
  SiPostman,
  SiSlack,
  SiVercel,
} from "react-icons/si";
import { BsGithub } from "react-icons/bs";
import { CgWebsite } from "react-icons/cg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import Type from "./Home/Type";
import Particle from "./Particle";
import myImg from "../Assets/imoh.png";

// Project images
import chekam from "../Assets/Projects/chekam.png";
import learnbuddie from "../Assets/Projects/learnbuddie.png";
import sopeadelaja from "../Assets/Projects/sope.png";
import recreate from "../Assets/Projects/recreate.png";
import eminence from "../Assets/Projects/eminence.png";
import glintz from "../Assets/Projects/glintz.png";

import "./LandingPage.css";

const socialLinks = [
  { href: "https://github.com/imohh", icon: <AiFillGithub />, label: "GitHub" },
  { href: "https://twitter.com/imoh_xo", icon: <AiOutlineTwitter />, label: "Twitter" },
  { href: "https://www.linkedin.com/in/precious-imoh/", icon: <FaLinkedinIn />, label: "LinkedIn" },
  { href: "https://www.instagram.com/imoh_xo", icon: <AiFillInstagram />, label: "Instagram" },
];

const techStack = [
  { icon: <DiJavascript1 />, label: "JavaScript" },
  { icon: <DiReact />, label: "React" },
  { icon: <SiTypescript />, label: "TypeScript" },
  { icon: <DiNodejs />, label: "Node.js" },
  { icon: <DiMongodb />, label: "MongoDB" },
  { icon: <SiNextdotjs />, label: "Next.js" },
  { icon: <DiGit />, label: "Git" },
  { icon: <DiPhp />, label: "PHP" },
  { icon: <SiPostgresql />, label: "PostgreSQL" },
];

const tools = [
  { icon: <SiVisualstudiocode />, label: "VS Code" },
  { icon: <SiPostman />, label: "Postman" },
  { icon: <SiSlack />, label: "Slack" },
  { icon: <SiVercel />, label: "Vercel" },
];

const projects = [
  {
    img: chekam,
    title: "Chekam",
    description: "Property listing website with filters that enables users search for properties with ease.",
    demoLink: "https://chekam.com",
  },
  {
    img: learnbuddie,
    title: "Learnbuddie",
    description: "A comprehensive learning platform for students.",
    demoLink: "https://learnbuddie.com",
  },
  {
    img: sopeadelaja,
    title: "Sope Adelaja Portfolio",
    description: "Portfolio website for a creative professional. Built with MERN stack + Stripe.",
    demoLink: "https://sopeadelaja.com/",
  },
  {
    img: recreate,
    title: "Recreate Africa",
    description: "Storytelling website for a company based in Africa. Built with React and Tailwind CSS.",
    demoLink: "https://recreateafrica.org",
  },
  {
    img: eminence,
    title: "Eminence E-Commerce",
    description: "E-Commerce website for a luxury fashion brand based in the UK. Built with MERN Stack + Stripe.",
    ghLink: "https://github.com/imohh/ecommerce-server",
    demoLink: "https://eminencebygtx.com",
  },
  {
    img: glintz,
    title: "Glintz Photography",
    description: "A photography website built with MERN Stack with a fully functional Admin Panel.",
    ghLink: "https://github.com/imohh/glintz-route",
    demoLink: "https://glintzphotography.org",
  },
];

const testimonials = [
  {
    quote: "Imoh is a highly skilled developer especially in ReactJs. He has incredible leadership skills, as well as an exemplary work ethic and friendly temperament, making him the model professional and wonderful human being.",
    name: "Charles Hul",
    role: "CEO, Chekam",
  },
  {
    quote: "Having been in the tech space for over 15 years, I can say for certain that Imoh is one of the most brilliant developers I have worked with. He has in-depth knowledge of multiple modern development technologies and the ability to learn quickly. He delivers projects in a timely and professional way.",
    name: "Joseph Abyem",
    role: "CTO, Chekam",
  },
  {
    quote: "I own a London based luxury brand. Precious built my E-Commerce website and was the head of my tech department. He was easy to work with and also willing to learn.",
    name: "Etopidiok Joshua",
    role: "Financial Markets Enthusiast",
  },
  {
    quote: "Extremely professional and puts out deliverables very timely.",
    name: "Joel Adu",
    role: "Photographer",
  },
  {
    quote: "Precious is an amazing web developer, easy to work with and he gives attention to details.",
    name: "Temitope Jalekun",
    role: "Photographer",
  },
];

// All skills combined for marquee rows
const marqueeRow1 = [...techStack, ...techStack];
const marqueeRow2 = [...tools, ...techStack.slice(0, 5), ...tools, ...techStack.slice(0, 5)];

function LandingPage() {
  // Cursor glow effect
  const handleMouseMove = useCallback((e) => {
    const glow = document.querySelector(".cursor-glow");
    if (glow) {
      glow.style.left = e.clientX + "px";
      glow.style.top = e.clientY + "px";
    }
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  // Scroll-triggered reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    const revealElements = document.querySelectorAll(".reveal");
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const firstName = "IMOH";
  const lastName = "PRECIOUS";

  return (
    <div className="landing-page">
      {/* Cursor glow */}
      <div className="cursor-glow" />

      {/* Grain overlay */}
      <div className="grain-overlay" />

      {/* ===== HERO ===== */}
      <section className="hero" id="home">
        <Particle />
        <div className="hero-bg-grid" />
        <div className="hero-glow-orb" />

        <div className="lp-container hero-content">
          <span className="section-label">01 / Home</span>

          <p className="hero-greeting">Hello, I'm</p>

          <h1 className="hero-name-split">
            <span className="name-line">
              {firstName.split("").map((char, i) => (
                <span
                  key={i}
                  className="hero-char"
                  style={{ animationDelay: `${0.3 + i * 0.06}s` }}
                >
                  {char}
                </span>
              ))}
            </span>
            <span className="name-line">
              {lastName.split("").map((char, i) => (
                <span
                  key={i}
                  className="hero-char"
                  style={{ animationDelay: `${0.3 + (firstName.length + i) * 0.06}s` }}
                >
                  {char}
                </span>
              ))}
            </span>
          </h1>

          <div className="hero-type">
            <Type />
          </div>

          <p className="hero-desc">
            Software Developer based in Lagos, Nigeria. I build modern web
            applications and love turning ideas into elegant, functional products.
          </p>

          <div className="hero-cta">
            <a href="#projects" className="btn-glow">
              View Projects
            </a>
            <a href="#contact" className="btn-outline-glow">
              Get in Touch
            </a>
          </div>

          <ul className="hero-social">
            {socialLinks.map((link, i) => (
              <li key={i}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="scroll-indicator">
          <span>Scroll</span>
          <div className="scroll-line">
            <div className="scroll-dot" />
          </div>
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section className="section-about" id="about">
        <div className="lp-container">
          <span className="section-label reveal">02 / About</span>
          <h2 className="section-title reveal">About Me</h2>

          <div className="about-layout">
            <div className="about-content reveal reveal-delay-1">
              <p>
                Hi! I'm <span className="about-hl">Imoh Precious</span>, a
                software developer based in Lagos, Nigeria. My love for Finance and
                Technology made me pursue a degree in Economics so I can blend the
                finance world with building awesome products in the tech space.
              </p>
              <p>
                I'm fluent in{" "}
                <span className="about-hl">
                  React, TypeScript, Next.js, JavaScript, Node.js, Express.js, and
                  MongoDB
                </span>
                . My interests lie in building new web technologies, products, and
                exploring the Blockchain space.
              </p>
              <p>
                Currently, I'm employed as a software developer at Chekam, where I
                use my knowledge of tech to solve real-life problems and build
                impactful products.
              </p>

              <ul className="about-hobbies">
                <li>
                  <span className="hobby-arrow">&#9654;</span> Playing Table Tennis
                </li>
                <li>
                  <span className="hobby-arrow">&#9654;</span> Travelling
                </li>
                <li>
                  <span className="hobby-arrow">&#9654;</span> Conducting research
                  to get new information — like identifying at least 150 flags out
                  of 194 countries in the world
                </li>
              </ul>

              <div className="about-quote">
                <p>"I can change the world. The source codes ain't that complex!"</p>
                <cite>— Imoh</cite>
              </div>
            </div>

            <div className="about-avatar reveal reveal-delay-2">
              <img src={myImg} alt="Imoh Precious" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== SKILLS — Marquee ===== */}
      <section className="section-skills" id="skills">
        <div className="lp-container">
          <span className="section-label reveal">03 / Skills</span>
          <h2 className="section-title reveal">Skills & Tools</h2>
          <p className="section-subtitle reveal">Technologies I work with daily.</p>
        </div>

        <div className="marquee-container reveal">
          {/* Row 1 — scrolls left */}
          <div className="marquee-track">
            <div className="marquee-scroll-left">
              {marqueeRow1.map((skill, i) => (
                <div className="marquee-pill" key={`r1-${i}`}>
                  <span className="marquee-icon">{skill.icon}</span>
                  <span>{skill.label}</span>
                </div>
              ))}
            </div>
            <div className="marquee-scroll-left" aria-hidden="true">
              {marqueeRow1.map((skill, i) => (
                <div className="marquee-pill" key={`r1d-${i}`}>
                  <span className="marquee-icon">{skill.icon}</span>
                  <span>{skill.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 — scrolls right */}
          <div className="marquee-track">
            <div className="marquee-scroll-right">
              {marqueeRow2.map((skill, i) => (
                <div className="marquee-pill" key={`r2-${i}`}>
                  <span className="marquee-icon">{skill.icon}</span>
                  <span>{skill.label}</span>
                </div>
              ))}
            </div>
            <div className="marquee-scroll-right" aria-hidden="true">
              {marqueeRow2.map((skill, i) => (
                <div className="marquee-pill" key={`r2d-${i}`}>
                  <span className="marquee-icon">{skill.icon}</span>
                  <span>{skill.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROJECTS ===== */}
      <section className="section-projects" id="projects">
        <div className="lp-container">
          <span className="section-label reveal">04 / Projects</span>
          <h2 className="section-title reveal">Featured Projects</h2>
          <p className="section-subtitle reveal">
            Some of the things I've built recently.
          </p>

          <div className="projects-grid-v2 reveal reveal-delay-1">
            {projects.map((project, i) => (
              <div className="project-card-v2" key={i}>
                <div className="card-image-wrap">
                  <img src={project.img} alt={project.title} />
                  <div className="card-image-overlay" />
                </div>
                <div className="card-body-v2">
                  <span className="card-index">0{i + 1}</span>
                  <h3 className="card-title-v2">{project.title}</h3>
                  <p className="card-desc-v2">{project.description}</p>
                  <div className="card-links-v2">
                    {project.ghLink && (
                      <a
                        href={project.ghLink}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <BsGithub /> Code
                      </a>
                    )}
                    {project.demoLink && (
                      <a
                        href={project.demoLink}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <CgWebsite /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="section-testimonials" id="testimonials">
        <div className="lp-container">
          <span className="section-label reveal">05 / Testimonials</span>
          <h2 className="section-title reveal">What People Say</h2>
          <p className="section-subtitle reveal">
            Kind words from people I've worked with.
          </p>

          <div className="reveal reveal-delay-1">
            <Swiper
              spaceBetween={30}
              centeredSlides={true}
              autoplay={{ delay: 4500, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              navigation={true}
              modules={[Autoplay, Pagination, Navigation]}
            >
              {testimonials.map((t, i) => (
                <SwiperSlide key={i}>
                  <div className="testimonial-card-v2">
                    <div className="testimonial-quote-mark">"</div>
                    <p className="testimonial-text">{t.quote}</p>
                    <div className="testimonial-author-info">
                      <span className="testimonial-name">{t.name}</span>
                      <span className="testimonial-role">{t.role}</span>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section className="section-contact" id="contact">
        <div className="lp-container">
          <span className="section-label reveal" style={{ justifyContent: "center", width: "100%" }}>
            06 / Contact
          </span>
          <h2 className="contact-heading reveal">
            Let's Build
            <br />
            <span className="contact-heading-accent">Something Amazing</span>
          </h2>
          <p className="section-subtitle contact-sub reveal">
            Feel free to reach out for collaborations or just a friendly hello.
          </p>

          <ul className="contact-icons reveal reveal-delay-1">
            {socialLinks.map((link, i) => (
              <li key={i}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={link.label}
                >
                  {link.icon}
                  <span className="contact-icon-label">{link.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
