import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import apiFetch from "../lib/api-fetch";
import "./city.css";

const City = () => {
  const { id } = useParams();

  const [city, setCity] = useState(null);
  const [venues, setVenues] = useState([]);
  const [artists, setArtists] = useState([]);
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

  useEffect(() => {
    apiFetch("/artists", {})
      .then(resp => resp.json())
      .then(data =>
        setArtists(data.artists));
  }, []);

  const filterVenues = (cityName, venues) => {
    console.log(city)
    const venue = venues.filter(venue => venue.city === cityName)
    return venue
  }

  const filterArtists = (cityArtist, artists) => {
    const artist = artists.filter(artists => artists.name === cityArtist)
    return artist
  }

  if (city) {
    const { name, description, image, artist, airbnb } = city;
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
          {filterArtists(artist, artists).map(artists => (
            <p> Upcoming Artists: <a href={`/artist/${artists.id}`}>{artists.name}</a> </p>
          ))}
        </div>
      </div>
    );
  }

  return <> </>;
};

City.propTypes = {};

export default City;
