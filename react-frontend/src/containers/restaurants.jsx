import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { RESTAURANT_SORTABLE_SCHEMA } from "../lib/constants";
import SortableTable from "../components/sortable-table";
import TableActions from "./table-actions";
import useDataStore from "../hooks/use-data-store";
import apiFetch from "../lib/api-fetch";

const Restaurants = ({ city, coordinates, tableSchema }) => {
  const [isError, setIsError] = useState(false);
  const [sortOn, setSortOn] = useState("best_match");
  const [filterOn, setFilterOn] = useState({});
  const [category, setCategory] = useState([]);

  const [
    { recordsCount, fetching, pageRecords, currentPage },
    { fetchPage, sort, filter }
  ] = useDataStore(() => {
    if (city) {
      return {
        url: `/restaurants/${city}`,
        params: {
          page: 1,
          sort: sortOn
        },
        name: "businesses"
      };
    }
    const { longitude, latitude } = coordinates;
    return {
      url: `/restaurants`,
      params: {
        page: 1,
        sort: sortOn,
        longitude,
        latitude
      },
      name: "businesses"
    };
  });

  useEffect(() => {
    fetchPage(1).catch(() => setIsError(true));
    // only fetch once when mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    apiFetch("/categories", {}).then(({ response }) => {
      setCategory(response.categories);
    });
  }, []);

  const updateSortOn = useCallback(
    newSortOn => {
      setSortOn(newSortOn);
      sort(newSortOn);
    },
    [sort]
  );

  const updateFilterOn = useCallback(
    newFilterOn => {
      setFilterOn(newFilterOn);
      filter(newFilterOn);
    },
    [filter]
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
        sortSchema={RESTAURANT_SORTABLE_SCHEMA}
        filterSchema={{ category }}
        sortOn={sortOn}
        filterOn={filterOn}
        updateSortOn={updateSortOn}
        updateFilterOn={updateFilterOn}
      />
      <SortableTable settings={tableSchema} data={pageRecords} />
    </>
  );
};

Restaurants.defaultProps = {
  city: "",
  coordinates: {}
};
Restaurants.propTypes = {
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

export default Restaurants;
