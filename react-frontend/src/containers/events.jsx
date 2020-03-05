import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import SortableTable from "../components/sortable-table";

const Events = ({ data }) => {
  const settings = {
    name: {
      title: "Events",
      getBodyFormat: (_, { alias, name }) => (
        <Link to={`/event/${alias}`}>{name}</Link>
      ),
      isKey: true,
      dataSort: true
    },
    // distance: {
    //   title: "Distance",
    //   getBodyFormat: (_, { distance }) => <span>{distance}</span>,
    //   isKey: false,
    //   dataSort: true
    // },
    location: {
      title: "Address",
      getBodyFormat: (_, { location: { display_address } }) => (
        <span>{display_address}</span>
      ),
      isKey: false,
      dataSort: false
    },
    interested_count: {
      title: "Interested Count",
      getBodyFormat: (_, { interested_count }) => (
        <span>{interested_count}</span>
      ),
      isKey: false,
      dataSort: true
    },
    is_free: {
      title: "Free",
      getBodyFormat: (_, { is_free }) => <span>{is_free ? "Yes" : "No"}</span>,
      isKey: false,
      dataSort: true
    },
    description: {
      title: "Description",
      getBodyFormat: (_, { description }) => <span>{description}</span>,
      isKey: false,
      dataSort: false
    },
    category: {
      title: "Category",
      getBodyFormat: (_, { category }) => <span>{category}</span>,
      isKey: false,
      dataSort: true
    },
    time: {
      title: "Rating",
      getBodyFormat: (_, { time_start: start, time_end: end }) => (
        <span>{new Date(start).toLocaleDateString()}</span>
      ),
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

Events.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      distance: PropTypes.number.isRequired,
      location: PropTypes.shape({
        address1: PropTypes.string.isRequired,
        address2: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired
      }).isRequired,
      price: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      url: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

export default Events;
