import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

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

    return () => {
    };
  }, [])

  return (
    <ul>
      {cities.length && cities.map(
        ({ name, state, description }) => 
        <li key={name}>{name}-{state}: {description}</li>
      )}
    </ul>

  )
}

Cities.propTypes = {

}

export default Cities
