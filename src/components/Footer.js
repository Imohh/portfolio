import {
  AiFillGithub,
  AiOutlineTwitter,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

function Footer() {
  let year = new Date().getFullYear();

  return (
    <footer className="futuristic-footer">
      <div className="footer-inner-v2">
        <p className="footer-copy-v2">
          &copy; {year} Imoh Precious. All rights reserved.
        </p>
        <ul className="footer-socials-v2">
          <li>
            <a href="https://github.com/imohh" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <AiFillGithub />
            </a>
          </li>
          <li>
            <a href="https://twitter.com/imoh_xo" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <AiOutlineTwitter />
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/precious-imoh/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/imoh_xo" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <AiFillInstagram />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
