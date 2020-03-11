import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

import apiFetch from "../lib/api-fetch";

import Restaurants from "../containers/restaurants";
import Events from "../containers/events";
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
  const [restaurants, setRestaurants] = useState([]);
  const [events, setEvents] = useState([]);
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [isError, setIsError] = useState(false);
  const [activeTab, setactiveTab] = useState(TABS.restaurants.key);

  // TODO: data should be passed down from parent
  useEffect(() => {
    apiFetch(`/city/${id}`, {})
      .then(resp => resp.json())
      .then(data => {
        setCity(data.city);
      });
  }, [id]);

  useEffect(() => {
    setIsFetchingData(true);
    apiFetch(`/restaurants/${id}`, {})
      .then(resp => resp.json())
      .then(data => {
        setRestaurants(data.response.businesses);
        setIsFetchingData(false);
      })
      .catch(() => {
        setIsFetchingData(false);
        isError(true);
      });
  }, [id]);

  useEffect(() => {
    setIsFetchingData(true);
    apiFetch(`/events/${id}`, {})
      .then(resp => resp.json())
      .then(data => {
        setEvents(data.response.events);
        setIsFetchingData(false);
      })
      .catch(() => {
        setIsFetchingData(false);
        isError(true);
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

        <Tabs defaultActiveKey={activeTab}>
          {isFetchingData ? (
            <></>
          ) : (
            <Tab eventKey={TABS.restaurants.key} title={TABS.restaurants.title}>
              <Restaurants data={restaurants} />
            </Tab>
          )}
          {isFetchingData ? (
            <></>
          ) : (
            <Tab eventKey={TABS.events.key} title={TABS.events.title}>
              <Events data={events} />
            </Tab>
          )}
        </Tabs>
      </>
    );
  }

  return <> </>;
};

City.propTypes = {};

export default City;
