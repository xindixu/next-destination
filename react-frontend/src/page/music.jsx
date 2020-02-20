import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import apiFetch from "../lib/api-fetch";

const Music = props => {
  const [music, setMusic] = useState([]);
  useEffect(() => {
    apiFetch("/music", {})
      .then(resp => resp.json())
      .then(data => setMusic(data.music));
  }, []);

  return (
    <>
      {music.length &&
        music.map(({ artist }) => {
          const {
            name,
            url,
            image_url: imageUrl,
            upcoming_event_count: upcomingEventCount
          } = artist;
          return (
            <p key={artist}>
              artist: {name}
              <br />
              URL: {url}
              <br />
              image_url: {imageUrl}
              <br />
              upcoming event count: {upcomingEventCount}
              <br />
            </p>
          );
        })}
    </>
  );
};
Music.propTypes = {};

export default Music;
