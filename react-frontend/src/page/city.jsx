import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

import apiFetch from "../lib/api-fetch";
import Restaurants from "../containers/restaurants";
import Events from "../containers/events";
import TableActions from "../containers/table-actions";
import "./city.css";

const TABS = {
  restaurants: {
    key: "restaurants",
    title: "Restaurants"
  },
  airbnb: {
    key: "airbnb",
    title: "AirBnb"
  },
  events: {
    key: "events",
    title: "Events"
  }
};

const City = () => {
  const { name } = useParams();

  const [city, setCity] = useState(null);
  const [isError, setIsError] = useState(false);

  // TODO: data should be passed down from parent
  useEffect(() => {
    apiFetch(`/city/${name}`, {})
      .then(resp => resp.json())
      .then(data => {
        setCity(data.city);
      })
      .catch(() => {
        setIsError(true);
      });
  }, [name]);

  if (city) {
    const { name, state, latitude, longitude, population,  description } = city;
    return (
      <>
        <div className="city1">
          <h1> {name} </h1>
          <p> {description} </p>
          {/* TODO: extract this component */}
          <img id="randCity1" alt="pic of city" />
          <div>
            <p> state: {state} </p>
            <p> latitude: {latitude} </p>
            <p> longitude: {longitude} </p>
            <p> population: {population}</p>
          </div>
        </div>

        <Tabs defaultActiveKey={TABS.restaurants.key}>
          <Tab eventKey={TABS.restaurants.key} title={TABS.restaurants.title}>
            <Restaurants city={name} />
          </Tab>

          <Tab eventKey={TABS.events.key} title={TABS.events.title}>
            <Events city={name} />
          </Tab>
        </Tabs>
      </>
    );
  }

  return <> </>;
};

City.propTypes = {};

export default City;
