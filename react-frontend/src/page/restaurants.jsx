import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import apiFetch from "../lib/api-fetch";
import "./cities.css";
import SortableTable from "../components/sortable-table";
import { filterCities, filterArtists } from "../lib/util";

const Restaurants = props => {
  const [restaurants, setRestaurants] = useState([]);
  const [cities, setCities] = useState([]);
  const [artists, setArtists] = useState([]);
  useEffect(() => {
    apiFetch("/restaurants", {}).then(data => setRestaurants(data.restaurants));
  }, []);

  useEffect(() => {
    apiFetch("/cities", {}).then(data => {
      setCities(data.cities);
    });
  }, []);

  const restaurantCitiesComponent = ({ city }) => {
    const venueCities = filterCities(city, cities);

    return (
      <span>
        {venueCities.map(({ id, name, state }) => (
          <Link to={`/city/${id}`}>
            {name}, {state}
          </Link>
        ))}
      </span>
    );
  };

  const settings = {
    // pic: {
    //   title: "Picture",
    //   getBodyFormat: (_, { pic, name }) => (
    //     <img src={pic} alt={`Venue ${name}`} />
    //   ),
    //   isKey: false,
    //   dataSort: false
    // },
    name: {
      title: "Name",
      getBodyFormat: (_, { id, name }) => (
        <Link to={`/restaurant/${id}`}>{name}</Link>
      ),
      isKey: true,
      dataSort: true
    },
    city: {
      title: "City",
      getBodyFormat: (_, object) => restaurantCitiesComponent(object),
      isKey: false,
      dataSort: true
    },
    category: {
      title: "Category",
      getBodyFormat: (_, { category }) => category,
      isKey: false,
      dataSort: true
    },
    Price: {
      title: "Price",
      getBodyFormat: (_, { price }) => price,
      isKey: false,
      dataSort: true
    }
  };

  if (restaurants.length) {
    return (
      <>
        <h1>Restaurants</h1>
        <SortableTable data={restaurants} settings={settings} />
      </>
    );
  }

  return <></>;
};
Restaurants.propTypes = {};

export default Restaurants;
