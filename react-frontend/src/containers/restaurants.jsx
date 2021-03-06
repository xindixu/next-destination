import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { Container } from "react-bootstrap";
import { RESTAURANT_SORTABLE_SCHEMA, CATEGORIES } from "../lib/constants";
import SortableTable from "../components/sortable-table";
import Toast from "../components/toast";
import TableActions from "./table-actions";
import useDataStore from "../hooks/use-data-store";

const getCategory = filters => {
  const { category } = filters;
  let categoryAlias = "";
  if (category) {
    categoryAlias = category.map(item => item.alias).join(",");
  }
  return categoryAlias;
};

const initDataStore = (city, coordinates, initialFilters, initialSortOn) => {
  const categoryAlias = getCategory(initialFilters);
  const { sort, order } = initialSortOn;
  if (city) {
    return {
      url: `/restaurants/${city}`,
      params: {
        page: 1,
        sort,
        order,
        category: categoryAlias
      },
      name: "businesses"
    };
  }
  const { longitude, latitude } = coordinates;
  return {
    url: `/restaurants`,
    params: {
      page: 1,
      sort,
      order,
      longitude,
      latitude,
      categories: categoryAlias
    },
    name: "businesses"
  };
};

const Restaurants = ({ city, coordinates, initialFilters, tableSchema }) => {
  const [isError, setIsError] = useState(false);
  const [sortOn, setSortOn] = useState({
    sort: "best_match"
  });
  const [filterOn, setFilterOn] = useState(initialFilters);

  const [
    { recordsCount, fetching, pageRecords, currentPage },
    { fetchPage, sort, filter }
  ] = useDataStore(() => initDataStore(city, coordinates, filterOn, sortOn));

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

  const updateFilterOn = useCallback(
    newFilterOn => {
      setFilterOn(newFilterOn);
      filter({ categories: getCategory(newFilterOn) });
    },
    [filter]
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
        sortSchema={RESTAURANT_SORTABLE_SCHEMA}
        filterSchema={{ category: CATEGORIES }}
        sortOn={sortOn}
        filterOn={filterOn}
        updateSortOn={updateSortOn}
        updateFilterOn={updateFilterOn}
      />
      <SortableTable settings={tableSchema} data={pageRecords} />
    </Container>
  );
};

Restaurants.defaultProps = {
  city: "",
  coordinates: {},
  initialFilters: {}
};
Restaurants.propTypes = {
  city: PropTypes.string,
  coordinates: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired
  }),
  initialFilters: PropTypes.shape({
    categories: PropTypes.array
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
