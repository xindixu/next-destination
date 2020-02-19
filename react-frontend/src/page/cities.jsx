import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Table } from "reactstrap";
import "./cities.css";
import SortableTable from '../components/sortable-table'
import apiFetch from "../lib/api-fetch";


const Cities = props => {
  const [cities, setCities] = useState([]);
  useEffect(() => {
    apiFetch("/cities", {})
      .then(resp => resp.json())
      .then(data => {
        setCities(data.cities);
        console.log(data);
      });
  }, []);



  const settings = {
    name: {
      title: "City",
      getBodyFormat: (_, { id, name }) => <a href={`/city/${id}`}>{name}</a>,
      isKey: true,
      dataSort: true
    },
    state: {
      title: "State",
      getBodyFormat: (_, { state }) => <span>{state}</span>,
      isKey: false,
      dataSort: true
    },
    image: {
      title: "Picture",
      getBodyFormat: (_, { image, name }) => <img src={image} alt={`Picture for city ${name}`} />,
      isKey: false,
      dataSort: false
    },
    description: {
      title: "Description",
      getBodyFormat: (_, { description }) => <span>{description}</span>,
      isKey: false,
      dataSort: false,
    },
    venue: {
      title: "Music venues",
      getBodyFormat: (_, { venue }) => <span>List of music venues</span>,
      isKey: false,
      dataSort: false,
    }
  }

  if (cities.length) {
    return <SortableTable
      data={cities}
      settings={settings} />
  }
  return <></>

  // return (
  //   <div className="cities-list">
  //     {cities.length &&
  //       cities.map(
  //         ({ name, state, description, id, imageUrl, population_size }) => (
  //           <Table dark>
  //             <thead>
  //               <tr>
  //                 <th></th>
  //                 <th>City</th>
  //                 <th>State</th>
  //                 <th>Description</th>
  //                 <th>Population</th>
  //                 <th>Venues</th>
  //               </tr>
  //             </thead>
  //             <tbody>
  //               <tr>
  //                 <th scope="row">IMAGEURL</th>
  //                 <td>
  //                   <a href={`/city/${id}`}>{name}</a>
  //                 </td>
  //                 <td>{state}</td>
  //                 <td>{description}</td>
  //                 <td>{population_size}</td>
  //                 <td>list some music venues</td>
  //               </tr>
  //             </tbody>
  //           </Table>
  //         )
  //       )}
  //   </div>
  // );
};

Cities.propTypes = {};

export default Cities;
