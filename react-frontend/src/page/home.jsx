import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import "./home.css";

const Home = () => {
  var cities = [{"cityname": "Austin, TX", "AveragePrice": "80", "Restaurants":"90","UpcomingEvents":"90"},
  {"cityname": "New York, NY", "AveragePrice": "160", "Restaurants":"1000","UpcomingEvents":"100"},
  {"cityname": "Boston, MA", "AveragePrice": "140", "Restaurants":"900","UpcomingEvents":"120"}
  ];
  const rand = cities[Math.floor(Math.random()*3)];
  return (
    <div id="home">
      <div className="title">
        <h1>City Hunt</h1>
        <p className="description">
          Discover something new!
          Make your dream vacation happen.. City Hunt is a centralized application designed to simplify travel arrangements.
          Try our random city generator to start discovering new places!
          </p>
      </div>
      <div className="bottom-text-container">
        <Container className="Container">
          <Row>
            <Col className="text">
              <p className="city-name">{rand["cityname"]}</p>
              <p> Average Airbnb Price: {rand["AveragePrice"]}</p>
              <p> # of restaurants in the area: {rand["Restaurants"]}</p>
              <p> # of upcoming events in the area: {rand["UpcomingEvents"]}</p>
            </Col>

          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Home;
