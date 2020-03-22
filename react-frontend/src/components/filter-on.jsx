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

FilterOn.propTypes = {
  filterSchema: PropTypes.object.isRequired,
  filterOn: PropTypes.string.isRequired,
  updateFilterOn: PropTypes.func.isRequired
};

export default FilterOn;
