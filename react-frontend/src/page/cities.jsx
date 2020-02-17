import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Table } from "reactstrap";
import "./cities.css";

import apiFetch from "../lib/api-fetch";
const Cities = props => {
  const [cities, setCities] = useState([]);
  useEffect(() => {
    apiFetch("/cities", {})
      .then(resp => resp.json())
      .then(data => {
        setCities(data.cities);
        console.log(data);
      });
  }, []);

  return (
    <div className="cities-list">
      {cities.length &&
        cities.map(
          ({ name, state, description, id, imageUrl, population_size }) => (
            <Table dark>
              <thead>
                <tr>
                  <th></th>
                  <th>City</th>
                  <th>State</th>
                  <th>Description</th>
                  <th>Population</th>
                  <th>Venues</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">IMAGEURL</th>
                  <td>
                    <a href={`/city/${id}`}>{name}</a>
                  </td>
                  <td>{state}</td>
                  <td>{description}</td>
                  <td>{population_size}</td>
                  <td>list some music venues</td>
                </tr>
              </tbody>
            </Table>
          )
        )}
    </div>
  );
};

Cities.propTypes = {};

export default Cities;
