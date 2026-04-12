import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion";
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
import { BsArrowUpRight } from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import Type from "./Home/Type";
import myImg from "../Assets/imoh.png";

import grep from "../Assets/Projects/grep.png";
import learnbuddie from "../Assets/Projects/learnbuddie.png";
import sopeadelaja from "../Assets/Projects/sope.png";
import recreate from "../Assets/Projects/recreate.png";
import glintz from "../Assets/Projects/glintz.png";
import joel from "../Assets/Projects/joel.png";
import ycc from "../Assets/Projects/ycc.png";

import "./LandingPage.css";

/* ─────────────────────────────────────────
   Data
───────────────────────────────────────── */
const socialLinks = [
  { href: "https://github.com/imohh",                       icon: <AiFillGithub />,    label: "GitHub"    },
  { href: "https://twitter.com/imoh_xo",                    icon: <AiOutlineTwitter />, label: "Twitter"   },
  { href: "https://www.linkedin.com/in/precious-imoh/",     icon: <FaLinkedinIn />,    label: "LinkedIn"  },
  { href: "https://www.instagram.com/imoh_xo",              icon: <AiFillInstagram />, label: "Instagram" },
];

const techStack = [
  { icon: <DiJavascript1 />, label: "JavaScript" },
  { icon: <DiReact />,       label: "React"       },
  { icon: <SiTypescript />,  label: "TypeScript"  },
  { icon: <DiNodejs />,      label: "Node.js"     },
  { icon: <DiMongodb />,     label: "MongoDB"     },
  { icon: <SiNextdotjs />,   label: "Next.js"     },
  { icon: <DiGit />,         label: "Git"         },
  { icon: <DiPhp />,         label: "PHP"         },
  { icon: <SiPostgresql />,  label: "PostgreSQL"  },
];

const tools = [
  { icon: <SiVisualstudiocode />, label: "VS Code"  },
  { icon: <SiPostman />,          label: "Postman"  },
  { icon: <SiSlack />,            label: "Slack"    },
  { icon: <SiVercel />,           label: "Vercel"   },
];

const projects = [
  {
    img: joel,
    title: "Joel Adu",
    tag: "Photographer Portfolio",
    description: "Cinematic portfolio for a creative photographer — bold image-first layouts, smooth galleries, and an elegant booking experience.",
    demoLink: "https://joelstudio.vercel.app",
  },
  {
    img: learnbuddie,
    title: "Learnbuddie",
    tag: "EdTech Platform",
    description: "A comprehensive learning platform for students — intuitive UI, real-time updates, and a seamless educational experience.",
    demoLink: "https://learnbuddie.com",
  },
  {
    img: sopeadelaja,
    title: "Sope Adelaja Portfolio",
    tag: "Creative Portfolio",
    description: "Portfolio website for a creative professional. Built with MERN stack + Stripe for premium digital product delivery.",
    demoLink: "https://sopeadelaja.com/",
  },
  {
    img: recreate,
    title: "Recreate Africa",
    tag: "Storytelling Website",
    description: "Immersive storytelling website for an African creative company. Built with React and Tailwind CSS.",
    demoLink: "https://recreateafrica.org",
  },
  {
    img: glintz,
    title: "Glintz Photography",
    tag: "Photography Platform",
    description: "Full-stack photography showcase with a custom Admin Panel for managing galleries, bookings, and client work.",
    demoLink: "https://glintzphotography.org",
  },
  {
    img: ycc,
    title: "Yacht Crew Connect",
    tag: "Maritime Platform",
    description: "A dedicated platform for yacht crew members — crew profiles, vessel listings, job postings, and everything pertaining to life at sea.",
    demoLink: "https://yachtcrewcenter.com",
  },
  {
    img: grep,
    title: "Grep Delivery",
    tag: "Delivery App",
    description: "Real-time order tracking app — users see their order status and assigned delivery person live. MERN stack + Tailwind.",
    demoLink: "https://grep-website.vercel.app",
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

const row1 = [...techStack, ...techStack];
const row2 = [...tools, ...techStack.slice(0, 5), ...tools, ...techStack.slice(0, 5)];

/* ─────────────────────────────────────────
   Animation Variants
───────────────────────────────────────── */
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden:  { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT_EXPO } },
};

/* ─────────────────────────────────────────
   Scramble Name Effect
───────────────────────────────────────── */
const GLYPH_POOL = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@$!%&?";

function ScrambleChar({ char, startDelay, outlined }) {
  const [display,  setDisplay]  = useState("\u00A0"); // non-breaking space holds layout
  const [resolved, setResolved] = useState(false);

  useEffect(() => {
    let interval;
    let count = 0;
    const CYCLES = 10;  // random chars shown before lock-in
    const SPEED  = 42;  // ms per swap

    const timeout = setTimeout(() => {
      setDisplay(GLYPH_POOL[Math.floor(Math.random() * GLYPH_POOL.length)]);

      interval = setInterval(() => {
        count++;
        if (count >= CYCLES) {
          clearInterval(interval);
          setDisplay(char);
          setResolved(true);
        } else {
          setDisplay(GLYPH_POOL[Math.floor(Math.random() * GLYPH_POOL.length)]);
        }
      }, SPEED);
    }, startDelay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [char, startDelay]);

  return (
    <span
      className={[
        "pf-hero__name-char",
        !resolved ? "pf-name--scramble" : "",
        resolved && outlined ? "pf-name--outlined" : "",
      ].filter(Boolean).join(" ")}
    >
      {display}
    </span>
  );
}

function ScrambleText({ word, baseDelay, outlined = false }) {
  return (
    <div style={{ display: "flex" }}>
      {word.split("").map((char, i) => (
        <ScrambleChar
          key={i}
          char={char}
          startDelay={baseDelay + i * 80}
          outlined={outlined}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────
   Helpers
───────────────────────────────────────── */
function SectionReveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });
  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children, number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });
  return (
    <motion.div
      ref={ref}
      className="pf-section-eyebrow"
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
    >
      <span className="pf-section-eyebrow__num">{number}</span>
      <span className="pf-section-eyebrow__line" />
      <span className="pf-section-eyebrow__label">{children}</span>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   Main Component
───────────────────────────────────────── */
function LandingPage() {
  /* Custom cursor */
  const cursorRef   = useRef(null);
  const cursorDotRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (cursorRef.current) {
      cursorRef.current.style.transform   = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`;
    }
    if (cursorDotRef.current) {
      cursorDotRef.current.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`;
    }
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  /* Hero parallax */
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY      = useTransform(heroScroll, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.6], [1, 0]);

  return (
    <div className="pf-page">

      {/* ── Custom Cursor ── */}
      <div ref={cursorRef}    className="pf-cursor-ring" />
      <div ref={cursorDotRef} className="pf-cursor-dot"  />

      {/* ── Grain ── */}
      <div className="pf-grain" aria-hidden="true" />

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section className="pf-hero" id="home" ref={heroRef}>

        {/* Ambient background */}
        <div className="pf-hero__bg-orb pf-hero__bg-orb--lime"   aria-hidden="true" />
        <div className="pf-hero__bg-orb pf-hero__bg-orb--purple" aria-hidden="true" />
        <div className="pf-hero__grid-lines"                      aria-hidden="true" />

        <motion.div
          className="pf-container pf-hero__content"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          {/* Left column */}
          <div className="pf-hero__left">
            <motion.div
              className="pf-hero__badge"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.6, ease: EASE_OUT_EXPO }}
            >
              <span className="pf-hero__badge-dot" />
              Available for work
            </motion.div>

            {/* Name — scramble decode reveal */}
            <div className="pf-hero__name" aria-label="Imoh Precious">
              <div className="pf-hero__name-row">
                <ScrambleText word="IMOH"     baseDelay={1500} outlined={false} />
              </div>
              <div className="pf-hero__name-row">
                <ScrambleText word="PRECIOUS" baseDelay={1820} outlined={true}  />
              </div>
            </div>

            {/* Typewriter role */}
            <motion.div
              className="pf-hero__role"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 2.2, ease: EASE_OUT_EXPO }}
            >
              <span className="pf-hero__role-prefix">I'm a </span>
              <span className="pf-hero__role-type"><Type /></span>
            </motion.div>

            {/* Description */}
            <motion.p
              className="pf-hero__desc"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 2.4, ease: EASE_OUT_EXPO }}
            >
              Software Developer based in Lagos, Nigeria. I build modern web
              applications and turn ideas into elegant, functional products.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="pf-hero__cta"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 2.6, ease: EASE_OUT_EXPO }}
            >
              <a href="#projects" className="pf-btn pf-btn--primary">
                View Work <BsArrowUpRight />
              </a>
              <a href="#contact" className="pf-btn pf-btn--ghost">
                Let's Talk
              </a>
            </motion.div>

            {/* Socials */}
            <motion.ul
              className="pf-hero__socials"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 2.9 }}
            >
              {socialLinks.map((link, i) => (
                <li key={i}>
                  <a href={link.href} target="_blank" rel="noreferrer" aria-label={link.label}>
                    {link.icon}
                  </a>
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Right column — avatar */}
          <motion.div
            className="pf-hero__right"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.0, delay: 1.8, ease: EASE_OUT_EXPO }}
          >
            <div className="pf-hero__avatar-wrap">
              <div className="pf-hero__avatar-glow" />
              <img src={myImg} alt="Imoh Precious" className="pf-hero__avatar" />
              <div className="pf-hero__avatar-border" />

              {/* Floating stat chips */}
              <motion.div
                className="pf-chip pf-chip--tl"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="pf-chip__num">5+</span>
                <span className="pf-chip__label">Years Exp.</span>
              </motion.div>
              <motion.div
                className="pf-chip pf-chip--br"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <span className="pf-chip__num">30+</span>
                <span className="pf-chip__label">Projects</span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="pf-hero__scroll"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.2, duration: 0.6 }}
        >
          <div className="pf-hero__scroll-line">
            <motion.div
              className="pf-hero__scroll-dot"
              animate={{ y: [0, 40, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <span>Scroll</span>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════
          MARQUEE STATEMENT (cinematic divider)
      ══════════════════════════════════════ */}
      <div className="pf-marquee-statement" aria-hidden="true">
        <div className="pf-marquee-statement__track">
          {Array(6).fill(null).map((_, i) => (
            <span key={i} className="pf-marquee-statement__item">
              Building the Web — One Pixel at a Time
              <span className="pf-marquee-statement__dot">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════
          ABOUT
      ══════════════════════════════════════ */}
      <section className="pf-section pf-about" id="about">
        <div className="pf-container">
          <SectionLabel number="02">About</SectionLabel>

          <div className="pf-about__grid">
            {/* Text */}
            <div className="pf-about__text">
              <SectionReveal>
                <h2 className="pf-section-title">
                  Crafting digital<br />
                  <span className="pf-text-accent">experiences</span> that matter.
                </h2>
              </SectionReveal>

              <SectionReveal delay={0.1}>
                <p className="pf-about__body">
                  Hi! I'm <strong>Imoh Precious</strong>, a software developer based in Lagos, Nigeria.
                  My love for Finance and Technology made me pursue a degree in Economics — so I can
                  blend the finance world with building awesome products in the tech space.
                </p>
              </SectionReveal>

              <SectionReveal delay={0.15}>
                <p className="pf-about__body">
                  I'm fluent in{" "}
                  <span className="pf-text-accent">React, TypeScript, Next.js, Node.js, Express.js, and MongoDB</span>.
                  My interests lie in building new web technologies, exploring the Blockchain space,
                  and crafting interfaces that feel premium and effortless.
                </p>
              </SectionReveal>

              <SectionReveal delay={0.2}>
                <p className="pf-about__body">
                  Currently employed as a software developer at <strong>Chekam</strong>, using
                  technology to solve real-life problems and build impactful products.
                </p>
              </SectionReveal>

              <SectionReveal delay={0.25}>
                <ul className="pf-about__hobbies">
                  {["Playing Table Tennis", "Travelling the world", "Identifying 150+ country flags — and counting"].map((h, i) => (
                    <li key={i}>
                      <span className="pf-about__hobby-arrow">▶</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </SectionReveal>

              <SectionReveal delay={0.3}>
                <blockquote className="pf-about__quote">
                  <span className="pf-about__quote-mark">"</span>
                  I can change the world. The source codes ain't that complex!
                  <cite>— Imoh</cite>
                </blockquote>
              </SectionReveal>
            </div>

            {/* Image + stats */}
            <div className="pf-about__visual">
              <SectionReveal>
                <div className="pf-about__img-wrap">
                  <img src={myImg} alt="Imoh Precious" className="pf-about__img" />
                  <div className="pf-about__img-border" />
                  <div className="pf-about__img-glow" />
                </div>
              </SectionReveal>

              {/* Stats row */}
              <div className="pf-about__stats">
                {[
                  { num: "5+",  label: "Years of experience" },
                  { num: "30+", label: "Projects shipped" },
                  { num: "10+", label: "Happy clients"  },
                ].map((stat, i) => (
                  <SectionReveal key={i} delay={0.1 * i}>
                    <div className="pf-about__stat">
                      <span className="pf-about__stat-num">{stat.num}</span>
                      <span className="pf-about__stat-label">{stat.label}</span>
                    </div>
                  </SectionReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SKILLS
      ══════════════════════════════════════ */}
      <section className="pf-section pf-skills" id="skills">
        <div className="pf-container">
          <SectionLabel number="03">Skills</SectionLabel>
          <SectionReveal>
            <h2 className="pf-section-title">
              Technologies I wield<br />
              <span className="pf-text-accent">every single day.</span>
            </h2>
          </SectionReveal>
        </div>

        {/* Marquee row 1 — left */}
        <div className="pf-skills__marquee-wrap">
          <div className="pf-skills__track pf-skills__track--left">
            {[...row1, ...row1].map((s, i) => (
              <div className="pf-skill-pill" key={`a-${i}`}>
                <span className="pf-skill-pill__icon">{s.icon}</span>
                <span className="pf-skill-pill__label">{s.label}</span>
              </div>
            ))}
          </div>
          {/* Row 2 — right */}
          <div className="pf-skills__track pf-skills__track--right">
            {[...row2, ...row2].map((s, i) => (
              <div className="pf-skill-pill" key={`b-${i}`}>
                <span className="pf-skill-pill__icon">{s.icon}</span>
                <span className="pf-skill-pill__label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          PROJECTS
      ══════════════════════════════════════ */}
      <section className="pf-section pf-projects" id="projects">
        <div className="pf-container">
          <SectionLabel number="04">Projects</SectionLabel>
          <SectionReveal>
            <h2 className="pf-section-title">
              Featured <span className="pf-text-accent">work.</span>
            </h2>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <p className="pf-section-sub">
              A selection of things I've built — from platforms to experiences.
            </p>
          </SectionReveal>
        </div>

        <div className="pf-work-list">
          {projects.map((project, i) => (
            <WorkItem key={i} project={project} index={i} />
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════ */}
      <section className="pf-section pf-testimonials" id="testimonials">
        <div className="pf-container">
          <SectionLabel number="05">Testimonials</SectionLabel>
          <SectionReveal>
            <h2 className="pf-section-title">
              Words from people<br />
              <span className="pf-text-accent">I've built with.</span>
            </h2>
          </SectionReveal>

          <SectionReveal delay={0.15}>
            <div className="pf-swiper-wrap">
              <Swiper
                spaceBetween={32}
                centeredSlides={true}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
              >
                {testimonials.map((t, i) => (
                  <SwiperSlide key={i}>
                    <div className="pf-testimonial">
                      <div className="pf-testimonial__mark">"</div>
                      <p className="pf-testimonial__text">{t.quote}</p>
                      <div className="pf-testimonial__author">
                        <span className="pf-testimonial__name">{t.name}</span>
                        <span className="pf-testimonial__role">{t.role}</span>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CONTACT
      ══════════════════════════════════════ */}
      <section className="pf-section pf-contact" id="contact">
        <div className="pf-contact__bg-orb" aria-hidden="true" />
        <div className="pf-container pf-contact__inner">
          <SectionLabel number="06">Contact</SectionLabel>

          <SectionReveal>
            <h2 className="pf-contact__heading">
              Let's build something<br />
              <span className="pf-text-lime">extraordinary.</span>
            </h2>
          </SectionReveal>

          <SectionReveal delay={0.15}>
            <p className="pf-contact__sub">
              Whether it's a new project, a collaboration, or just a hello — I'm all ears.
            </p>
          </SectionReveal>

          <SectionReveal delay={0.25}>
            <a
              href="mailto:imohokonp@gmail.com"
              className="pf-contact__email"
            >
              imohokonp@gmail.com
              <BsArrowUpRight className="pf-contact__email-icon" />
            </a>
          </SectionReveal>

          <SectionReveal delay={0.35}>
            <ul className="pf-contact__socials">
              {socialLinks.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={link.label}
                    className="pf-contact__social-link"
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}

/* ─────────────────────────────────────────
   Work Item — editorial list row
───────────────────────────────────────── */
function WorkItem({ project, index }) {
  const [hovered, setHovered] = useState(false);
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });

  return (
    <motion.div
      ref={ref}
      className="pf-work-item"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.09, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Bottom-border sweep */}
      <motion.div
        className="pf-work-item__sweep"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Floating image preview */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="pf-work-item__preview"
            initial={{ opacity: 0, scale: 0.86, y: 16 }}
            animate={{ opacity: 1, scale: 1,    y: 0  }}
            exit={{    opacity: 0, scale: 0.92,  y: 8  }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <img src={project.img} alt={project.title} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Row content — wraps the whole row as a link */}
      <a
        href={project.demoLink}
        target="_blank"
        rel="noreferrer"
        className="pf-work-item__inner"
      >
        {/* Index */}
        <motion.span
          className="pf-work-item__num"
          animate={{ color: hovered ? "var(--lime)" : "var(--text-400)" }}
          transition={{ duration: 0.2 }}
        >
          0{index + 1}
        </motion.span>

        {/* Title + tag */}
        <div className="pf-work-item__info">
          <motion.h3
            className="pf-work-item__title"
            animate={{ x: hovered ? 10 : 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {project.title}
          </motion.h3>
          <span className="pf-work-item__tag">{project.tag}</span>
        </div>

        {/* Arrow */}
        <motion.span
          className="pf-work-item__arrow"
          animate={{
            rotate:  hovered ? 45  : 0,
            x:       hovered ? 4   : 0,
            y:       hovered ? -4  : 0,
            color:   hovered ? "var(--lime)" : "var(--text-400)",
          }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        >
          <BsArrowUpRight />
        </motion.span>
      </a>
    </motion.div>
  );
}

export default LandingPage;
