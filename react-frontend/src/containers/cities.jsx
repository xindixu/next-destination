import React, { useEffect, useState, useCallback } from "react";
import { Container } from "react-bootstrap";
import { CITY_SCHEMA } from "../lib/constants";
import SortableTable from "../components/sortable-table";
import Toast from "../components/toast";
import TableActions from "./table-actions";
import useDataStore from "../hooks/use-data-store";

const Cities = () => {
  const [isError, setIsError] = useState(false);
  const [sortOn, setSortOn] = useState({
    sort: "name",
    order: "asc"
  });

  const [
    { recordsCount, fetching, pageRecords, currentPage },
    { fetchPage, sort }
  ] = useDataStore(() => ({
    url: `/cities`,
    params: {
      page: 1,
      sort: sortOn
    },
    name: "cities",
    option: {
      json: true
    }
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
        sortSchema={CITY_SCHEMA}
        sortOn={sortOn}
        updateSortOn={updateSortOn}
      />
      <SortableTable settings={CITY_SCHEMA} data={pageRecords} />
    </Container>
  );
};

export default Cities;
