<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Table } from "reactstrap";
import "./states.css";

import apiFetch from "../lib/api-fetch";
const States = props => {
  const [states, setStates] = useState([]);
  useEffect(() => {
    apiFetch("/states", {})
      .then(resp => resp.json())
      .then(data => {
        setStates(data.states);
        console.log(data);
      });
  }, []);

  return (
    <div className="states-list">
      {states.length &&
        states.map(({ name, state, description, id, imageUrl, population, nickname }) => (
          <Table dark>
          <thead>
            <tr>
              <th></th>
              <th>State</th>
              <th>Description</th>
              <th>Nickname</th>
              <th>Population</th>
              <th>Cities</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">IMAGEURL</th>
              <td><a href={`/state/${id}`}>{name}</a></td>
              <td>{description}</td>
              <td>{nickname}</td>
              <td>{population}</td>
              <td>list some cities</td>
            </tr>
          </tbody>
        </Table>
        ))}
    </div>
  );
};

States.propTypes = {};

export default States;
=======
import React from 'react'
import PropTypes from 'prop-types'

const States = props => {
  return (
    <>
      <h1>States</h1>
    </>
  )
}

States.propTypes = {

}

export default States
>>>>>>> added states data and routes to flask-backend. Created jsx files for states in react-frontend
