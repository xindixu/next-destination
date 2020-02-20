import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import apiFetch from "../lib/api-fetch";
import "./cities.css";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";

import "./artists.css";
import SortableTable from '../components/sortable-table'


const Artists = props => {
  const [artists, setArtists] = useState([]);
  const [cities, setCities] = useState([]);
  const [venues, setVenues] = useState([]);
  useEffect(() => {
    apiFetch("/artists", {})
      .then(resp => resp.json())
      .then(data =>
        setArtists(data.artists));
  }, []);

  useEffect(() => {
    apiFetch("/cities", {})
      .then(resp => resp.json())
      .then(data => {
        setCities(data.cities);
      });
  }, []);

  useEffect(() => {
    apiFetch('/venues', {})
      .then(resp => resp.json())
      .then(data => {
        setVenues(data.venues)
      })
  }, [])

  const filterCities = (eventCity) => cities.filter(cities => cities.name === eventCity)

  const filterVenues = (artistVenue) => {
    const venue = venues.filter(venue => venue.name === artistVenue)
    return venue
  }

  const eventCitiesComponent = ({ nextEventCity }) => {
    const cities = filterCities(nextEventCity)
    return (<span>{
      cities.map(city => (
        <Link to={`/city/${city.id}`}>{city.name}, {city.state}</Link>
      ))}
    </span>)
  }

  const eventVenuesComponent = ({ venue }) => {
    const venues = filterVenues(venue)
    return (<span>{
      venues.map(venue => (
        <Link to={`/venue/${venue.id}`}>{venue.name}</Link>
      ))}
    </span>)
  }

  const settings = {
    pic: {
      title: "Picture",
      getBodyFormat: (_, { pic, name }) => <img src={pic} alt={`Picture for artist ${name}`} />,
      isKey: false,
      dataSort: false
    },
    name: {
      title: "Name",
      getBodyFormat: (_, { id, name }) => <Link to={`/artist/${id}`}>{name}</Link>,
      isKey: true,
      dataSort: true
    },
    description: {
      title: "Description",
      getBodyFormat: (_, { description }) => <span>{description}</span>,
      isKey: false,
      dataSort: false,
    },
    numEvents: {
      title: "Number of Upcoming Events",
      getBodyFormat: (_, { numEvents }) => <span>{numEvents}</span>,
      isKey: false,
      dataSort: true,
      sortFunc: (a, b, order) => {
        const valueA = parseInt(a.numEvents)
        const valueB = parseInt(b.numEvents)
        return order === 'desc' ? valueA - valueB : valueB - valueA
      }
    },
    nextEventLoc: {
      title: "Upcoming Event Location",
      getBodyFormat: (_, object) => eventCitiesComponent(object),
      isKey: false,
      dataSort: true,
    },
    nextEventVenue: {
      title: "Upcoming Event Venue",
      getBodyFormat: (_, object) => eventVenuesComponent(object),
      isKey: false,
      dataSort: true,
    },
    fbURL: {
      title: "Facebook Page Link",
      getBodyFormat: (_, { fbURL }) => (<a href={fbURL} target="_blank">
        Facebook Page</a>),
      isKey: false,
      dataSort: false
    }
  }

  if (artists.length && cities.length) {
    return (
      <>
        <h1>Artists</h1>
        <SortableTable
          data={artists}
          settings={settings}
        />
      </>
    );
  }
  return <></>
};

Artists.propTypes = {};

export default Artists;
