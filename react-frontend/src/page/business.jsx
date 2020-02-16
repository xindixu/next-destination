import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import apiFetch from '../lib/api-fetch'
const Businesses = props => {
  const [business, setBusiness] = useState([])
  useEffect(() => {
    apiFetch('/business', {})
      .then(resp => resp.json())
      .then(data => {
        setBusiness(data.business)
        console.log(data)
      })
  }, [])

  return (
    <div>
      {business.length && business.map(
        ({ name, category, description, address, coordinates, price, hours }) =>
          <p key={name}>
            name: {name}<br></br>
            category: {category}<br></br>
            address: {address}<br></br>
            description: {description}<br></br>
            coordinates: {coordinates['x']}, {coordinates['y']}<br></br>
            price: {price}<br></br>
            hours: NEED TO FIND A WAY TO ITERATE THROUGH THE LIST 
          </p>
      )}
    </div>
  )
}
Businesses.propTypes = {

}

export default Businesses