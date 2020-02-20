import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Table } from "reactstrap";
import "./cities.css";
import SortableTable from '../components/sortable-table'
import apiFetch from "../lib/api-fetch";
import { Link } from "react-router-dom";


const Cities = props => {
  const [cities, setCities] = useState([]);
  const [venues, setVenues] = useState([]);
  const [artists, setArtists] = useState([]);
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
      })
  }, [])

  useEffect(() => {
    apiFetch("/artists", {})
      .then(resp => resp.json())
      .then(data =>
        setArtists(data.artists));
  }, []);

  const filterVenues = (city) => {
    const venue = venues.filter(venue => venue.city === city)
    return venue
  }

  const filterArtists = (cityArtist) => {
    const artist = artists.filter(artist => artist.name === cityArtist)
    return artist
  }

  const venueComponent = ({ name }) => {
    const venues = filterVenues(name)
    return (<span>{
      venues.map(venue => (
        <Link to={`/venue/${venue.id}`}>{venue.name}</Link>
      ))}
    </span>)
  }

  const cityArtistsComponent = ({ artist }) => {
    const artists = filterArtists(artist)

    return (<span>{
      artists.map(artist => (
        <Link to={`/artist/${artist.id}`}>{artist.name}</Link>
      ))}
    </span>)
  }

  const settings = {
    image: {
      title: "Picture",
      getBodyFormat: (_, { image, name }) => <img src={image} alt={`Picture for city ${name}`} />,
      isKey: false,
      dataSort: false
    },
    name: {
      title: "City",
      getBodyFormat: (_, { id, name }) => <Link to={`/city/${id}`}>{name}</Link>,
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
      dataSort: false,
    },
    venue: {
      title: "Music venues",
      getBodyFormat: (_, object) => venueComponent(object),
      isKey: false,
      dataSort: false,
    },
    artist: {
      title: "Upcoming Artists",
      getBodyFormat: (_, object) => cityArtistsComponent(object),
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
    return (
      <>
        <h1>Cities</h1>
        <SortableTable
          data={cities}
          settings={settings} />
      </>
    )
  }
  return <></>
};

Cities.propTypes = {};

export default Cities;
