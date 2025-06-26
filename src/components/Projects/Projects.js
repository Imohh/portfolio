import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import grep from "../../Assets/Projects/grep.png";
import lends from "../../Assets/Projects/lends.png";
import glintz from "../../Assets/Projects/glintz.png";
import chekam from "../../Assets/Projects/chekam.png";
import nike from "../../Assets/Projects/nike.png";
import eminence from "../../Assets/Projects/eminence.png";
import recreate from "../../Assets/Projects/recreate.png";
import sopeadelaja from "../../Assets/Projects/sope.png";
import joel from "../../Assets/Projects/joel.png";
import oprime from "../../Assets/Projects/oprime.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={chekam}
              isBlog={false}
              title="Chekam"
              description="Property listing website with filters that enables users search for properies with ease, built with React, Material-UI, Bootstrap and Firebase."
              demoLink="https://chekam.com"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={joel}
              isBlog={false}
              title="Joel Adu Portfolio"
              description="Portfolio website for a seasoned commercial photographer and advertising consultant."
              demoLink="https://joeladu.com"
            />
          </Col>
          
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={sopeadelaja}
              isBlog={false}
              title="Sope Adelaja Portfolio"
              description="Portfolio website for a creative professional. Built with MERN stack + Stripe"
              // ghLink="https://github.com/imohh/nike-store"
              demoLink="https://sopeadelaja.com/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={recreate}
              isBlog={false}
              title="Recreate Africa"
              description="Storytelling website for a company based in Africa. Built with React, Tailwindcss"
              // ghLink="https://github.com/imohh/recreate-africa"
              demoLink="https://recreateafrica.org"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={eminence}
              isBlog={false}
              title="Eminence E-Commerce"
              description="E-Commerce website for a high end luxury fashion brand based in the UK. Built with MERN Stack + Stripe"
              ghLink="https://github.com/imohh/ecommerce-server"
              demoLink="https://eminencebygtx.com"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={glintz}
              isBlog={false}
              title="Glintz Photography"
              description="A photography website built with MERN Stack. With fully functional Admin Panel"
              ghLink="https://github.com/imohh/glintz-route"
              demoLink="https://glintzphotography.org"
            />
          </Col>
          

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={oprime}
              isBlog={false}
              title="Oprime Tech"
              description="My tech startup where we make our client's visions come to life"
              // ghLink="https://github.com/imohh/mickkycutz"
              demoLink="https://oprimetech.com.ng"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={grep}
              isBlog={false}
              title="Grep"
              description="Delivery app where users can track their orders and also see details of the delivery person assigned to them. Built with React, Tailwindcss, Expressjs, Nodejs and MongoDB"
              ghLink="https://github.com/imohh/grep-website"
              demoLink="https://grep-website.vercel.app/"
            />
          </Col>

          {/*<Col md={4} className="project-card">
            <ProjectCard
              imgPath={nike}
              isBlog={false}
              title="Nike Store"
              description="Fully functional E-Commerce website. Built with Vite + React, Tailwindcss, Redux"
              ghLink="https://github.com/imohh/nike-store"
              demoLink="https://nike-store-roan.vercel.app/"
            />
          </Col>*/}

        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
