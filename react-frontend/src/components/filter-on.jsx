import React from "react";
import PropTypes from "prop-types";
import TagInput from "./tag-input";

const FilterOn = ({ filterSchema, filterOn, updateFilterOn }) => {
  return (
    <>
      {filterSchema.category && (
        <TagInput
          getAllSuggestions={() => filterSchema.category}
          submit={categories =>
            updateFilterOn({ ...filterOn, category: categories })
          }
        />
      )}
    </>
  );
};

FilterOn.defaultProps = {
  filterSchema: {},
  filterOn: ""
};

FilterOn.propTypes = {
  filterSchema: PropTypes.object,
  filterOn: PropTypes.string,
  updateFilterOn: PropTypes.func.isRequired
};

export default FilterOn;
