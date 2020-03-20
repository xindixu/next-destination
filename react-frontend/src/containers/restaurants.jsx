import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import {RESTAURANT_SCHEMA, RESTAURANT_SORTABLE_SCHEMA} from "../lib/constants";
import SortableTable from "../components/sortable-table";
import TableActions from "./table-actions";
import useDataStore from "../hooks/use-data-store";

const Restaurants = ({ city }) => {
  const [isError, setIsError] = useState(false);
  const [sortOn, setSortOn] = useState("best_match");

  const [
    { recordsCount, fetching, pageRecords, currentPage },
    { fetchPage, sort }
  ] = useDataStore(() => ({
    url: `/restaurants/${city}`,
    params: {
      page: 1,
      sort: sortOn
    },
    name: "businesses"
  }));

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
        schema={RESTAURANT_SORTABLE_SCHEMA}
        sortOn={sortOn}
        updateSortOn={updateSortOn}
      />
      <SortableTable settings={RESTAURANT_SCHEMA} data={pageRecords} />
    </>
  );
};
Restaurants.propTypes = {
  city: PropTypes.string.isRequired
};

export default Restaurants;
