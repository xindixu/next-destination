import React from "react";
import PropTypes from "prop-types";
import TagInput from "./tag-input";

const FilterOn = ({ filterSchema, filterOn, updateFilterOn }) => {
  const { category: categorySchema } = filterSchema;

  if (categorySchema) {
    return (
      <TagInput
        getAllSuggestions={() => categorySchema}
        submit={categories => {
          updateFilterOn({
            ...filterOn,
            category: categorySchema.filter(item =>
              categories.includes(item.title)
            )
          });
        }}
      />
    );
  }

  return <></>;
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
