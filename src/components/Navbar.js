import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { id: "home",         label: "Home",         index: "01" },
  { id: "about",        label: "About",        index: "02" },
  { id: "skills",       label: "Skills",       index: "03" },
  { id: "projects",     label: "Projects",     index: "04" },
  { id: "testimonials", label: "Testimonials", index: "05" },
  { id: "contact",      label: "Contact",      index: "06" },
];

function NavBar() {
  const [scrolled,       setScrolled]       = useState(false);
  const [mobileOpen,     setMobileOpen]     = useState(false);
  const [activeSection,  setActiveSection]  = useState("home");
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  /* ── Scroll events ── */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) setScrollProgress((window.scrollY / total) * 100);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Active section tracker ── */
  useEffect(() => {
    if (!isHomePage) return;
    const sections = document.querySelectorAll("section[id]");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActiveSection(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [isHomePage]);

  /* ── Smooth scroll on home page ── */
  const handleNavClick = useCallback(
    (e, id) => {
      setMobileOpen(false);
      if (isHomePage) {
        e.preventDefault();
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }
    },
    [isHomePage]
  );

  /* ── Lock body scroll when mobile menu open ── */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        className={`pf-nav ${scrolled ? "pf-nav--scrolled" : ""}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="pf-nav__inner">

          {/* Logo */}
          <a href="/" className="pf-nav__logo">
            <span className="pf-nav__logo-text">IMOH</span>
            <span className="pf-nav__logo-dot" />
          </a>

          {/* Desktop links */}
          <ul className="pf-nav__links">
            {navItems.map((item) =>
              isHomePage ? (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={`pf-nav__link ${activeSection === item.id ? "pf-nav__link--active" : ""}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                  >
                    <span className="pf-nav__link-index">{item.index}</span>
                    {item.label}
                  </a>
                </li>
              ) : (
                <li key={item.id}>
                  <Link
                    to={`/#${item.id}`}
                    className="pf-nav__link"
                    onClick={() => setMobileOpen(false)}
                  >
                    <span className="pf-nav__link-index">{item.index}</span>
                    {item.label}
                  </Link>
                </li>
              )
            )}
            <li>
              <Link
                to="/thoughts"
                className={`pf-nav__link pf-nav__link--blog ${location.pathname.startsWith("/thoughts") ? "pf-nav__link--active" : ""}`}
                onClick={() => setMobileOpen(false)}
              >
                Thoughts
              </Link>
            </li>
          </ul>

          {/* Hamburger */}
          <button
            className={`pf-nav__hamburger ${mobileOpen ? "is-open" : ""}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>

        {/* Scroll progress bar */}
        <div className="pf-nav__progress-track">
          <motion.div
            className="pf-nav__progress-fill"
            style={{ scaleX: scrollProgress / 100, originX: 0 }}
          />
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="backdrop"
              className="pf-mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              key="drawer"
              className="pf-mobile-drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Close */}
              <button
                className="pf-mobile-drawer__close"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                ✕
              </button>

              <ul className="pf-mobile-drawer__links">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {isHomePage ? (
                      <a
                        href={`#${item.id}`}
                        className={`pf-mobile-drawer__link ${activeSection === item.id ? "is-active" : ""}`}
                        onClick={(e) => handleNavClick(e, item.id)}
                      >
                        <span className="pf-mobile-drawer__index">{item.index}</span>
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        to={`/#${item.id}`}
                        className="pf-mobile-drawer__link"
                        onClick={() => setMobileOpen(false)}
                      >
                        <span className="pf-mobile-drawer__index">{item.index}</span>
                        {item.label}
                      </Link>
                    )}
                  </motion.li>
                ))}
                <motion.li
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + navItems.length * 0.06, duration: 0.4 }}
                >
                  <Link
                    to="/thoughts"
                    className="pf-mobile-drawer__link"
                    onClick={() => setMobileOpen(false)}
                  >
                    Thoughts
                  </Link>
                </motion.li>
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default NavBar;
