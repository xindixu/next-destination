import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import apiFetch from '../lib/api-fetch'
import './cities.css'
import { Table } from "reactstrap";
import SortableTable from '../components/sortable-table'

const Venues = props => {
  const [venues, setVenues] = useState([])
  const [cities, setCities] = useState([]);
  useEffect(() => {
    apiFetch('/venues', {})
      .then(resp => resp.json())
      .then(data => {
        setVenues(data.venues)
        console.log(data.venues)
      })
  }, [])

  useEffect(() => {
    apiFetch("/cities", {})
      .then(resp => resp.json())
      .then(data => {
        setCities(data.cities);
      });
  }, []);

  const filterCities = (venueCity) => {
    const city = cities.filter(cities => cities.name === venueCity)
    console.log(city)
    return city
  }

  const venueCitiesComponent = ({ city }) => {
    const cities = filterCities(city)

    return (<span>{
      cities.map(city => (
        <a href={`/city/${city.id}`}>{city.name}, {city.state}</a>
      ))}
    </span>)
  }

  const settings = {
    pic: {
      title: "Picture",
      getBodyFormat: (_, { pic, name }) => <img src={pic} alt={`Picture for venue ${name}`} />,
      isKey: false,
      dataSort: false
    },
    name: {
      title: "Name",
      getBodyFormat: (_, { id, name }) => <a href={`/artist/${id}`}>{name}</a>,
      isKey: true,
      dataSort: true
    },
    city: {
      title: "City",
      getBodyFormat: (_, object) => venueCitiesComponent(object),
      isKey: false,
      dataSort: true,
    },
    coordinates: {
      title: "Coordinates",
      getBodyFormat: (_, {coordinates}) => coordinates,
      isKey: false,
      dataSort: true,
    },
    capacity: {
      title: "Capacity",
      getBodyFormat: (_, { capacity }) => <span>{capacity}</span>,
      isKey: false,
      dataSort: true,
    },
    restaurant: {
      title: "Restaurants Close By",
      getBodyFormat: (_, {  restaurant}) => restaurant,
      isKey: false,
      dataSort: false
    }
  }

  if (venues.length && cities.length) {
    return (
      <>
        <h1>Venues</h1>
        <SortableTable
          data={venues}
          settings={settings}
        />
      </>
    );
  }

  return <></>

    // <div className="cities-list">
    //   {venues.length &&
    //     venues.map(({ name, pic, city, capacity, coordinates, restaurant, id }) => (
    //       <Table dark>
    //         <thead>
    //           <tr>
    //             <th></th>
    //             <th>Name</th>
    //             <th>City</th>
    //             <th>Capacity</th>
    //             <th>Coordinates</th>
    //             <th>Restaurants Close By</th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           <tr>
    //             <th scope="row" ><img src={`${pic}`} alt="pic of venue" /></th>
    //             <td><a href={`/venue/${id}`}>{name}</a></td>
    //             {filterCities(city, cities).map(cities => (
    //               <td>
    //                 <a href={`/city/${cities.id}`}>{cities.name}</a>
    //               </td>
    //             ))}
    //             <td>{capacity}</td>
    //             <td>{coordinates}</td>
    //             <td>{restaurant}</td>
    //           </tr>
    //         </tbody>
    //       </Table>
    //     ))}
    // </div>
  
}
Venues.propTypes = {

}

export default Venues