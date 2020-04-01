import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { Container } from "react-bootstrap";
import { EVENT_SORTABLE_SCHEMA } from "../lib/constants";
import SortableTable from "../components/sortable-table";
import Toast from "../components/toast";
import TableActions from "./table-actions";
import useDataStore from "../hooks/use-data-store";

const Events = ({ city, coordinates, tableSchema }) => {
  const [isError, setIsError] = useState(false);
  const [sortOn, setSortOn] = useState({
    sort: "time_start",
    order: "asc"
  });

  const [
    { recordsCount, fetching, pageRecords, currentPage },
    { fetchPage, sort }
  ] = useDataStore(() => {
    if (city) {
      return {
        url: `/events/${city}`,
        params: {
          page: 1,
          sort: sortOn
        },
        name: "events"
      };
    }
    const { longitude, latitude } = coordinates;
    return {
      url: `/events`,
      params: {
        page: 1,
        sort: sortOn,
        longitude,
        latitude
      },
      name: "events"
    };
  });

  useEffect(() => {
    fetchPage(1).catch(() => setIsError(true));
    // only fetch once when mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateSortOn = useCallback(
    newSortOn => {
      setSortOn(newSortOn);
      sort(newSortOn);
    },
    [sort]
  );

  if (fetching) {
    return <>Loading...</>;
  }
  if (isError) {
    return <Toast />;
  }
  return (
    <Container fluid>
      <TableActions
        totalRecords={recordsCount}
        loadPage={fetchPage}
        currentPage={currentPage}
        sortSchema={EVENT_SORTABLE_SCHEMA}
        sortOn={sortOn}
        updateSortOn={updateSortOn}
      />
      <SortableTable settings={tableSchema} data={pageRecords} />
    </Container>
  );
};
Events.defaultProps = {
  city: "",
  coordinates: {}
};
Events.propTypes = {
  city: PropTypes.string,
  coordinates: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired
  }),
  tableSchema: PropTypes.shape({
    title: PropTypes.string.isRequired,
    getBodyFormat: PropTypes.func.isRequired,
    isKey: PropTypes.bool.isRequired,
    dataSort: PropTypes.bool.isRequired,
    sortFunc: PropTypes.func,
    width: PropTypes.number
  }).isRequired
};

export default Events;
