import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Tabs, Tab, Badge, Card } from "react-bootstrap";
import apiFetch from "../lib/api-fetch";
import Restaurants from "../containers/restaurants";
import Events from "../containers/events";
import Airbnbs from "../containers/airbnbs";
import { RESTAURANT_SCHEMA, EVENT_SCHEMA } from "../lib/constants";
import {
  getGoogleMapLinkByCoordinates,
  getWeekDay,
  getHours
} from "../lib/util";

const TABS = {
  restaurants: {
    key: "restaurants",
    title: "Similar Restaurants Nearby"
  },
  airbnbs: {
    key: "airbnbs",
    title: "Nearby Airbnbs"
  },
  events: {
    key: "events",
    title: "Nearby Events"
  }
};

const getOpenHours = hours => (
  <div>
    {hours[0].open.map(({ day, start, end }) => (
      <p key={day}>
        {getWeekDay(day)}: {getHours(start)} - {getHours(end)}
      </p>
    ))}
  </div>
);

const Restaurant = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    apiFetch(`/restaurant/${id}`, {}).then(data => {
      setRestaurant(data.response);
    });
  }, [id]);

  if (!restaurant) {
    return <></>;
  }

  const {
    name,
    categories,
    url,
    hours,
    location: { display_address: address, city },
    image_url: image,
    coordinates: { latitude, longitude },
    price
  } = restaurant;

  return (
    <>
      <div className="header-image-container">
        <img src={image} alt={name} />
      </div>
      <h1>{name}</h1>
      <div className="text-center">
        {categories.map(({ title }) => (
          <Badge pill variant="info" key={title}>
            #{title}{" "}
          </Badge>
        ))}
      </div>

      <h2>Location & Hours</h2>
      <p>
        <a
          href={getGoogleMapLinkByCoordinates(latitude, longitude)}
          target="_blank"
          rel="noopener noreferrer"
        >
          Map
        </a>
      </p>
      <p>{address.join(", ")}</p>
      {getOpenHours(hours)}

      <p>Price {price}</p>
      <a href={url} target="_blank" rel="noopener noreferrer">
        Restaurant Website
      </a>

      <Tabs defaultActiveKey={TABS.restaurants.key}>
        <Tab eventKey={TABS.restaurants.key} title={TABS.restaurants.title}>
          <Restaurants
            initialFilters={{ category: categories }}
            coordinates={{ longitude, latitude }}
            tableSchema={RESTAURANT_SCHEMA}
          />
        </Tab>

        <Tab eventKey={TABS.events.key} title={TABS.events.title}>
          <Events
            coordinates={{ longitude, latitude }}
            tableSchema={EVENT_SCHEMA}
          />
        </Tab>
        <Tab eventKey={TABS.airbnbs.key} title={TABS.airbnbs.title}>
          <Airbnbs city={city} />
        </Tab>
      </Tabs>
    </>
  );
};

export default Restaurant;
