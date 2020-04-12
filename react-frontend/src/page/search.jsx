import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Container, Form, FormControl } from "react-bootstrap";
import SortableTable from "../components/sortable-table";
import { EVENTS_PAGE_SCHEMA, RESTAURANTS_PAGE_SCHEMA, CATEGORIES } from "../lib/constants";
import apiFetch from "../lib/api-fetch";
import "./search.css";

const Search = props => {
  const [query, setQuery] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [events, setEvents] = useState([]);
  const onSubmit = () => {
    apiFetch(`/search?q=${query}`, {})
      .then(({ results }) => {
        const { restaurants, events, cities, airbnbs } = results;
        setRestaurants(restaurants.businesses);
        setEvents(events.events)
        console.log(results);
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

      {restaurants.length ? (
        <SortableTable settings={RESTAURANTS_PAGE_SCHEMA} data={restaurants} />
      ) : null}
      {events.length ? (
        <SortableTable settings={EVENTS_PAGE_SCHEMA} data={events} />
      ) : null}
    </Container>
  );
};

Search.propTypes = {};

export default Search;
