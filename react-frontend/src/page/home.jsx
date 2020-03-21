import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import "./home.css";
import Austin from "../assets/austin.jpg";
import Banner from "../assets/banner.jpg";

const Home = () => {
  return (
    <div className="body">
    <div className="title">
       <h1>Project Name</h1>
       <p className="descr">
        Discover something new!{" "}
      </p>
    </div>
    <div className="bottom-text-container">
      <Container className="Container">
        <Row>
          <Col className="text">
            <p className="city-name">Austin, TX</p>
            <p> Average Airbnb Price: 80</p>
            <p> # of restaurants in the area</p>
            <p> # of upcoming events in the area: 90 </p>
          </Col>
        </Row>
      </Container>
    </div>
    </div>
  );
};

export default Home;
