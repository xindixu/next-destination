import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import useDataStore from "../hooks/use-data-store";

import apiFetch from "../lib/api-fetch";
import Restaurants from "../containers/restaurants";
import Events from "../containers/events";
import Pagination from "../components/pagination";

import "./city.css";

const TABS = {
  restaurants: {
    key: "restaurants",
    title: "Restaurants"
  },
  airbnb: {
    key: "airbnb",
    title: "AirBnb"
  },
  events: {
    key: "events",
    title: "Events"
  }
};

const City = () => {
  const { id } = useParams();

  const [
    {
      recordsCount: totalRestaurants,
      pageRecords: restaurantsPageRecords,
      fetching: restaurantsFetching
    },
    { fetchNextPage: restaurantsFetchNextPage, fetchPage: restaurantFetchPage }
  ] = useDataStore(() => ({
    url: `/restaurants/${id}`,
    params: {
      page: 1
    },
    name: "businesses"
  }));

  const [
    { records: events, recordsCount: totalEvents, fetching: eventsFetching },
    { fetchNextPage: eventsFetchNextPage }
  ] = useDataStore(() => ({
    url: `/restaurants/${id}`,
    params: {
      page: 1
    },
    name: "businesses"
  }));

  const [city, setCity] = useState(null);
  // const [isFetchingData, setIsFetchingData] = useState(false);
  const [isError, setIsError] = useState(false);
  const [activeTab, setactiveTab] = useState(TABS.restaurants.key);

  // TODO: data should be passed down from parent
  useEffect(() => {
    apiFetch(`/city/${id}`, {})
      .then(resp => resp.json())
      .then(data => {
        setCity(data.city);
      });
  }, [id]);

  useEffect(() => {
    restaurantFetchPage(1);
    eventsFetchNextPage();
  }, []);

  if (city) {
    const { name, description, image, airbnb } = city;
    return (
      <>
        <div className="city1">
          <h1> {name} </h1>
          <p> {description} </p>
          {/* TODO: extract this component */}
          <img id="randCity1" src={`${image}`} alt="pic of city" />
          <div>
            <p> Average Airbnb Price: {airbnb}</p>
          </div>
        </div>

        <Tabs defaultActiveKey={activeTab}>
          {restaurantsFetching ? (
            <></>
          ) : (
            <Tab eventKey={TABS.restaurants.key} title={TABS.restaurants.title}>
              <Pagination
                totalPages={Math.floor(totalRestaurants / 20)}
                loadPage={p => restaurantFetchPage(p)}
              />
              <Restaurants data={restaurantsPageRecords} />
            </Tab>
          )}
          {restaurantsFetching ? (
            <></>
          ) : (
            <Tab eventKey={TABS.events.key} title={TABS.events.title}>
              <Events data={events} />
            </Tab>
          )}
        </Tabs>
      </>
    );
  }

  return <> </>;
};

City.propTypes = {};

export default City;
