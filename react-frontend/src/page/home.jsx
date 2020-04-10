import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import "./home.css";
import apiFetch from "../lib/api-fetch";

const Home = () => {
  const [city, setCity] = useState(null);
  const [isError, setIsError] = useState(false);
  var cities = [
      {"name":"New York City"} ,
      {"name":"Los Angeles"} ,
      {"name":"Chicago"} ,
      {"name":"Miami"} ,
      {"name":"Dallas"} ,
      {"name":"Philadelphia"} ,
      {"name":"Houston"} ,
      {"name":"Washington"} ,
      {"name":"Atlanta"} ,
      {"name":"Boston"} ,
      {"name":"Phoenix"} ,
      {"name":"Seattle"} ,
      {"name":"San Francisco"} ,
      {"name":"Detroit"} ,
      {"name":"San Diego"} ,
      {"name":"Minneapolis"} ,
      {"name":"Tampa"} ,
      {"name":"Denver"} ,
      {"name":"Brooklyn"} ,
      {"name":"Queens"} ,
      {"name":"Baltimore"} ,
      {"name":"Riverside"} ,
      {"name":"St. Louis"} ,
      {"name":"Las Vegas"} ,
      {"name":"Portland"} ,
      {"name":"San Antonio"} ,
      {"name":"Sacramento"} ,
      {"name":"San Jose"} ,
      {"name":"Orlando"} ,
      {"name":"Cleveland"} ,
      {"name":"Pittsburgh"} ,
      {"name":"Cincinnati"} ,
      {"name":"Manhattan"} ,
      {"name":"Austin"} ,
      {"name":"Kansas City"} ,
      {"name":"Indianapolis"} ,
      {"name":"Columbus"} ,
      {"name":"Virginia Beach"} ,
      {"name":"Charlotte"} ,
      {"name":"Bronx"} ,
      {"name":"Milwaukee"} ,
      {"name":"Providence"} ,
      {"name":"Jacksonville"} ,
      {"name":"Salt Lake City"} ,
      {"name":"Nashville"} ,
      {"name":"Memphis"} ,
      {"name":"Richmond"} ,
      {"name":"New Orleans"} ,
      {"name":"Raleigh"} ,
      {"name":"Louisville"} ,
      {"name":"Oklahoma City"} ,
      {"name":"Bridgeport"} ,
      {"name":"Buffalo"} ,
      {"name":"Hartford"} ,
      {"name":"Fort Worth"} ,
      {"name":"Tucson"} ,
      {"name":"El Paso"} ,
      {"name":"Honolulu"} ,
      {"name":"Omaha"} ,
      {"name":"McAllen"} ,
      {"name":"Albuquerque"} ,
      {"name":"Birmingham"} ,
      {"name":"Dayton"} ,
      {"name":"Rochester"} ,
      {"name":"Sarasota"} ,
      {"name":"Fresno"} ,
      {"name":"Allentown"} ,
      {"name":"Tulsa"} ,
      {"name":"Concord"} ,
      {"name":"Cape Coral"} ,
      {"name":"Springfield"} ,
      {"name":"Colorado Springs"} ,
      {"name":"Charleston"} ,
      {"name":"Grand Rapids"} ,
      {"name":"Mission Viejo"} ,
      {"name":"Albany"} ,
      {"name":"Knoxville"} ,
      {"name":"Baton Rouge"} ,
      {"name":"Bakersfield"} ,
      {"name":"Ogden"} ,
      {"name":"New Haven"} ,
      {"name":"Columbia"} ,
      {"name":"Akron"} ,
      {"name":"Provo"} ,
      {"name":"Worcester"} ,
      {"name":"Mesa"} ,
      {"name":"Toledo"} ,
      {"name":"Murrieta"} ,
      {"name":"Wichita"} ,
      {"name":"Staten Island"} ,
      {"name":"Long Beach"} ,
      {"name":"Greenville"} ,
      {"name":"Little Rock"} ,
      {"name":"Harrisburg"} ,
      {"name":"Denton"} ,
      {"name":"Madison"} ,
      {"name":"Reno"}
      ]
  const rand = Math.floor(Math.random()*97);
  //console.log(rand);
  var id = cities[rand]["name"]
  //console.log(id)
  useEffect(() => {
    apiFetch(`/city/${id}`, {})
      .then(data => {
        setCity(data.city);
      })
      .catch(() => {
        setIsError(true);
      });
  }, [id]);

  // const [image, setImage] = useState("");
  // useEffect(() => {
  //   fetch(`https://api.teleport.org/api/urban_areas/slug:${rand['id']}/images/`)
  //     .then(resp => resp.json())
  //     .then(data => {
  //       try {
  //         setImage(data.photos[0].image.web);
  //       } catch (error) {
  //         console.error("No image available");
  //       }
  //     });
  // }, []);
  // console.log({image});
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
                <p>{name}</p>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  };
  console.log("HERE")
  return <></>;
};


export default Home;
