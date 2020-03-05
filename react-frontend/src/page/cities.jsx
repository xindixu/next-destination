import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./cities.css";
import { Link } from "react-router-dom";
import SortableTable from "../components/sortable-table";
import apiFetch from "../lib/api-fetch";
import { filterArtists, filterVenuesByCities } from "../lib/util";

const Cities = props => {
  const [cities, setCities] = useState([]);
  const [venues, setVenues] = useState([]);
  const [artists, setArtists] = useState([]);
  useEffect(() => {
    apiFetch("/cities", {})
      .then(resp => resp.json())
      .then(data => {
        setCities(data.cities);
      });
  }, []);

  const settings = {
    image: {
      title: "Picture",
      getBodyFormat: (_, { image, name }) => (
        <img src={image} alt={`city of ${name}`} />
      ),
      isKey: false,
      dataSort: false
    },
    name: {
      title: "City",
      getBodyFormat: (_, { id, name }) => (
        <Link to={`/city/${id}`}>{name}</Link>
      ),
      isKey: true,
      dataSort: true
    },
    state: {
      title: "State",
      getBodyFormat: (_, { state }) => <span>{state}</span>,
      isKey: false,
      dataSort: true
    },
    description: {
      title: "Description",
      getBodyFormat: (_, { description }) => <span>{description}</span>,
      isKey: false,
      dataSort: false
    },
    airbnb: {
      title: "Avg Airbnb Price",
      getBodyFormat: (_, { airbnb }) => <span>{airbnb}</span>,
      isKey: false,
      dataSort: true,
      sortFunc: (a, b, order) => {
        const valueA = parseInt(a.airbnb);
        const valueB = parseInt(b.airbnb);
        return order === "desc" ? valueA - valueB : valueB - valueA;
      }
    }
  };

  if (cities.length) {
    return (
      <>
        <h1>Cities</h1>
        <SortableTable data={cities} settings={settings} />
      </>
    );
  }
  return <></>;
};

Cities.propTypes = {};

export default Cities;
