import React from "react";
import PropTypes from "prop-types";
import {
  ButtonToolbar,
  ButtonGroup,
  InputGroup,
  DropdownButton,
  Dropdown,
  FormControl
} from "react-bootstrap";
import Pagination from "../components/pagination";
import SortOn from "../components/sort-on";

const TableActions = ({
  totalRecords,
  loadPage,
  currentPage,
  sortOn,
  updateSortOn,
  schema
}) => {
  return (
    <ButtonToolbar
      className="justify-content-between"
      aria-label="Table actions, includes pagination, sort options, and a search bar"
    >
      <Pagination
        totalRecords={totalRecords}
        loadPage={loadPage}
        currentPage={currentPage}
      />

      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text>@</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          type="text"
          placeholder="Search"
          aria-label="search"
          aria-describedby="btnGroupAddon2"
        />
      </InputGroup>

      <SortOn sortOn={sortOn} updateSortOn={updateSortOn} schema={schema} />
    </ButtonToolbar>
  );
};

TableActions.propTypes = {
  totalRecords: PropTypes.number.isRequired,
  loadPage: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  schema: PropTypes.object.isRequired,
  sortOn: PropTypes.string.isRequired,
  updateSortOn: PropTypes.func.isRequired
};

export default TableActions;
