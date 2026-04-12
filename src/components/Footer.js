import { motion } from "framer-motion";
import {
  AiFillGithub,
  AiOutlineTwitter,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="pf-footer">
      <div className="pf-footer__inner">
        <p className="pf-footer__copy">
          &copy; {year}{" "}
          <span style={{ color: "var(--text-200)" }}>Imoh Precious</span>
          {" "}— Built with purpose.
        </p>

        <ul className="pf-footer__socials">
          {[
            { href: "https://github.com/imohh",                   icon: <AiFillGithub />,    label: "GitHub"    },
            { href: "https://twitter.com/imoh_xo",                icon: <AiOutlineTwitter />, label: "Twitter"   },
            { href: "https://www.linkedin.com/in/precious-imoh/", icon: <FaLinkedinIn />,    label: "LinkedIn"  },
            { href: "https://www.instagram.com/imoh_xo",          icon: <AiFillInstagram />, label: "Instagram" },
          ].map(({ href, icon, label }, i) => (
            <li key={i}>
              <motion.a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                {icon}
              </motion.a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
