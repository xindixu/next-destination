import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { EVENT_SCHEMA, EVENT_SORTABLE_SCHEMA } from "../lib/constants";
import SortableTable from "../components/sortable-table";
import TableActions from "./table-actions";
import useDataStore from "../hooks/use-data-store";

const Events = ({ city, coordinates }) => {
  const [isError, setIsError] = useState(false);
  const [sortOn, setSortOn] = useState("time_start");

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
    return <></>;
  }
  if (isError) {
    // TODO: error component
    return <>Error</>;
  }
  return (
    <>
      <TableActions
        totalRecords={recordsCount}
        loadPage={fetchPage}
        currentPage={currentPage}
        schema={EVENT_SORTABLE_SCHEMA}
        sortOn={sortOn}
        updateSortOn={updateSortOn}
      />
      <SortableTable settings={EVENT_SCHEMA} data={pageRecords} />
    </>
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
  })
};

export default Events;
