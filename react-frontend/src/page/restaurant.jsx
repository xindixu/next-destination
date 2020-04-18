import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Badge, Card } from "react-bootstrap";
import apiFetch from "../lib/api-fetch";
import Restaurants from "../containers/restaurants";
import Events from "../containers/events";
import Airbnbs from "../containers/airbnbs";
import Tabs from "../components/tabs";
import { RESTAURANT_SCHEMA, EVENT_SCHEMA, TABS } from "../lib/constants";
import {
  getGoogleMapLinkByCoordinates,
  getWeekDay,
  getHours,
  getCityIdByName
} from "../lib/util";

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
  const [showAirbnbs, setShowAirbnbs] = useState(true);

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

  const eventProps = {
    eventKey: TABS.events.key,
    title: TABS.events.title,
    content: (
      <Events
        coordinates={{ longitude, latitude }}
        tableSchema={EVENT_SCHEMA}
      />
    )
  };
  const restaurantProps = {
    eventKey: TABS.restaurants.key,
    title: TABS.restaurants.title,
    content: (
      <Restaurants
        initialFilters={{ category: categories }}
        coordinates={{ longitude, latitude }}
        tableSchema={RESTAURANT_SCHEMA}
      />
    )
  };
  const airbnbProps = {
    eventKey: TABS.airbnbs.key,
    title: TABS.airbnbs.title,
    content: (
      <Airbnbs
        coordinates={{ longitude, latitude }}
        setShowAirbnbs={setShowAirbnbs}
      />
    )
  };
  const tabs = [restaurantProps, eventProps];
  if (showAirbnbs) {
    tabs.push(airbnbProps);
  }

  return (
    <>
      <div className="header-image-container">
        <img src={image} alt={name} />
      </div>
      <h1>{name}</h1>
      <div className="text-center">
        {categories.map(({ title }) => (
          <Badge pill variant="info" key={title}>
            #{title}
          </Badge>
        ))}
      </div>

      <div className="description">
        <h2>Location & Hours</h2>
        <p>
          <a
            href={getGoogleMapLinkByCoordinates(latitude, longitude)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {address.join(", ")}
          </a>
        </p>

        {getOpenHours(hours)}

        <h2>Information</h2>

        <p>Price {price}</p>
        <a href={url} target="_blank" rel="noopener noreferrer">
          Restaurant Website
        </a>

        <p>
          Learn more about{" "}
          <Link to={`/city/${getCityIdByName(city)}`}>{city}</Link>
        </p>
      </div>

      <Tabs tabs={tabs} />
    </>
  );
};

export default Restaurant;
