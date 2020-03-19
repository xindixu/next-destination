import React from "react";
import PropTypes from "prop-types";
import { RESTAURANT_SCHEMA } from "../lib/constants";
import SortableTable from "../components/sortable-table";

const Restaurants = ({ data }) => (
  <SortableTable settings={RESTAURANT_SCHEMA} data={data} />
);

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
