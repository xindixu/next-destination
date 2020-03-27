import React from "react";
import PropTypes from "prop-types";
import {
  ButtonToolbar,
  ButtonGroup,
  InputGroup,
  FormControl
} from "react-bootstrap";
import Pagination from "../components/pagination";
import SortOn from "../components/sort-on";
import FilterOn from "../components/filter-on";
import "./table-actions.css";

const TableActions = ({
  totalRecords,
  loadPage,
  currentPage,
  sortOn,
  filterOn,
  updateSortOn,
  updateFilterOn,
  sortSchema,
  filterSchema
}) => {
  return (
    <div
      role="toolbar"
      aria-label="Table actions, includes pagination, sort options, and a search bar"
    >
      {/* <InputGroup className="mb-2">
        <InputGroup.Prepend>
          <InputGroup.Text>@</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          type="text"
          placeholder="Search"
          aria-label="search"
          aria-describedby="btnGroupAddon2"
        />
      </InputGroup> */}
      <FilterOn
        className="mb-2"
        filterSchema={filterSchema}
        filterOn={filterOn}
        updateFilterOn={updateFilterOn}
      />

      <Pagination
        totalRecords={totalRecords}
        loadPage={loadPage}
        currentPage={currentPage}
      />

      <SortOn sortOn={sortOn} updateSortOn={updateSortOn} schema={sortSchema} />
    </div>
  );
};

TableActions.propTypes = {
  totalRecords: PropTypes.number.isRequired,
  loadPage: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  filterSchema: PropTypes.object.isRequired,
  filterOn: PropTypes.string.isRequired,
  updateFilterOn: PropTypes.func.isRequired,
  sortSchema: PropTypes.object.isRequired,
  sortOn: PropTypes.string.isRequired,
  updateSortOn: PropTypes.func.isRequired
};

export default TableActions;
