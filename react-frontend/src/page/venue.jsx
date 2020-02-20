import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useParams, Link } from "react-router-dom";
import apiFetch from '../lib/api-fetch'
import './city.css'

const Venue = () => {
  const { id } = useParams();

  const [venue, setVenue] = useState(null)
  const [cities, setCities] = useState([]);
  const [artists, setArtists] = useState([]);
  useEffect(() => {
    apiFetch(`/venue/${id}`, {})
      .then(resp => resp.json())
      .then(data => {
        setVenue(data.venue)
      })
  }, [])

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

  const filterCities = (venueCity, cities) => {
    const city = cities.filter(cities => cities.name === venueCity)
    console.log(city)
    return city
  }

  const filterArtists = (venueArtist, artists) => {
    const artist = artists.filter(artists => artists.name === venueArtist)
    return artist
  }

  if (venue) {
    const { name, coordinates, city, capacity, artist, pic } = venue
    return (
      <>
        <div className="city1">
          <h1> {name} </h1>
          <img src={`${pic}`} alt="Pic of Venue" />


          <div>
            {filterCities(city, cities).map(cities => (
              <p> City: <Link to={`/city/${cities.id}`}>{cities.name}</Link> </p>

            ))}
            {filterArtists(artist, artists).map(artists => (
              <p> Upcoming Artists: <Link to={`/artist/${artists.id}`}>{artists.name}</Link> </p>

            ))}
            <p> capacity: {capacity}</p>
            <p> coordinates: {coordinates} </p>
          </div>

        </div>

      </>
    )
  }

  return <> </>
}

Venue.propTypes = {

}

export default Venue
