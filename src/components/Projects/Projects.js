import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import grep from "../../Assets/Projects/grep.png";
import lends from "../../Assets/Projects/lends.png";
import swiftedu from "../../Assets/Projects/swiftedu.png";
import chekam from "../../Assets/Projects/chekam.png";
import nike from "../../Assets/Projects/nike.png";

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
              imgPath={nike}
              isBlog={false}
              title="Nike Store"
              description="Fully functional E-Commerce website. Built with Vite + React, Tailwindcss, Redux"
              ghLink="https://github.com/imohh/nike-store"
              demoLink="https://nike-store-roan.vercel.app/"
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


          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={lends}
              isBlog={false}
              title="Lendsqr"
              description="Admin Panel for Lendsqr company that shows the number of users fetched from a dummy API, fetched the data and displayed it in a table, 
              and we caan view each user profile as well as search and filter users"
              ghLink="https://github.com/imohh/lendsqr"
              demoLink="https://imoh-precious-lendsqr-fe-test.vercel.app/"              
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={swiftedu}
              isBlog={false}
              title="Swift Educational Consult"
              description="A recruitment agency that help companies in hiring the best talent for their company. Built with React and Tailwindcss"
              ghLink="https://github.com/imohh/swiftedu"
              demoLink="https://swiftedu.vercel.app/"
            />
          </Col>

        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
