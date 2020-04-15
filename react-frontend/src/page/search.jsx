import React, { useState } from "react";
import {
  Button,
  Container,
  Form,
  FormControl,
  Dropdown,
  Tabs,
  Tab
} from "react-bootstrap";
import SortableTable from "../components/sortable-table";
import {
  EVENTS_PAGE_SCHEMA,
  RESTAURANTS_PAGE_SCHEMA,
  MODELS
} from "../lib/constants";
import { getUrl } from "../lib/util";
import apiFetch from "../lib/api-fetch";
import "./search.css";

const processResults = results => {
  const { restaurants, events, cities, airbnbs } = results;
  const restaurantsResults = (restaurants && restaurants.businesses) || [];
  const eventsResults = (events && events.events) || [];

  return {
    restaurantsResults,
    eventsResults,
    citiesResults: [],
    airbnbsResults: []
  };
};

const Search = () => {
  const [query, setQuery] = useState("");
  const [lastUrl, setLastUrl] = useState("");
  const [modelToSearch, setModelToSearch] = useState(() => {
    return Object.keys(MODELS).reduce((memo, key) => {
      memo[key] = true;
      return memo;
    }, {});
  });
  const [restaurants, setRestaurants] = useState([]);
  const [events, setEvents] = useState([]);

  const setDataFromResponse = ({ results }) => {
    const {
      restaurantsResults,
      eventsResults,
      citiesResults,
      airbnbsResults
    } = processResults(results);

    if (restaurantsResults.length) {
      setRestaurants([...restaurants, ...restaurantsResults]);
    }
    if (eventsResults.length) {
      setEvents([...events, ...eventsResults]);
    }
  };

  const onSubmit = () => {
    const searchOn = Object.keys(modelToSearch).filter(
      key => modelToSearch[key]
    );

    const url = getUrl("/search", { q: query, on: searchOn });
    if (lastUrl === url) {
      console.log("same result, do nothing");
      return;
    }
    setLastUrl(url);
    setRestaurants([]);
    setEvents([]);

    apiFetch(url, {})
      .then(setDataFromResponse)
      .catch(err => console.error(err));
  };

  const fetchMore = searchOn => {
    const url = getUrl("/search", { q: query, on: searchOn, offset: 0 });
    setLastUrl(url);
    apiFetch(url, {})
      .then(setDataFromResponse)
      .catch(err => console.error(err));
  };

  return (
    <Container fluid className="full-page">
      <h1>Search CityHunt</h1>
      <Form inline className="justify-content-center mb-lg-5">
        <FormControl
          type="text"
          id="search-bar"
          placeholder="Search"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <Button variant="outline-primary" onClick={onSubmit}>
          Search
        </Button>
        <Dropdown>
          <Dropdown.Toggle variant="outline-primary">Search by</Dropdown.Toggle>
          <Dropdown.Menu>
            {Object.values(MODELS).map(({ key, title }) => (
              <Form.Check
                key={key}
                type="checkbox"
                label={title}
                checked={modelToSearch[key]}
                onChange={() => {
                  setModelToSearch({
                    ...modelToSearch,
                    [key]: !modelToSearch[key]
                  });
                }}
              />
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Form>

      {/* only show results after a search is executed */}
      {lastUrl && (
        <Tabs>
          {restaurants.length ? (
            <Tab
              eventKey={MODELS.restaurants.key}
              title={MODELS.restaurants.title}
            >
              <SortableTable
                settings={RESTAURANTS_PAGE_SCHEMA}
                data={restaurants}
              />
              <Button
                variant="dark"
                className="w-100 my-5"
                onClick={() => {
                  fetchMore(MODELS.restaurants.key);
                }}
              >
                Show more
              </Button>
            </Tab>
          ) : null}
          {events.length ? (
            <Tab eventKey={MODELS.events.key} title={MODELS.events.title}>
              <SortableTable settings={EVENTS_PAGE_SCHEMA} data={events} />
              <Button
                variant="dark"
                className="w-100 my-5"
                onClick={() => {
                  fetchMore(MODELS.events.key);
                }}
              >
                Show more
              </Button>
            </Tab>
          ) : null}
        </Tabs>
      )}
    </Container>
  );
};

export default Search;
