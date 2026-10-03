import { AiFillGithub, AiOutlineTwitter, AiFillInstagram } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { DiJavascript1, DiReact, DiNodejs, DiMongodb, DiGit, DiPhp } from "react-icons/di";
import { SiNextdotjs, SiPostgresql, SiTypescript, SiVisualstudiocode, SiPostman, SiVercel } from "react-icons/si";

import parensure from "./Assets/opt/parensure.jpg";
import learnbuddie from "./Assets/opt/learnbuddie.jpg";
import sopeadelaja from "./Assets/opt/sope.jpg";
import recreate from "./Assets/opt/recreate.jpg";
import glintz from "./Assets/opt/glintz.jpg";
import joel from "./Assets/opt/joel.jpg";
import ycc from "./Assets/opt/ycc.jpg";

export const socialLinks = [
  { href: "https://github.com/imohh", icon: <AiFillGithub />, label: "GitHub" },
  { href: "https://twitter.com/imoh_xo", icon: <AiOutlineTwitter />, label: "Twitter" },
  { href: "https://www.linkedin.com/in/precious-imoh/", icon: <FaLinkedinIn />, label: "LinkedIn" },
  { href: "https://www.instagram.com/imoh_xo", icon: <AiFillInstagram />, label: "Instagram" },
];

export const toolbox = [
  { icon: <DiReact />, label: "React" },
  { icon: <SiTypescript />, label: "TypeScript" },
  { icon: <DiJavascript1 />, label: "JavaScript" },
  { icon: <SiNextdotjs />, label: "Next.js" },
  { icon: <DiNodejs />, label: "Node.js" },
  { icon: <DiMongodb />, label: "MongoDB" },
  { icon: <SiPostgresql />, label: "PostgreSQL" },
  { icon: <DiPhp />, label: "PHP" },
  { icon: <DiGit />, label: "Git" },
  { icon: <SiVercel />, label: "Vercel" },
  { icon: <SiPostman />, label: "Postman" },
  { icon: <SiVisualstudiocode />, label: "VS Code" },
];

export const projects = [
  {
    img: parensure, title: "Parensure", tag: "Caregiving platform", year: "2025",
    stack: "React Native / Node",
    demoLink: "https://play.google.com/store/apps/details?id=com.parensure&hl=en",
  },
  { img: joel, title: "Joel Adu", tag: "Photographer portfolio", year: "2025", stack: "React / Vercel", demoLink: "https://joelstudio.vercel.app" },
  { img: learnbuddie, title: "Learnbuddie", tag: "EdTech platform", year: "2024", stack: "React / Node", demoLink: "https://learnbuddie.com" },
  { img: sopeadelaja, title: "Sope Adelaja", tag: "Creative portfolio + store", year: "2024", stack: "MERN / Stripe", demoLink: "https://sopeadelaja.com/" },
  { img: recreate, title: "Recreate Africa", tag: "Storytelling site", year: "2023", stack: "React / Tailwind", demoLink: "https://recreateafrica.org" },
  { img: glintz, title: "Glintz Photography", tag: "Photography + admin panel", year: "2023", stack: "MERN", demoLink: "https://glintzphotography.org" },
  { img: ycc, title: "Yacht Crew Center", tag: "Maritime platform", year: "2022", stack: "React / Node", demoLink: "https://yachtcrewcenter.com" },
];

export const testimonials = [
  { quote: "Your ability to translate my ideas into code is what is making Parensure a reality! I greatly appreciate your work and support!", name: "Julio", role: "CEO, Parensure" },
  { quote: "Imoh is a highly skilled developer especially in ReactJs. He has incredible leadership skills, as well as an exemplary work ethic and friendly temperament, making him the model professional and wonderful human being.", name: "Charles Hul", role: "CEO, Chekam" },
  { quote: "Having been in the tech space for over 15 years, I can say for certain that Imoh is one of the most brilliant developers I have worked with. He has in-depth knowledge of multiple modern development technologies and the ability to learn quickly.", name: "Joseph Abyem", role: "CTO, Chekam" },
  { quote: "I own a London based luxury brand. Precious built my E-Commerce website and was the head of my tech department. He was easy to work with and also willing to learn.", name: "Etopidiok Joshua", role: "Financial Markets Enthusiast" },
  { quote: "Extremely professional and puts out deliverables very timely.", name: "Joel Adu", role: "Photographer" },
  { quote: "Precious is an amazing web developer, easy to work with and he gives attention to details.", name: "Temitope Jalekun", role: "Photographer" },
];
