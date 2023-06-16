import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/avatar.svg";
import Tilt from "react-parallax-tilt";
import {
  AiFillGithub,
  AiOutlineTwitter,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

function Home2() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              LET ME <span className="purple"> INTRODUCE </span> MYSELF
            </h1>
            <p className="home-about-body">
              I fell in love with programming and I have at least learnt
              something, I think… 🤷‍♂️
              <br />
              <br />I am fluent in classics like
              <i>
                <b className="purple">React, Typescript, Angular, Javascript, Nodejs, Expressjs and MongoDB</b>
              </i>
              <br />
              <br />
              My field of Interest's are building new &nbsp;
              <i>
                <b className="purple">Web Technologies and Products </b> and
                also in areas related to{" "}
                <b className="purple">
                  Blockchain.
                </b>
              </i>
              <br />
              <br />
              Whenever possible, I also apply my passion for developing products
              with <b className="purple">Node.js</b> and
              <i>
                <b className="purple">
                  {" "}
                  Modern Javascript Library and Frameworks
                </b>
              </i>
              &nbsp; like
              <i>
                <b className="purple"> React.js and Next.js</b>
              </i>
            </p>
          </Col>
          <Col md={4} className="myAvtar">
            <Tilt>
              <img src={myImg} className="img-fluid" alt="avatar" />
            </Tilt>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="testimonials">
            <Swiper
              spaceBetween={30}
              centeredSlides={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Autoplay, Pagination, Navigation]}
              className="mySwiper"
            >
              <SwiperSlide>
                <p>
                  <span className="purple apostrophe">""</span>
                    Imoh is a highly skilled developer especially in ReactJs. He has incredible leadership skills, 
                    as well as an exemplary work ethic and friendly temprament, making him the model professional 
                    and wonderful human being. It was, and always is, a pleasure working with him.
                  <span className="purple apostrophe">""</span>
                  <br /><br />
                  charles hul<br /><br />
                  CEO Chekam
                </p>
              </SwiperSlide>
              <SwiperSlide>
                <p>
                  <span className="purple apostrophe">""</span>
                  <span className="long-paaragraph">
                  Having been in the tech pace for over 15years, I can say for certain that Imoh 
                  is one of the most brilliant developers I have worked with. He has in-depth knowledge 
                  of multiple modern development technologies and the ability to learn quickly newer 
                  technologies. He delivers projects in a timely and professional way. His humility 
                  is second to none and he codes brilliantly!</span>
                  <span className="purple apostrophe">""</span>
                  <br /><br />
                  joseph abyem<br /><br />
                  CTO Chekam
                </p>
              </SwiperSlide>
              <SwiperSlide>
                <p>
                  <span className="purple apostrophe">""</span>
                  I own a London based luxury brand. Precious built my E-Commerce website and was the head of 
                  my tech department. He was easy to work with and also willing to learn.
                  <span className="purple apostrophe">""</span>
                  <br /><br />
                  temitope jalekun<br /><br />
                  Photographer
                </p>
              </SwiperSlide>
              <SwiperSlide>
                <p>
                  <span className="purple apostrophe">""</span>
                  Extremely professional and puts out deliverables very timely
                  <span className="purple apostrophe">""</span>
                  <br /><br />
                  joel adu<br /><br />
                  Photographer
                </p>
              </SwiperSlide>
              <SwiperSlide>
                <p>
                  <span className="purple apostrophe">""</span>
                  Precious is an amazing web developer, easy to work with and he gives attention to details.
                  <span className="purple apostrophe">""</span>
                  <br /><br />
                  temitope jalekun<br /><br />
                  Photographer
                </p>
              </SwiperSlide>
            </Swiper>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="home-about-social">
            <h1>FIND ME ON</h1>
            <p>
              Feel free to <span className="purple">connect </span>with me
            </p>
            <ul className="home-about-social-links">
              <li className="social-icons">
                <a
                  href="https://github.com/imohh"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <AiFillGithub />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://twitter.com/imoh_xo"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <AiOutlineTwitter />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.linkedin.com/in/precious-imoh/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <FaLinkedinIn />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.instagram.com/imoh_xo"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <AiFillInstagram />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
export default Home2;
