import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import apiFetch from "../lib/api-fetch";
import "./artists.css";

const Artists = props => {
  const [artists, setArtists] = useState([]);
  useEffect(() => {
    apiFetch("/artists", {})
      .then(resp => resp.json())
      .then(data => {
        setArtists(data.artists);
        console.log(data);
      });
  }, []);

  return (
    <>
      <h1> Artists </h1>

      <table>
        <tr>
          <td> Name </td> <td> Description </td>{" "}
          <td> Number of Upcoming Events </td>
          <td> Upcoming Event Location</td> <td> Facecbook PAge Link </td>
        </tr>

        {artists.length &&
          artists.map(
            ({ name, description, numEvents, nextEventLoc, fbUrl, id }) => (
              <tr>
                <td>
                  {" "}
                  <a href={`/artist/${id}`}> {name}</a>{" "}
                </td>{" "}
                <td className="artistDescr">{description} </td>
                <td> {numEvents} </td> <td> {nextEventLoc} </td>
                <td>
                  {" "}
                  <a href="{fbUrl}"> Facebook Page </a>{" "}
                </td>
              </tr>
            )
          )}
      </table>
    </>
  );
};

Artists.propTypes = {};

export default Artists;
