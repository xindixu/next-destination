import React from "react";
import PropTypes from "prop-types";
import "./home.css";
import { Row, Col, Container } from "react-bootstrap";
import Austin from "./austin.jfif";
import Banner from "./banner.jpg";

const Contact = props => {
  return (
    <>
      <div class="body">
        <h1>Contact Us</h1>
        <img className="banner" src={Banner} alt="Picture of City" />

        <p className="descr">
          {" "}
          The following are randomized cities and their main attractions.{" "}
        </p>

        <Container className="show-grid">
          <Row className="Row">
            <Col xs={1} md={4}>
              <div className="test">test1</div>
            </Col>
            <Col xs={4} md={4}>
              <div className="randCity1">
                <h3> Austin, TX </h3>
                <img id="randCity1" src={Austin} alt="pic of city" />

                <div>
                  <p> Average Airbnb Price: </p>
                  <p> Main Attractions: </p>
                  <p> #BBQ, #Music, #Nightlife </p>
                  <p> Similar Cities </p>
                  <p> City A, City B City C </p>
                </div>
              </div>
            </Col>
            <Col xs={1} md={4}>
              <div className="test">test2</div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

Contact.propTypes = {};

export default Contact;
