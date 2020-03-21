import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Table from "react-bootstrap/Table"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import apiFetch from "../lib/api-fetch";
import Restaurants from "../containers/restaurants";
import Events from "../containers/events";
import Airbnbs from "../containers/airbnbs";
import "./city.css";

const TABS = {
  restaurants: {
    key: "restaurants",
    title: "Restaurants"
  },
  Airbnbs: {
    key: "Airbnbs",
    title: "Airbnbs"
  },
  events: {
    key: "events",
    title: "Events"
  }
};

const City = () => {
  const { name } = useParams();

  const [city, setCity] = useState(null);
  const [images, setImages] = useState([]);
  const [isError, setIsError] = useState(false);

  // TODO: data should be passed down from parent
  useEffect(() => {
    apiFetch(`/city/${name}`, {})
      .then(data => {
        setCity(data.city);
      })
      .catch(() => {
        setIsError(true);
      });
  }, [name]);

  useEffect(() => {
    fetch(`https://api.teleport.org/api/urban_areas/slug:${name.toLowerCase()}/images/`)
      .then(resp => resp.json())
      .then(data => {
        setImages(data['photos'][0]['image']['web'])
        console.log(data['photos'][0]['image']['web'])
        });
  }, []);

  if (city) {
    const { state, latitude, longitude, population, description, image } = city;
    return (
      <>
        <div className="city1">
          <div className="city-image-container">
            <img id="img_city" src={`${images}`} alt='pic of city'/>
          </div>
          <h1> {name}, {state} </h1>

          {/* TODO: extract this component */}
         <div className="des-sec-container">
            <h2>Description</h2>
            <p> {description} </p>
          </div>
        </div>

        <div className="stat-container">
            <h2>Statistics</h2>
            <div className='stat-table'>
                <Table>
                    <tr>
                        <th>Population</th>
                        <th>Longitude</th>
                        <th>Latitude</th>
                    </tr>
                    <tr>
                        <td>{population}</td>
                        <td>{longitude}</td>
                        <td>{latitude}</td>
                    </tr>
                </Table>
            </div>

        </div>

        <Tabs defaultActiveKey={TABS.restaurants.key}>
          <Tab eventKey={TABS.restaurants.key} title={TABS.restaurants.title}>
            <Restaurants city={name} />
          </Tab>

          <Tab eventKey={TABS.events.key} title={TABS.events.title}>
            <Events city={name} />
          </Tab>

          <Tab eventKey={TABS.Airbnbs.key} title={TABS.Airbnbs.title}>
            <Airbnbs city={name} />
          </Tab>
        </Tabs>
      </>
    );
  }

  return <> </>;
};

City.propTypes = {};

export default City;
