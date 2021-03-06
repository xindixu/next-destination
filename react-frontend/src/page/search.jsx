import React, { useState, useCallback } from "react";
import {
  Button,
  Container,
  Form,
  FormControl,
  Dropdown,
  Tabs,
  Tab,
  Spinner
} from "react-bootstrap";
import SortableTable from "../components/sortable-table";
import {
  EVENTS_PAGE_SCHEMA,
  RESTAURANTS_PAGE_SCHEMA,
  SEARCH_ON,
  CITY_SCHEMA
} from "../lib/constants";
import { getUrl } from "../lib/util";
import apiFetch from "../lib/api-fetch";
import "./search.css";

const processResults = results => {
  const { restaurants, events, cities } = results;
  const restaurantsResults = (restaurants && restaurants.businesses) || [];
  const eventsResults = (events && events.events) || [];
  const citiesResults = cities || [];

  return {
    restaurantsResults,
    eventsResults,
    citiesResults
  };
};

const Search = () => {
  const [query, setQuery] = useState("");
  const [lastUrl, setLastUrl] = useState("");
  const [fetching, setFetching] = useState(false);
  const [modelToSearch, setModelToSearch] = useState(() => {
    return Object.keys(SEARCH_ON).reduce((memo, key) => {
      memo[key] = true;
      return memo;
    }, {});
  });
  const [restaurants, setRestaurants] = useState([]);
  const [events, setEvents] = useState([]);
  const [cities, setCities] = useState([]);

  const setDataFromResponse = useCallback(
    ({ results }, override = false) => {
      const {
        restaurantsResults,
        eventsResults,
        citiesResults
      } = processResults(results);

      if (restaurantsResults.length) {
        setRestaurants(
          override
            ? restaurantsResults
            : [...restaurants, ...restaurantsResults]
        );
      }
      if (eventsResults.length) {
        setEvents(override ? eventsResults : [...events, ...eventsResults]);
      }
      if (citiesResults.length) {
        setCities(override ? citiesResults : [...cities, ...citiesResults]);
      }
      setFetching(false);
    },
    [cities, events, restaurants]
  );

  const onSubmit = useCallback(() => {
    setFetching(true);
    const searchOn = Object.keys(modelToSearch).filter(
      key => modelToSearch[key]
    );

    const url = getUrl("/search", { q: query, on: searchOn });
    if (lastUrl === url) {
      console.log("same result, do nothing");
      return;
    }
    setLastUrl(url);
    apiFetch(url, {})
      .then(resp => setDataFromResponse(resp, true))
      .catch(err => console.error(err));
  }, [lastUrl, modelToSearch, query, setDataFromResponse]);

  const getOffset = useCallback(
    searchOn => {
      if (searchOn === SEARCH_ON.restaurants.key) {
        return restaurants.length;
      }
      if (searchOn === SEARCH_ON.events.key) {
        return events.length;
      }
      if (searchOn === SEARCH_ON.cities.key) {
        return cities.length;
      }
      return 0;
    },
    [events.length, restaurants.length, cities.length]
  );

  const fetchMore = useCallback(
    searchOn => {
      setFetching(true);
      const url = getUrl("/search", {
        q: query,
        on: searchOn,
        offset: getOffset(searchOn)
      });
      setLastUrl(url);
      apiFetch(url, {})
        .then(setDataFromResponse)
        .catch(err => console.error(err));
    },
    [getOffset, query, setDataFromResponse]
  );

  return (
    <Container fluid className="full-page">
      <h1>Search CityHunt</h1>
      <Form
        inline
        className="justify-content-center mb-5"
        onSubmit={e => e.preventDefault()}
      >
        <FormControl
          type="text"
          id="search-bar"
          placeholder="Search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          // submit when hitting enter
          onKeyDown={e => e.which === 13 && onSubmit()}
        />
        <Button variant="outline-primary" onClick={onSubmit}>
          Search
        </Button>
        <Dropdown>
          <Dropdown.Toggle variant="outline-primary">Search by</Dropdown.Toggle>
          <Dropdown.Menu>
            {Object.values(SEARCH_ON).map(({ key, title }) => (
              <Form.Check
                custom
                key={key}
                // must have id in order to sync checked with onChange
                id={`custom-${title}`}
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

      {fetching && (
        <div className="w-100 d-flex justify-content-center">
          <Spinner animation="border" variant="info">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      )}

      {/* only show results after a search is executed */}
      {lastUrl && (
        <Tabs>
          {restaurants.length ? (
            <Tab
              eventKey={SEARCH_ON.restaurants.key}
              title={SEARCH_ON.restaurants.title}
            >
              <SortableTable
                settings={RESTAURANTS_PAGE_SCHEMA}
                data={restaurants}
              />
              <Button
                variant="dark"
                className="w-100 my-5"
                onClick={() => {
                  fetchMore(SEARCH_ON.restaurants.key);
                }}
              >
                Show more
              </Button>
            </Tab>
          ) : null}
          {events.length ? (
            <Tab eventKey={SEARCH_ON.events.key} title={SEARCH_ON.events.title}>
              <SortableTable settings={EVENTS_PAGE_SCHEMA} data={events} />
              <Button
                variant="dark"
                className="w-100 my-5"
                onClick={() => {
                  fetchMore(SEARCH_ON.events.key);
                }}
              >
                Show more
              </Button>
            </Tab>
          ) : null}
          {cities.length ? (
            <Tab eventKey={SEARCH_ON.cities.key} title={SEARCH_ON.cities.title}>
              <SortableTable settings={CITY_SCHEMA} data={cities} />
              <Button
                variant="dark"
                className="w-100 my-5"
                onClick={() => {
                  fetchMore(SEARCH_ON.cities.key);
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
