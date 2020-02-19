import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import apiFetch from "../lib/api-fetch";
import "./cities.css";
import { Table } from "reactstrap";

const Artists = props => {
  const [artists, setArtists] = useState([]);
  const [cities, setCities] = useState([]);
  useEffect(() => {
    apiFetch("/artists", {})
      .then(resp => resp.json())
      .then(data => {
        setArtists(data.artists);
        console.log(data);
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

  return (
      <div className="cities-list">
     
        {console.log(artists)}

        {artists.length &&
          artists.map(
            ({
              name,
              pic,
              description,
              numEvents,
              nextEventCity,
              state,
              fbURL,
              id
            }) => (
              <Table dark>
              <thead>
              <tr>
                <th> Name </th> 
                <th> Picture </th>
                <th> Description </th>{" "}
                <th> Number of Upcoming Events </th>
                <th> Upcoming Event Location</th> 
                <th> Facecbook Page Link </th>
              </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <a href={`/artist/${id}`}> {name}</a>
                  </td>
                  <td>
                    <img src={`${pic}`} alt="Pic of Artist" />
                  </td>
                  <td className="artistDescr">{description} </td>
                  <td> {numEvents} </td>
                  {filterCities(nextEventCity, cities).map(cities => (
                    <td>
                      <a href={`/city/${cities.id}`}>{cities.name}, {state}</a>
                    </td>
                  ))}
                  <td>
                    <a href={`${fbURL}`} target="_blank"> {name} FB </a>
                  </td>
                </tr>
                </tbody>
            </Table>
        )
          )}
      
    </div>
  );
};

Artists.propTypes = {};

export default Artists;
