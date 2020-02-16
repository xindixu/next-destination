import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import apiFetch from '../lib/api-fetch'
const Businesses = props => {
  const [business, setBusiness] = useState([])
  useEffect(() => {
    apiFetch('/business', {})
      .then(resp => resp.json())
      .then(data => {
        setBusiness(data.us)
        console.log(data)
      })
  }, [])

  return (
    <div>
      {business.length && business.map(
        ({ name, category, description, address }) =>
          <p key={name}>
            name: {name}<br></br>
            address: {address}<br></br>
            category: {category}<br></br>
            description: {description}<br></br>
          </p>
      )}
    </div>

  )
}
Businesses.propTypes = {

}

export default Businesses