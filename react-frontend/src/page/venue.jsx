import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useParams } from "react-router-dom";
import apiFetch from '../lib/api-fetch'
import './artist.css'

const Venue = () => {
  const { id } = useParams();

  const [venue, setVenue] = useState(null)
  useEffect(() => {
    apiFetch(`/venue/${id}`, {})
      .then(resp => resp.json())
      .then(data => {
        setVenue(data.venue)
      })
  }, [])

  if (venue) {
    const { name, coordinates, city, capacity, pic  } = venue
    return (
      <>
        <div className="artist1">
						  <h1> {name} </h1>
              <img src={`${pic}`} alt="Pic of Venue" />
						  
						  
							  <div>
								  <p> city: {city} </p>
								  <p> capacity: {capacity}</p>
                  <p> coordinates: {coordinates} </p>
							  </div>
							  
					  </div>
        
      </>
    )
  }
    
  return <> </>
}

Venue.propTypes = {

}

export default Venue
