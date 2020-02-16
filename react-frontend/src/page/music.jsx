import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import apiFetch from '../lib/api-fetch'
const Music = props => {
  const [music, setMusic] = useState([])
  useEffect(() => {
    apiFetch('/us', {})
      .then(resp => resp.json())
      .then(data => {
        setMusic(data.us)
        console.log(data)
      })
  }, [])

  return (
    <div>
      {music.length && music.map(
        ({ artist, name, description}) =>
          <p key={name}>{name}: {description}</p>
      )}
    </div>

   )
}
Music.propTypes = {

}

export default Music