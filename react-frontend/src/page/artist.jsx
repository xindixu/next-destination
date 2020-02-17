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
    const { name, description, numEvents, nextEventLoc, fbUrl } = artist;
    return (
      <>
        <div className="artist1">
          <h1> {name} </h1>
          <p> {description} </p>
          <img
            id=""
            src="data:image/jpeg;base64,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"
            alt="pic of city"
          />

          <div>
            <p> Number of Upcoming Events: {numEvents} </p>
            <p> Next Event Location: {nextEventLoc}</p>
            <p>
              <a href="{fbUrl}">Facebook Page </a>
            </p>
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
