import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import "./home.css";
import apiFetch from "../lib/api-fetch";


const Home = () => {
  var cities = [
      {"name":"New York City","id":"new-york"},
      {"name":"Los Angeles","id":"los-angeles"},
      {"name":"Chicago","id":"chicago"},
      {"name":"Miami","id":"miami"},
      {"name":"Dallas","id":"dallas"},
      {"name":"Philadelphia","id":"philadelphia"},
      {"name":"Houston","id":"houston"},
      {"name":"Washington","id":"washington"},
      {"name":"Atlanta","id":"atlanta"},
      {"name":"Boston","id":"boston"},
      {"name":"Phoenix","id":"phoenix"},
      {"name":"Seattle","id":"seattle"},
      {"name":"San Francisco","id":"san-francisco"},
      {"name":"Detroit","id":"detroit"},
      {"name":"San Diego","id":"san-diego"},
      {"name":"Minneapolis","id":"minneapolis-saint-paul"},
      {"name":"Tampa","id":"tampa"},
      {"name":"Denver","id":"denver"},
      {"name":"Brooklyn","id":"brooklyn"},
      {"name":"Queens","id":"queens"},
      {"name":"Baltimore","id":"baltimore"},
      {"name":"Riverside","id":"riverside"},
      {"name":"St. Louis","id":"st.-louis"},
      {"name":"Las Vegas","id":"las-vegas"},
      {"name":"Portland","id":"portland"},
      {"name":"San Antonio","id":"san-antonio"},
      {"name":"Sacramento","id":"sacramento"},
      {"name":"San Jose","id":"san-jose"},
      {"name":"Orlando","id":"orlando"},
      {"name":"Cleveland","id":"cleveland"},
      {"name":"Pittsburgh","id":"pittsburgh"},
      {"name":"Cincinnati","id":"cincinnati"},
      {"name":"Manhattan","id":"manhattan"},
      {"name":"Austin","id":"austin"},
      {"name":"Kansas City","id":"kansas-city"},
      {"name":"Indianapolis","id":"indianapolis"},
      {"name":"Columbus","id":"columbus"},
      {"name":"Virginia Beach","id":"virginia-beach"},
      {"name":"Charlotte","id":"charlotte"},
      {"name":"Bronx","id":"bronx"},
      {"name":"Milwaukee","id":"milwaukee"},
      {"name":"Providence","id":"providence"},
      {"name":"Jacksonville","id":"jacksonville"},
      {"name":"Salt Lake City","id":"salt-lake-city"},
      {"name":"Nashville","id":"nashville"},
      {"name":"Memphis","id":"memphis"},
      {"name":"Richmond","id":"richmond"},
      {"name":"New Orleans","id":"new-orleans"},
      {"name":"Raleigh","id":"raleigh"},
      {"name":"Louisville","id":"louisville"},
      {"name":"Oklahoma City","id":"oklahoma-city"},
      {"name":"Bridgeport","id":"bridgeport"},
      {"name":"Buffalo","id":"buffalo"},
      {"name":"Hartford","id":"hartford"},
      {"name":"Fort Worth","id":"fort-worth"},
      {"name":"Tucson","id":"tucson"},
      {"name":"El Paso","id":"el-paso"},
      {"name":"Honolulu","id":"honolulu"},
      {"name":"Omaha","id":"omaha"},
      {"name":"McAllen","id":"mcallen"},
      {"name":"Albuquerque","id":"albuquerque"},
      {"name":"Birmingham","id":"birmingham"},
      {"name":"Dayton","id":"dayton"},
      {"name":"Rochester","id":"rochester"},
      {"name":"Sarasota","id":"sarasota"},
      {"name":"Fresno","id":"fresno"},
      {"name":"Allentown","id":"allentown"},
      {"name":"Tulsa","id":"tulsa"},
      {"name":"Concord","id":"concord"},
      {"name":"Cape Coral","id":"cape-coral"},
      {"name":"Springfield","id":"springfield"},
      {"name":"Colorado Springs","id":"colorado-springs"},
      {"name":"Charleston","id":"charleston"},
      {"name":"Grand Rapids","id":"grand-rapids"},
      {"name":"Mission Viejo","id":"mission-viejo"},
      {"name":"Albany","id":"albany"},
      {"name":"Knoxville","id":"knoxville"},
      {"name":"Baton Rouge","id":"baton-rouge"},
      {"name":"Bakersfield","id":"bakersfield"},
      {"name":"Ogden","id":"ogden"},
      {"name":"New Haven","id":"new-haven"},
      {"name":"Columbia","id":"columbia"},
      {"name":"Akron","id":"akron"},
      {"name":"Provo","id":"provo"},
      {"name":"Worcester","id":"worcester"},
      {"name":"Mesa","id":"mesa"},
      {"name":"Toledo","id":"toledo"},
      {"name":"Murrieta","id":"murrieta"},
      {"name":"Wichita","id":"wichita"},
      {"name":"Staten Island","id":"staten-island"},
      {"name":"Long Beach","id":"long-beach"},
      {"name":"Greenville","id":"greenville"},
      {"name":"Little Rock","id":"little-rock"},
      {"name":"Harrisburg","id":"harrisburg"},
      {"name":"Denton","id":"denton"},
      {"name":"Madison","id":"madison"},
      {"name":"Reno","id":"reno"}
    ]
  const rand = Math.floor(Math.random()*97);
  const id = cities[rand]["name"].toLowerCase();
  const t_id = cities[rand]['id'];
  const [city, setCity] = useState(null);
  const [image, setImage] = useState("");
  const [isError, setIsError] = useState(false);
  
  useEffect(() => {
    console.log(`/city/${id}`)
    apiFetch(`/city/${id}`, {})
      .then(data => {
        console.log("JOUR")
        setCity(data.city);
      })
      .catch(() => {
        setIsError(true);
      });
  }, [id]);
  
  useEffect(() => {
    fetch(`https://api.teleport.org/api/urban_areas/slug:${t_id}/images/`)
      .then(resp => resp.json())
      .then(data => {
        try {
          setImage(data.photos[0].image.web);
        } catch (error) {
          console.error("No image available");
        }
      });
  }, []);

  console.log(city);
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
