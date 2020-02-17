import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import apiFetch from "../lib/api-fetch";
import "./artist.css";

const Artist = () => {
  const { id } = useParams();

  const [artist, setArtist] = useState(null);
  useEffect(() => {
    apiFetch(`/artist/${id}`, {})
      .then(resp => resp.json())
      .then(data => {
        setArtist(data.artist);
      });
  }, []);

  if (artist) {
    const { name, pic, description, numEvents, nextEventLoc, fbURL } = artist
    return (
      <>
        <div className="artist1">
						  <h1> {name} </h1>
              <p> {description} </p>
              <img src={`${pic}`} alt="Pic of Artist" />
						  
						  
							  <div>
								  <p> Number of Upcoming Events: {numEvents} </p>
								  <p> Next Event Location: {nextEventLoc}</p>
								  <p><a href={`${fbURL}`} target="_blank" >Facebook Page </a></p>
							  </div>
							  
					  </div>
        
      </>
    );
  } else {
    return (
      <>
        <h1> Test</h1>
      </>
    );
  }
  return <> </>;
};

Artist.propTypes = {};

export default Artist;
