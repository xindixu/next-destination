import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import apiFetch from '../lib/api-fetch'
const Events = props => {
  const [event, setEvent] = useState([])
  useEffect(() => {
    apiFetch('/event', {})
      .then(resp => resp.json())
      .then(data => {
        setEvent(data.event)
        console.log(data)
      })
  }, [])

  return (
    <div>
      {event.length && event.map(
        ({ name, category, description, address, coordinates, price, hours }) =>
          <p key={name}>
            name: {name}<br></br>
            category: {category} <br></br>
            address: {address}<br></br>
            coordinates: {coordinates['x'], coordinates['y']}<br></br>
            description: {description}<br></br>
            price: {price}<br></br>
            hours: STILL NEED TO FIGURE OUT HOW TO DO THIS
          </p>
      )}
    </div>

  )
}
Events.propTypes = {

}

export default Events