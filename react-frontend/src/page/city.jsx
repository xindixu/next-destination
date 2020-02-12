import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useParams } from "react-router-dom";
import apiFetch from '../lib/api-fetch'

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
        <h1>{name}</h1>
        <p>{description}</p>
      </>
    )
  }

  return <> </>
}

City.propTypes = {

}

export default City
