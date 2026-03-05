import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";

function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      // Scroll progress
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section via IntersectionObserver (only on home page)
  useEffect(() => {
    if (!isHomePage) return;

    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHomePage]);

  const handleNavClick = useCallback(
    (e, sectionId) => {
      setMobileOpen(false);
      if (isHomePage) {
        e.preventDefault();
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    },
    [isHomePage]
  );

  const navItems = [
    { id: "home", label: "Home", index: "01" },
    { id: "about", label: "About", index: "02" },
    { id: "skills", label: "Skills", index: "03" },
    { id: "projects", label: "Projects", index: "04" },
    { id: "testimonials", label: "Testimonials", index: "05" },
    { id: "contact", label: "Contact", index: "06" },
  ];

  return (
    <nav className={`futuristic-nav ${scrolled ? "nav-scrolled" : ""}`}>
      <div className="nav-container">
        <a href="/" className="nav-logo">
          <span className="logo-text">IMOH</span>
          <span className="logo-dot" />
        </a>

        <button
          className="nav-hamburger"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`nav-menu ${mobileOpen ? "nav-menu-open" : ""}`}>
          <ul className="nav-list">
            {navItems.map((item) =>
              isHomePage ? (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={activeSection === item.id ? "nav-active" : ""}
                    onClick={(e) => handleNavClick(e, item.id)}
                  >
                    <span className="nav-index">{item.index}</span>
                    <span className="nav-label-text">{item.label}</span>
                  </a>
                </li>
              ) : (
                <li key={item.id}>
                  <Link
                    to={`/#${item.id}`}
                    onClick={() => setMobileOpen(false)}
                  >
                    <span className="nav-index">{item.index}</span>
                    <span className="nav-label-text">{item.label}</span>
                  </Link>
                </li>
              )
            )}
            <li>
              <Link
                to="/thoughts"
                className={`nav-blog-link ${
                  location.pathname.startsWith("/thoughts") ? "nav-active" : ""
                }`}
                onClick={() => setMobileOpen(false)}
              >
                Thoughts
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Scroll progress bar */}
      <div
        className="scroll-progress"
        style={{ width: `${scrollProgress}%` }}
      />
    </nav>
  );
}

export default NavBar;
