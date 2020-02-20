import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import apiFetch from "../lib/api-fetch";
import "./artist.css";

const Artist = () => {
  const { id } = useParams();

  const [artist, setArtist] = useState(null);
  const [cities, setCities] = useState([]);
  useEffect(() => {
    apiFetch(`/artist/${id}`, {})
      .then(resp => resp.json())
      .then(data => {
        setArtist(data.artist);
      });
  }, []);

  useEffect(() => {
    apiFetch("/cities", {})
      .then(resp => resp.json())
      .then(data => {
        setCities(data.cities);
        console.log(data);
      });
  }, []);

  const filterCities = (eventCity, cities) => {
    const city = cities.filter(cities => cities.name === eventCity)
    console.log(city)
    return city
  }

  if (artist) {
    const { name, pic, description, numEvents, nextEventCity, state, fbURL } = artist
    return (
      <>
        <div className="artist1">
						  <h1> {name} </h1>
              <p> {description} </p>
              <img src={`${pic}`} alt="Pic of Artist" />
						  
						  
							  <div>
								  <p> Number of Upcoming Events: {numEvents} </p>
                  {filterCities(nextEventCity, cities).map(cities => (
                    <p> Next Event Location: <a href={`/city/${cities.id}`}>{cities.name}, {state}</a> </p>
                  
                  ))}
								  <p><a href={`${fbURL}`} target="_blank" > {name}'s FB </a></p>
							  </div>
							  
					  </div>
        
      </>
    );
  } 
  return <> </>;
};

Artist.propTypes = {};

export default Artist;
