import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import "./home.css";
import apiFetch from "../lib/api-fetch";


const Home = () => {
  const [city, setCity] = useState(null);
  const [image, setImage] = useState("");
  const [isError, setIsError] = useState(false);
  
  useEffect(() => {
    apiFetch(`/random-city`, {})
      .then(data => {
        console.log("BON")
        setCity(data.city);
      })
      .catch(() => {
        console.log("NON")
        setIsError(true);
      });
  }, []);
  console.log(city)
  // useEffect(() => {
  //   fetch(`https://api.teleport.org/api/urban_areas/slug:${t_id}/images/`)
  //     .then(resp => resp.json())
  //     .then(data => {
  //       try {
  //         setImage(data.photos[0].image.web);
  //       } catch (error) {
  //         console.error("No image available");
  //       }
  //     });
  // }, []);

  
  console.log({image});
  if (city) {
    const { state, latitude, longitude, population, description, name } = city;
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
                <img src={image} alt={name}></img>
                <p className="city-name">{name}, {state}</p>
                <p> Population: {population}</p>
                <p> Description: {description}</p>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  };
  return <>
    <h1>NO CITY FOUND</h1>
  </>;
};


export default Home;
