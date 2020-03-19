import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import "./home.css";
import Austin from "../assets/austin.jpg";
import Banner from "../assets/banner.jpg";

const Home = () => {
  return (
    <div className="body">
      <img className="banner" src={Banner} alt="City hunt banner - Austin" />
      <h1>Home</h1>
      <p className="descr">
        The following are randomized cities and their main attractions.{" "}
      </p>
      <Container className="Container">
        <Row className="Row">
          <Col>
            <h3> Austin, TX</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <img src={Austin} alt="Austin" className="base" />
          </Col>
          <Col className="text">
            <p> Average Airbnb Price: 80</p>
            <p> # of restaurants in the area</p>
            <p> # of upcoming events in the area: 90 </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
Home.propTypes = {};

export default Home;
