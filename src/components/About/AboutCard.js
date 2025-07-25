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
            based in <span className="purple">Lagos, Nigeria.</span>
            <br/>My love for Finance and Technology made me purse a degree in Economics so I can have a blend of the finance world and use that to build awesome products in the tech space. FinTech has always been a field I have always loved.
            <br />
            Additionally, I am currently employed as a software developer at
            Chekam.
            <br />
            I love to use my knowledge of tech to solve real life problems, find solutions, build products.
            <br />
            <br />
            Apart from coding, some other activities that I love to do!
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Playing Table Tennis
            </li>
            <li className="about-activity">
              <ImPointRight /> Travelling
            </li>
            <li className="about-activity">
              <ImPointRight /> Conducting research to get new information I might never use, like I can identify at least 150 flags out of 194 countries in the world for no reason.
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
