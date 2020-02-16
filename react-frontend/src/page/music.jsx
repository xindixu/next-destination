import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import apiFetch from '../lib/api-fetch'
const Music = props => {
  const [music, setMusic] = useState([])
  useEffect(() => {
    apiFetch('/music', {})
      .then(resp => resp.json())
      .then(data => {
        setMusic(data.music)
        console.log(data)
      })
  }, [])

  return (
    <div>
      {music.length && music.map(
        ({ artist }) =>
          <p key={artist}>
            artist: {artist['name']}<br></br>
            URL: {artist['url']}<br></br>
            image_url: {artist['image_url']}<br></br>
            upcoming event count: {artist['upcoming_event_count']}<br></br>
          </p>
      )}
    </div>

  )
}
Music.propTypes = {

}

export default Music