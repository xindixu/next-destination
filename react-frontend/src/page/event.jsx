import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import apiFetch from "../lib/api-fetch";
import Events from "../containers/events";
import Restaurants from "../containers/restaurants";
import Airbnbs from "../containers/airbnbs";
import { EVENT_SCHEMA, RESTAURANT_SCHEMA, AIRBNB_SCHEMA } from "../lib/constants";

const TABS = {
  events: {
    key: "events",
    title: "Nearby Events"
  },
  restaurants: {
    key: "restaurants",
    title: "Nearby Restaurants"
  },
  airbnbs: {
    key: "airbnbs",
    title: "Nearby Airbnbs"
  }
}

const Event = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    apiFetch(`/event/${id}`, { useApi: true, json: true }).then(data => {
      setEvent(data.response);
    });
  }, [id]);

  if (!event) {
    return <></>;
  }

  const {
    name,
    category,
    categories,
    location: { display_address: address, city },
    image_url: image,
    latitude,
    longitude,
    cost,
    is_free: isFree,
    event_site_url: url,
    time_start: start,
    time_end: end,
    description
  } = event;

  return (
    <>
      <div className="header-image-container">
        <img src={image} alt={name} />
      </div>
      <h1>{name}</h1>
      <p>
        <span>#{category}</span>
      </p>
      <p>
        Event time: {new Date(start).toLocaleDateString()} -
        {new Date(end).toLocaleDateString()}
      </p>
      <p>
        ({latitude}, {longitude}){" "}
      </p>
      <p>
        <a href={url}>Event Website</a>
      </p>
      <p>{address}</p>
      <p>{cost}</p>
      <p>{description}</p>

      <Tabs defaultActiveKey={TABS.events.key}>
        <Tab eventKey={TABS.events.key} title={TABS.events.title}>
          <Events
            coordinates={{ longitude, latitude }}
            tableSchema={EVENT_SCHEMA}
          />
        </Tab>

        <Tab eventKey={TABS.restaurants.key} title={TABS.restaurants.title}>
          <Restaurants
            initialFilters={{ category: categories }}
            coordinates={{ longitude, latitude }}
            tableSchema={RESTAURANT_SCHEMA}
          />
        </Tab>
        <Tab eventKey={TABS.airbnbs.key} title={TABS.airbnbs.title}>
          <Airbnbs city={city} />
        </Tab>
      </Tabs>
    </>
  );
};

export default Event;
