import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PropTypes from 'prop-types'
import { Media } from "reactstrap";
import './cities.css';

import apiFetch from '../lib/api-fetch'
const Cities = props => {
  const [cities, setCities] = useState([])
  useEffect(() => {
    apiFetch('/cities', {})
      .then(resp => resp.json())
      .then(data => {
        setCities(data.cities)
        console.log(data)
      })
  }, [])

  return (
   <div className="cities-list">
     {cities.length && cities.map(
        ({ name, state, description, id }) =>
     <Media className="mt-1">
        <Media left middle href="#">
          <Media object data-src="https://res.cloudinary.com/culturemap-com/image/upload/ar_4:3,c_fill,g_faces:center,w_1200/v1548256026/photos/288314_original.jpg" alt="austin.png" />
        </Media>
        <Media body>
          <Media className="city-listing" heading>
            {name}, {state}
          </Media>
            {description}
        </Media>
      </Media>
     )}
   </div>
  )
}

Cities.propTypes = {

}

export default Cities
