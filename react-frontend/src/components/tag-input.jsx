import React from "react";
import PropTypes from "prop-types";

import TagsInput from "react-tagsinput";
import Autosuggest from "react-autosuggest";
import { Button, ButtonToolbar } from "react-bootstrap";
import "./tag-input.css";

class TagInput extends React.Component {
  constructor() {
    super();
    this.state = { tags: [] };
  }

  handleChange = tags => {
    this.setState({ tags });
  };

  render() {
    const { getAllSuggestions, submit } = this.props;
    const { tags } = this.state;
    function autocompleteRenderInput({ addTag, ...props }) {
      const handleOnChange = (e, { newValue, method }) => {
        if (method === "enter") {
          e.preventDefault();
        } else {
          props.onChange(e);
        }
      };

      const inputValue =
        (props.value && props.value.trim().toLowerCase()) || "";
      const inputLength = inputValue.length;

      const suggestions = getAllSuggestions().filter(suggestion => {
        return (
          suggestion.title.toLowerCase().slice(0, inputLength) === inputValue
        );
      });

      // TODO: enter to add top suggestion
      // TODO: make the container float - react portal
      // TODO: styling

      return (
        <Autosuggest
          ref={props.ref}
          suggestions={suggestions}
          shouldRenderSuggestions={value => value && value.trim().length > 0}
          getSuggestionValue={suggestion => suggestion.title}
          renderSuggestion={suggestion => <span>{suggestion.title}</span>}
          inputProps={{ ...props, onChange: handleOnChange }}
          onSuggestionSelected={(e, { suggestion }) => {
            addTag(suggestion.title);
          }}
          onSuggestionsClearRequested={() => {}}
          onSuggestionsFetchRequested={() => {}}
        />
      );
    }

    return (
      <>
        <TagsInput
          renderInput={autocompleteRenderInput}
          value={tags}
          onChange={this.handleChange}
        />
        <Button onClick={() => submit(tags)}>Filter</Button>
      </>
    );
  }
}

TagInput.propTypes = {
  submit: PropTypes.func.isRequired,
  getAllSuggestions: PropTypes.func.isRequired
};

export default TagInput;
