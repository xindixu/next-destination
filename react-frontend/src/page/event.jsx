import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./event.css";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import apiFetch from "../lib/api-fetch";
import Events from "../containers/events";
import Restaurants from "../containers/restaurants";
import Airbnbs from "../containers/airbnbs";
import { getCityIdByName } from "../lib/util";
import { EVENT_SCHEMA, RESTAURANT_SCHEMA, TABS } from "../lib/constants";

const Event = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [showAirbnbs, setShowAirbnbs] = useState(true);

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
      <h1>{name}</h1>
      <p>{description}</p>

      <div className="event-info">
        <div className="event-image">
          <img src={image} alt={name} />
        </div>
        <div className="event-content">
          <p>
            <span className="hashtag">#{category}</span>
          </p>
          <p>
            Event time: {new Date(start).toLocaleDateString()} -
            {new Date(end).toLocaleDateString()}
          </p>
          <p>
            Geolocation: ({latitude}, {longitude}){" "}
          </p>
          <p>
            <a className="hyperlink" href={url}>
              Event Website
            </a>
          </p>
          <p>Event Address: {address}</p>
          <p>Cost of event: {isFree ? "Free" : cost || "n/a"}</p>
          <p>
            Learn more about{" "}
            <Link className="hyperlink" to={`/city/${getCityIdByName(city)}`}>
              {city}
            </Link>
          </p>
        </div>
      </div>

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
        {showAirbnbs && (
          <Tab eventKey={TABS.airbnbs.key} title={TABS.airbnbs.title}>
            <Airbnbs city={name} setShowAirbnbs={setShowAirbnbs} />
          </Tab>
        )}
      </Tabs>
    </>
  );
};

export default Event;
