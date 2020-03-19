import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import apiFetch from "../lib/api-fetch";
import "./cities.css";
import SortableTable from "../components/sortable-table";
import { filterCities, filterArtists } from "../lib/util";

const Events = props => {
  const [events, setEvents] = useState([]);
  const [cities, setCities] = useState([]);
  // const [artists, setArtists] = useState([]);
  useEffect(() => {
    apiFetch("/events", {})
      .then(resp => resp.json())
      .then(data => setEvents(data.events));
  }, []);

  useEffect(() => {
    apiFetch("/cities", {})
      .then(resp => resp.json())
      .then(data => {
        setCities(data.cities);
      });
  }, []);

  // useEffect(() => {
  //   apiFetch("/artists", {})
  //     .then(resp => resp.json())
  //     .then(data => {
  //       setArtists(data.artists);
  //     });
  // }, []);

  const eventCitiesComponent = ({ city }) => {
    const venueCities = filterCities(city, cities);

    return (
      <span>
        {venueCities.map(({ id, name, state }) => (
          <Link to={`/city/${id}`}>
            {name}, {state}
          </Link>
        ))}
      </span>
    );
  };

  const settings = {
    // pic: {
    //   title: "Picture",
    //   getBodyFormat: (_, { pic, name }) => (
    //     <img src={pic} alt={`Venue ${name}`} />
    //   ),
    //   isKey: false,
    //   dataSort: false
    // },
    name: {
      title: "Name",
      getBodyFormat: (_, { id, name }) => (
        <Link to={`/event/${id}`}>{name}</Link>
      ),
      isKey: true,
      dataSort: true
    },
    city: {
      title: "City",
      getBodyFormat: (_, object) => restaurantCitiesComponent(object),
      isKey: false,
      dataSort: true
    },
    category: {
      title: "Category",
      getBodyFormat: (_, { category }) => category,
      isKey: false,
      dataSort: true
    },
    Price: {
      title: "Price",
      getBodyFormat: (_, { price }) => price,
      isKey: false,
      dataSort: true
    },
  };

  if (events.length){//} && cities.length) {
    return (
      <>
        <h1>Events</h1>
        <SortableTable data={events} settings={settings} />
      </>
    );
  }

  return <></>;
};
Events.propTypes = {};

export default Events;
