import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import apiFetch from "../lib/api-fetch";
import "./cities.css";
import SortableTable from "../components/sortable-table";
import { filterCities, filterArtists } from "../lib/util";

const Venues = props => {
  const [venues, setVenues] = useState([]);
  const [cities, setCities] = useState([]);
  const [artists, setArtists] = useState([]);
  useEffect(() => {
    apiFetch("/venues", {})
      .then(resp => resp.json())
      .then(data => setVenues(data.venues));
  }, []);

  useEffect(() => {
    apiFetch("/cities", {})
      .then(resp => resp.json())
      .then(data => {
        setCities(data.cities);
      });
  }, []);

  useEffect(() => {
    apiFetch("/artists", {})
      .then(resp => resp.json())
      .then(data => {
        setArtists(data.artists);
      });
  }, []);

  const venueCitiesComponent = ({ city }) => {
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

  const venueArtistsComponent = ({ artist }) => {
    const venueArtists = filterArtists(artist, artists);

    return (
      <span>
        {venueArtists.map(({ id, name }) => (
          <Link to={`/artist/${id}`}>{name}</Link>
        ))}
      </span>
    );
  };

  const settings = {
    pic: {
      title: "Picture",
      getBodyFormat: (_, { pic, name }) => (
        <img src={pic} alt={`Venue ${name}`} />
      ),
      isKey: false,
      dataSort: false
    },
    name: {
      title: "Name",
      getBodyFormat: (_, { id, name }) => (
        <Link to={`/venue/${id}`}>{name}</Link>
      ),
      isKey: true,
      dataSort: true
    },
    city: {
      title: "City",
      getBodyFormat: (_, object) => venueCitiesComponent(object),
      isKey: false,
      dataSort: true
    },
    artist: {
      title: "Upcoming Artists",
      getBodyFormat: (_, object) => venueArtistsComponent(object),
      isKey: false,
      dataSort: true
    },
    capacity: {
      title: "Capacity",
      getBodyFormat: (_, { capacity }) => capacity,
      isKey: false,
      dataSort: true
    },
    coordinates: {
      title: "Coordinates",
      getBodyFormat: (_, { coordinates }) => coordinates,
      isKey: false,
      dataSort: true
    },
    restaurant: {
      title: "Restaurants Close By",
      getBodyFormat: (_, { restaurant }) => restaurant,
      isKey: false,
      dataSort: true
    }
  };

  if (venues.length && cities.length) {
    return (
      <>
        <h1>Venues</h1>
        <SortableTable data={venues} settings={settings} />
      </>
    );
  }

  return <></>;
};
Venues.propTypes = {};

export default Venues;
