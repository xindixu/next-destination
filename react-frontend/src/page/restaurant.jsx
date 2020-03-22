import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import apiFetch from "../lib/api-fetch";
import Restaurants from "../containers/restaurants";
import Events from "../containers/events";
import Airbnbs from "../containers/airbnbs";
import { RESTAURANT_SCHEMA, EVENT_SCHEMA } from "../lib/constants";

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
      <p>
        {categories.map(({ title }) => (
          <span key={title}>#{title} </span>
        ))}
      </p>
      <p>
        ({latitude}, {longitude}){" "}
      </p>
      <p>{address}</p>
      <p>{price}</p>

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
