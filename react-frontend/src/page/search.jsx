import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Container, Form, FormControl } from "react-bootstrap";
import apiFetch from "../lib/api-fetch";
import "./search.css";

const Search = props => {
  const [query, setQuery] = useState("");
  const onSubmit = () => {
    apiFetch(`/search?q=${query}`, {})
      .then(resp => {
        console.log(resp);
      })
      .catch(err => console.error(err));
  };

  return (
    <Container fluid className="full-page">
      <Form inline>
        <FormControl
          type="text"
          placeholder="Search"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <Button variant="outline-primary" onClick={onSubmit}>
          Search
        </Button>
      </Form>
    </Container>
  );
};

Search.propTypes = {};

export default Search;
