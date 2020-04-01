import React from "react";
import PropTypes from "prop-types";
import { ButtonGroup, DropdownButton, Dropdown } from "react-bootstrap";
import { getSortableAttributes } from "../lib/util";
import { ORDER_SCHEMA } from "../lib/constants";

const SortOn = ({ sortOn, updateSortOn, schema }) => {
  const sortableAttributes = getSortableAttributes(schema);
  const { sort, order } = sortOn;
  return (
    <div>
      <DropdownButton
        as={ButtonGroup}
        title={`Sort on ${
          sortableAttributes[sort] ? sortableAttributes[sort].title : ""
        }`}
        alignRight
      >
        {Object.keys(sortableAttributes).map(key => (
          <Dropdown.Item
            key={key}
            eventKey={key}
            onClick={() => {
              updateSortOn({ ...sortOn, sort: key });
            }}
          >
            {sortableAttributes[key].title}
          </Dropdown.Item>
        ))}
      </DropdownButton>
      {order && (
        <DropdownButton
          as={ButtonGroup}
          title={(ORDER_SCHEMA.find(({ key }) => key === order) || {}).title}
          alignRight
        >
          {ORDER_SCHEMA.map(({ title, key }) => (
            <Dropdown.Item
              eventKey={key}
              onClick={() => {
                updateSortOn({ ...sortOn, order: key });
              }}
            >
              {title}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      )}
    </div>
  );
};

SortOn.propTypes = {
  sortOn: PropTypes.shape({
    sort: PropTypes.string.isRequired,
    order: PropTypes.string
  }).isRequired,
  updateSortOn: PropTypes.func.isRequired,
  schema: PropTypes.object.isRequired
};

export default SortOn;
