import React from "react";
import PropTypes from "prop-types";
import { ButtonGroup, DropdownButton, Dropdown } from "react-bootstrap";
import { getSortableAttributes } from "../lib/util";

const SortOn = ({ sortOn, updateSortOn, schema }) => {
  const sortableAttributes = getSortableAttributes(schema);
  return (
    <DropdownButton
      as={ButtonGroup}
      title={`Sort on ${
        sortableAttributes[sortOn] ? sortableAttributes[sortOn].title : ""
      }`}
      alignRight
    >
      {Object.keys(sortableAttributes).map(key => (
        <Dropdown.Item
          key={key}
          eventKey={key}
          onClick={() => {
            updateSortOn(key);
          }}
        >
          {sortableAttributes[key].title}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
};

SortOn.propTypes = {
  sortOn: PropTypes.string.isRequired,
  updateSortOn: PropTypes.func.isRequired,
  schema: PropTypes.object.isRequired
};

export default SortOn;
