import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { Container } from "react-bootstrap";
import { AIRBNB_SCHEMA, AIRBNB_SORTABLE_SCHEMA } from "../lib/constants";
import SortableTable from "../components/sortable-table";
import Toast from "../components/toast";
import TableActions from "./table-actions";
import useDataStore from "../hooks/use-data-store";

const Airbnbs = ({ city, coordinates }) => {
  const [isError, setIsError] = useState(false);
  const [sortOn, setSortOn] = useState("price");

  const [
    { recordsCount, fetching, pageRecords, currentPage },
    { fetchPage, sort }
  ] = useDataStore(() => {
    if (city) {
      return {
        url: `/airbnbs/${city}`,
        params: {
          page: 1,
          sort: sortOn
        },
        name: "airbnbs"
      };
    }
    const { longitude, latitude } = coordinates;
    return {
      url: `/airbnbs/${city}`,
      params: {
        page: 1,
        sort: sortOn,
        longitude,
        latitude
      },
      name: "airbnbs"
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
    return <Toast />;
  }
  return (
    <Container fluid>
      <TableActions
        totalRecords={recordsCount}
        loadPage={fetchPage}
        currentPage={currentPage}
        sortSchema={AIRBNB_SORTABLE_SCHEMA}
        sortOn={sortOn}
        updateSortOn={updateSortOn}
      />
      <SortableTable settings={AIRBNB_SCHEMA} data={pageRecords} />
    </Container>
  );
};
Airbnbs.defaultProps = {
  city: "",
  coordinates: {}
};
Airbnbs.propTypes = {
  city: PropTypes.string,
  coordinates: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired
  })
};

export default Airbnbs;
