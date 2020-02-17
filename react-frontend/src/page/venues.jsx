import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import apiFetch from '../lib/api-fetch'
import './cities.css'
import { Table } from "reactstrap";

const Venues = props => {
  const [venues, setVenues] = useState([])
  useEffect(() => {
    apiFetch('/venues', {})
      .then(resp => resp.json())
      .then(data => {
        setVenues(data.venues)
        console.log(data)
      })
  }, [])

  return (
    <div className="cities-list">
    {venues.length &&
      venues.map(({ name, pic, city, capacity, coordinates, id}) => (
        <Table dark>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>City</th>
            <th>Capacity</th>
            <th>Coordinates</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row" ><img src={`${pic}`} alt="pic of venue" /></th>
            <td><a href={`/venue/${id}`}>{name}</a></td>
            <td>{city}</td>
            <td>{capacity}</td>
            <td>{coordinates}</td>
          </tr>
        </tbody>
      </Table>
      ))}
  </div>
  )
}
Venues.propTypes = {

}

export default Venues