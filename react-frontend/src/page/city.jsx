import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Table from "react-bootstrap/Table";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
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
  airbnbs: {
    key: "airbnbs",
    title: "Airbnbs"
  },
  events: {
    key: "events",
    title: "Events"
  }
};

const City = () => {
  const { id } = useParams();

  const [city, setCity] = useState(null);
  const [image, setImage] = useState("");
  const [isError, setIsError] = useState(false);

  // TODO: data should be passed down from parent
  useEffect(() => {
    apiFetch(`/city/${id}`, {})
      .then(data => {
        setCity(data.city);
      })
      .catch(() => {
        setIsError(true);
      });
  }, [id]);

  useEffect(() => {
    // TODO: fix getting image when slug has a space
    fetch(`https://api.teleport.org/api/urban_areas/slug:${id}/images/`)
      .then(resp => resp.json())
      .then(data => {
        try {
          setImage(data.photos[0].image.web);
        } catch (error) {
          console.error("No image available");
        }
      });
  }, []);

  if (city) {
    const { state, latitude, longitude, population, description, name } = city;
    return (
      <>
        <div className="city1">
          <div className="city-image-container">
            <img src={image} alt="pic of city" />
          </div>
          <h1>
            {name}, {state}{" "}
          </h1>

          {/* TODO: extract this component */}
          <div className="des-sec-container">
            <h2>Description</h2>
            <p> {description} </p>
          </div>
        </div>

        <div className="stat-container">
          <h2>Statistics</h2>
          <div className="stat-table">
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
            <Restaurants city={id} />
          </Tab>

          <Tab eventKey={TABS.events.key} title={TABS.events.title}>
            <Events city={id} />
          </Tab>

          <Tab eventKey={TABS.airbnbs.key} title={TABS.airbnbs.title}>
            <Airbnbs city={id} />
          </Tab>
        </Tabs>
      </>
    );
  }

  return <> </>;
};

City.propTypes = {};

export default City;
