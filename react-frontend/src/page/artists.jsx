import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { filterCities, filterVenues } from "../lib/util";
import apiFetch from "../lib/api-fetch";
import SortableTable from "../components/sortable-table";
import "./cities.css";
import "./artists.css";

const Artists = props => {
  const [artists, setArtists] = useState([]);
  const [cities, setCities] = useState([]);
  const [venues, setVenues] = useState([]);
  useEffect(() => {
    apiFetch("/artists", {})
      .then(resp => resp.json())
      .then(data => setArtists(data.artists));
  }, []);

  useEffect(() => {
    apiFetch("/cities", {})
      .then(resp => resp.json())
      .then(data => {
        setCities(data.cities);
      });
  }, []);

  useEffect(() => {
    apiFetch("/venues", {})
      .then(resp => resp.json())
      .then(data => {
        setVenues(data.venues);
      });
  }, []);

  const eventCitiesComponent = ({ nextEventCity }) => {
    const eventCities = filterCities(nextEventCity, cities);
    return (
      <span>
        {eventCities.map(({ id, name, state }) => (
          <Link to={`/city/${id}`}>
            {name}, {state}
          </Link>
        ))}
      </span>
    );
  };

  const eventVenuesComponent = ({ venue }) => {
    const eventVenues = filterVenues(venue, venues);
    return (
      <span>
        {eventVenues.map(({ id, name }) => (
          <Link to={`/venue/${id}`}>{name}</Link>
        ))}
      </span>
    );
  };

  const settings = {
    pic: {
      title: "Picture",
      getBodyFormat: (_, { pic, name }) => (
        <img src={pic} alt={`Artist ${name}`} />
      ),
      isKey: false,
      dataSort: false
    },
    name: {
      title: "Name",
      getBodyFormat: (_, { id, name }) => (
        <Link to={`/artist/${id}`}>{name}</Link>
      ),
      isKey: true,
      dataSort: true
    },
    description: {
      title: "Description",
      getBodyFormat: (_, { description }) => <span>{description}</span>,
      isKey: false,
      dataSort: false
    },
    numEvents: {
      title: "Number of Upcoming Events",
      getBodyFormat: (_, { numEvents }) => <span>{numEvents}</span>,
      isKey: false,
      dataSort: true,
      sortFunc: (a, b, order) => {
        const valueA = parseInt(a.numEvents);
        const valueB = parseInt(b.numEvents);
        return order === "desc" ? valueA - valueB : valueB - valueA;
      }
    },
    nextEventCity: {
      title: "Upcoming Event Location",
      getBodyFormat: (_, object) => eventCitiesComponent(object),
      isKey: false,
      dataSort: true
    },
    venue: {
      title: "Upcoming Event Venue",
      getBodyFormat: (_, object) => eventVenuesComponent(object),
      isKey: false,
      dataSort: true
    },
    fbURL: {
      title: "Facebook Page Link",
      getBodyFormat: (_, { fbURL }) => (
        <a href={fbURL} target="_blank" rel="noopener noreferrer">
          Facebook Page
        </a>
      ),
      isKey: false,
      dataSort: false
    }
  };

  if (artists.length && cities.length) {
    return (
      <>
        <h1>Artists</h1>
        <SortableTable data={artists} settings={settings} />
      </>
    );
  }
  return <></>;
};

Artists.propTypes = {};

export default Artists;
