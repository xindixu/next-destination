import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useParams } from "react-router-dom";
import apiFetch from '../lib/api-fetch'
import './city.css'

const City = () => {
  const { id } = useParams();

  const [city, setCity] = useState(null)
  useEffect(() => {
    apiFetch(`/city/${id}`, {})
      .then(resp => resp.json())
      .then(data => {
        setCity(data.city)
      })
  }, [])

  if (city) {
    const { name, description } = city
    return (
      <>
        <div className="city1">
						  <h1> {name} </h1>
              <p> {description} </p>
						  <img id="randCity1" src="" alt="pic of city" />
						  
						  
							  <div>
								  <p> Average Airbnb Price: </p>
								  <p> Main Attractions: </p>
								  <p> #BBQ, #Music, #Nightlife </p>
								  <p> Similar Cities </p>
								  <p> City A, City B City C </p>
							  </div>
							  
					  </div>
        
      </>
    )
  }

  return <> </>
}

City.propTypes = {

}

export default City
