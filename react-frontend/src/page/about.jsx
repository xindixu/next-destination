import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import apiFetch from '../lib/api-fetch'
const People = props => {
  const [people, setPeople] = useState([])
  useEffect(() => {
    apiFetch('/us', {})
      .then(resp => resp.json())
      .then(data => {
        setPeople(data.us)
        console.log(data)
      })
  }, [])

  return (
    <ul>
      {people.length && people.map(
        ({ name, photo, description}) =>
          <li key={name}>{name}: {description} <a href={`/us/`}>Read more</a></li>
      )}
    </ul>
  )
}

People.propTypes = {

}

export default People