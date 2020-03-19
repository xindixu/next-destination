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
  const { id } = useParams();

  const [city, setCity] = useState(null);
  const [isError, setIsError] = useState(false);

  // TODO: data should be passed down from parent
  useEffect(() => {
    apiFetch(`/city/${id}`, {})
      .then(resp => resp.json())
      .then(data => {
        setCity(data.city);
      })
      .catch(() => {
        setIsError(true);
      });
  }, [id]);

  if (city) {
    const { name, description, image, airbnb } = city;
    return (
      <>
        <div className="city1">
          <h1> {name} </h1>
          <p> {description} </p>
          {/* TODO: extract this component */}
          <img id="randCity1" src={`${image}`} alt="pic of city" />
          <div>
            <p> Average Airbnb Price: {airbnb}</p>
          </div>
        </div>

        <Tabs defaultActiveKey={TABS.restaurants.key}>
          <Tab eventKey={TABS.restaurants.key} title={TABS.restaurants.title}>
            <Restaurants city={id} />
          </Tab>

          <Tab eventKey={TABS.events.key} title={TABS.events.title}>
            <Events city={id} />
          </Tab>
        </Tabs>
      </>
    );
  }

  return <> </>;
};

City.propTypes = {};

export default City;
