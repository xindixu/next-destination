import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import apiFetch from "../lib/api-fetch";
import "./city.css";

const City = () => {
  const { id } = useParams();

  const [city, setCity] = useState(null);
  const [venues, setVenues] = useState([])
  useEffect(() => {
    apiFetch(`/city/${id}`, {})
      .then(resp => resp.json())
      .then(data => {
        setCity(data.city);
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

  const filterVenues = (cityName, venues) => {
    console.log(city)
    const venue = venues.filter(venue => venue.city === cityName)
    return venue
  }

  if (city) {
    const { name, description, image, airbnb } = city;
    return (
      <div className="city1">
        <h1> {name} </h1>
        <p> {description} </p>
        <img id="randCity1" src={`${image}`} alt="pic of city" />
        <div>
          <p> Average Airbnb Price: {airbnb}</p>
        
          {filterVenues(name, venues).map(venues => (
            <p> Venues: <a href={`/venue/${venues.id}`}>{venues.name}</a> </p>
          ))}
        </div>
      </div>
    );
  }

  return <> </>;
};

City.propTypes = {};

export default City;
