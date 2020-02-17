import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import apiFetch from '../lib/api-fetch'
const Venue = props => {
  const [venue, setVenue] = useState([])
  useEffect(() => {
    apiFetch('/venue', {})
      .then(resp => resp.json())
      .then(data => {
        setVenue(data.venue)
        console.log(data)
      })
  }, [])

  return (
    <div>
      {venue.length && venue.map(
        ({ name, coordinates, city, region }) =>
          <p key={name}>
            name: {name}<br></br>
            city: {city}<br></br>
            coordinates: {coordinates['x'], coordinates['y']}<br></br>
            region: {region}
          </p>
      )}
    </div>

  )
}
Venue.propTypes = {

}

export default Venue