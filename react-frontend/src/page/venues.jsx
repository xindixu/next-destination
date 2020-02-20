import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import apiFetch from '../lib/api-fetch'
import './cities.css'
import { Table } from "reactstrap";

const Venues = props => {
  const [venues, setVenues] = useState([])
  const [cities, setCities] = useState([]);
  useEffect(() => {
    apiFetch('/venues', {})
      .then(resp => resp.json())
      .then(data => {
        setVenues(data.venues)
        console.log(data)
      })
  }, [])

  useEffect(() => {
    apiFetch("/cities", {})
      .then(resp => resp.json())
      .then(data => {
        setCities(data.cities);
        console.log(data);
      });
  }, []);

  const filterCities = (venueCity, cities) => {
    const city = cities.filter(cities => cities.name === venueCity)
    console.log(city)
    return city
  }

  return (
    <div className="cities-list">
      {venues.length &&
        venues.map(({ name, pic, city, capacity, coordinates, restaurant, id }) => (
          <Table dark>
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>City</th>
                <th>Capacity</th>
                <th>Coordinates</th>
                <th>Restaurants Close By</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" ><img src={`${pic}`} alt="pic of venue" /></th>
                <td><a href={`/venue/${id}`}>{name}</a></td>
                {filterCities(city, cities).map(cities => (
                  <td>
                    <a href={`/city/${cities.id}`}>{cities.name}</a>
                  </td>
                ))}
                <td>{capacity}</td>
                <td>{coordinates}</td>
                <td>{restaurant}</td>
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