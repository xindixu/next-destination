import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Table } from "reactstrap";
import "./cities.css";
import SortableTable from '../components/sortable-table'
import apiFetch from "../lib/api-fetch";


const Cities = props => {
  const [cities, setCities] = useState([]);
  const [venues, setVenues] = useState([])
  useEffect(() => {
    apiFetch("/cities", {})
      .then(resp => resp.json())
      .then(data => {
        setCities(data.cities);
        console.log(data);
      });
  }, []);

  useEffect(() => {
    apiFetch('/venues', {})
      .then(resp => resp.json())
      .then(data => {
        setVenues(data.venues)
        console.log(data)
      })
  }, [])

  const filterVenues = (city) => {
    console.log(city)
    const venue = venues.filter(venue => venue.city === city)
    return venue
  }

  const venueComponent = ({name}) => {

    const venues = filterVenues(name)
    return (<span>{
      venues.map(venue => (
        <a href={`/venue/${venue.id}`}>{venue.name}</a>
      ))}
    </span>)
  }



  const settings = {
    name: {
      title: "City",
      getBodyFormat: (_, { id, name }) => <a href={`/city/${id}`}>{name}</a>,
      isKey: true,
      dataSort: true
    },
    state: {
      title: "State",
      getBodyFormat: (_, { state }) => <span>{state}</span>,
      isKey: false,
      dataSort: true
    },
    image: {
      title: "Picture",
      getBodyFormat: (_, { image, name }) => <img src={image} alt={`Picture for city ${name}`} />,
      isKey: false,
      dataSort: false
    },
    description: {
      title: "Description",
      getBodyFormat: (_, { description }) => <span>{description}</span>,
      isKey: false,
      dataSort: false,
    },
    venue: {
      title: "Music venues",
      getBodyFormat: (_,  object) => venueComponent(object),
      isKey: false,
      dataSort: false,
    },
    airbnb: {
      title: "Avg Airbnb Price",
      getBodyFormat: (_, { airbnb }) => <span>{airbnb}</span>,
      isKey: false,
      dataSort: true,
      sortFunc: (a, b, order) => {
        const valueA = parseInt(a.airbnb)
        const valueB = parseInt(b.airbnb)
        console.log(valueA, valueB, a, b)
        return order === 'desc' ? valueA - valueB : valueB - valueA
      }
    }
  }

  if (cities.length) {
    return <SortableTable
      data={cities}
      settings={settings} />
  }
  return <></>
};

Cities.propTypes = {};

export default Cities;
