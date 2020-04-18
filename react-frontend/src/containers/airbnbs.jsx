import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { Container } from "react-bootstrap";
import { AIRBNB_SCHEMA, AIRBNB_SORTABLE_SCHEMA } from "../lib/constants";
import SortableTable from "../components/sortable-table";
import Toast from "../components/toast";
import TableActions from "./table-actions";
import useDataStore from "../hooks/use-data-store";

const Airbnbs = ({ city, coordinates, setShowAirbnbs, setActiveTab }) => {
  const [isError, setIsError] = useState(false);
  const [sortOn, setSortOn] = useState({
    sort: "price",
    order: "asc"
  });

  const [
    { recordsCount, fetching, pageRecords, currentPage },
    { fetchPage, sort }
  ] = useDataStore(() => {
    const { sort, order } = sortOn;
    if (city) {
      return {
        url: `/airbnbs/${city}`,
        params: {
          page: 1,
          sort,
          order
        },
        name: "airbnbs"
      };
    }
    // TODO: after we implement get airbnb by coordinates, update this route
    return {
      url: `/airbnbs/Austin`,
      params: {
        page: 1,
        sort,
        order
      },
      name: "airbnbs"
    };
  });

  useEffect(() => {
    fetchPage(1).catch(() => {
      setIsError(true);
      setShowAirbnbs(false);
      setActiveTab();
    });
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
  coordinates: {},
  setShowAirbnbs: () => {}
};
Airbnbs.propTypes = {
  city: PropTypes.string,
  coordinates: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired
  }),
  setShowAirbnbs: PropTypes.func
};

export default Airbnbs;
