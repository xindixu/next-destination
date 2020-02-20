import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import "./home.css";
import Austin from "../assets/austin.jpg";
import Banner from "../assets/banner.jpg";

const Home = props => {
  return (
    <div className="body">
      <h1>Home</h1>
      <img className="banner" src={Banner} alt="City hunt banner - Austin" />
      <p className="descr">
        The following are randomized cities and their main attractions.{" "}
      </p>
      <Container className="Container">
        <Row className="Row">
          <Col sm>
            <div className="randCity1">
              <h3> Austin, TX </h3>
              <img id="randCity1" src={Austin} alt="Austin" />
              <div>
                <p> Average Airbnb Price: 80</p>
                <p>
                  Venues: <Link to="/venue/emos"> Emo&apos;s Austin</Link>{" "}
                </p>
                <p>
                  Upcoming Artists: <Link to="/artist/khalid"> Khalid</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

Home.propTypes = {};

export default Home;
