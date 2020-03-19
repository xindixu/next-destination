import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import SortableTable from "../components/sortable-table";

const Restaurants = ({ data }) => {
  const settings = {
    image: {
      title: "",
      getBodyFormat: (_, { image_url: img, name }) => (
        <img src={img} alt={name} />
      ),
      isKey: false,
      dataSort: false
    },
    name: {
      title: "Restaurants",
      getBodyFormat: (_, { alias, name }) => (
        <Link to={`/restaurant/${alias}`}>{name}</Link>
      ),
      isKey: true,
      dataSort: true
    },
    distance: {
      title: "Distance",
      getBodyFormat: (_, { distance }) => <span>{distance}</span>,
      isKey: false,
      dataSort: true
    },
    location: {
      title: "Address",
      getBodyFormat: (_, { location: { display_address: address } }) => (
        <span>{address.join(", ")}</span>
      ),
      isKey: false,
      dataSort: false
    },
    price: {
      title: "Price",
      getBodyFormat: (_, { price }) => <span>{price}</span>,
      isKey: false,
      dataSort: true
    },
    rating: {
      title: "Rating",
      getBodyFormat: (_, { rating }) => <span>{rating}</span>,
      isKey: false,
      dataSort: true
    },
    url: {
      title: "URL",
      getBodyFormat: (_, { url }) => (
        <a href={url} target="_blank" rel="noopener noreferrer">
          Yelp
        </a>
      ),
      isKey: false,
      dataSort: false
    }
  };
  return <SortableTable settings={settings} data={data} />;
};

Restaurants.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      distance: PropTypes.number.isRequired,
      location: PropTypes.shape({
        display_address: PropTypes.arrayOf(PropTypes.string).isRequired
      }).isRequired,
      price: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      url: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

export default Restaurants;
