import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import apiFetch from "../lib/api-fetch";
import "./cities.css";
import { Table } from "reactstrap";

import "./artists.css";
import SortableTable from '../components/sortable-table'


const Artists = props => {
  const [artists, setArtists] = useState([]);
  const [cities, setCities] = useState([]);
  useEffect(() => {
    apiFetch("/artists", {})
      .then(resp => resp.json())
      .then(data =>
        setArtists(data.artists));
    console.log(artists)

  }, []);

  useEffect(() => {
    apiFetch("/cities", {})
      .then(resp => resp.json())
      .then(data => {
        setCities(data.cities);
        console.log(data);
      });
  }, []);

  const filterCities = (eventCity) => cities.filter(cities => cities.name === eventCity)

  const eventCitiesComponent = ({ nextEventCity }) => {
    const cities = filterCities(nextEventCity)

    return (<span>{
      cities.map(city => (
        <a href={`/city/${city.id}`}>{city.name}, {city.state}</a>
      ))}
    </span>)
  }

  

  const settings = {
    name: {
      title: "Name",
      getBodyFormat: (_, { id, name }) => <a href={`/artist/${id}`}>{name}</a>,
      isKey: true,
      dataSort: true
    },

    pic: {
      title: "Picture",
      getBodyFormat: (_, { pic, name }) => <img src={pic} alt={`Picture for artist ${name}`} />,
      isKey: false,
      dataSort: false
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
        console.log(valueA, valueB, a, b)
        return order === 'desc' ? valueA - valueB : valueB - valueA
      }
    },
    nextEventLoc: {
      title: "Upcoming Event Location",
      getBodyFormat: (_, object) => eventCitiesComponent(object),
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
