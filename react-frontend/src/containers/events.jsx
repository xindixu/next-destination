import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import SortableTable from "../components/sortable-table";

const Events = ({ data }) => {
  const settings = {
    name: {
      title: "Events",
      getBodyFormat: (_, { id, name }) => (
        <Link to={`/event/${id}`}>{name}</Link>
      ),
      isKey: true,
      dataSort: true
    },
    location: {
      title: "Address",
      getBodyFormat: (_, { location: { display_address: address } }) => (
        <span>{address}</span>
      ),
      isKey: false,
      dataSort: false
    },
    interested_count: {
      title: "Interested Count",
      getBodyFormat: (_, { interested_count: count }) => <span>{count}</span>,
      isKey: false,
      dataSort: true
    },
    is_free: {
      title: "Free",
      getBodyFormat: (_, { is_free: isFree }) => (
        <span>{isFree ? "Yes" : "No"}</span>
      ),
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
        <span>
          {new Date(start).toLocaleDateString()} -{" "}
          {new Date(end).toLocaleDateString()}
        </span>
      ),
      isKey: false,
      dataSort: true
    },
    url: {
      title: "URL",
      getBodyFormat: (_, { event_site_url: url }) => (
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
      category: PropTypes.string.isRequired,
      location: PropTypes.shape({
        display_address: PropTypes.arrayOf(PropTypes.string).isRequired
      }).isRequired,
      is_free: PropTypes.bool.isRequired,
      time_start: PropTypes.string.isRequired,
      time_end: PropTypes.string.isRequired,
      event_site_url: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

export default Events;
