import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi Everyone, I am <span className="purple">Imoh Precious </span>
            from <span className="purple"> Akwa Ibom state,</span> based in <span className="purple">Lagos, Nigeria.</span>
            <br /> I am a student pursuing a Bachelor's Degree (BSc)
            in Economics and Finance at Brandon University.
            <br />
            Additionally, I am currently employed as a software developer at
            Chekam.com.
            <br />
            <br />
            Apart from coding, some other activities that I love to do!
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Playing Table Tennis
            </li>
            <li className="about-activity">
              <ImPointRight /> Writing Tech Blogs
            </li>
            <li className="about-activity">
              <ImPointRight /> Travelling
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            "I can change the world. The source codes ain't that complex!"{" "}
          </p>
          <footer className="blockquote-footer">Imoh</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
