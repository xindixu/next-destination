import React from "react";
import PropTypes from "prop-types";
import { ButtonGroup, DropdownButton, Dropdown } from "react-bootstrap";
import { getSortableAttributes } from "../lib/util";

const SortOn = ({ sortOn, setSortOn, schema }) => {
  const sortableAttributes = getSortableAttributes(schema);
  return (
    <DropdownButton
      as={ButtonGroup}
      title={`Sort on ${sortOn || ""}`}
      alignRight
    >
      {Object.keys(sortableAttributes).map(key => (
        <Dropdown.Item
          eventKey={key}
          onClick={() => {
            console.log(key);
          }}
        >
          {sortableAttributes[key].title}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
};

SortOn.propTypes = {
  totalRecords: PropTypes.number.isRequired,
  loadPage: PropTypes.func.isRequired,
  sortOn: PropTypes.string.isRequired
};

export default SortOn;
