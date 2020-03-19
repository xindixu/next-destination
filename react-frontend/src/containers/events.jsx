import React from "react";
import PropTypes from "prop-types";

import { RESTAURANT_SCHEMA } from "../lib/constants";
import SortableTable from "../components/sortable-table";

const Events = ({ data }) => (
  <SortableTable settings={RESTAURANT_SCHEMA} data={data} />
);

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
