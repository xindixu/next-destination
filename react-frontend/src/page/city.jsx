import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams, Link } from "react-router-dom";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

import apiFetch from "../lib/api-fetch";

import Restaurants from "../containers/restaurants";
import "./city.css";

const TABS = {
  restaurants: {
    key: "restaurants",
    title: "Restaurants"
  },
  airbnb: {
    key: "airbnb",
    title: "AirBnb"
  }
};

const City = () => {
  const { id } = useParams();

  const [city, setCity] = useState(null);
  const [venues, setVenues] = useState([]);
  const [artists, setArtists] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [isFetchingData, setIsFetchingData] = useState(false);

  // TODO: data should be passed down from parent
  useEffect(() => {
    apiFetch(`/city/${id}`, {})
      .then(resp => resp.json())
      .then(data => {
        setCity(data.city);
      });
  }, [id]);

  useEffect(() => {
    apiFetch("/venues", {})
      .then(resp => resp.json())
      .then(data => setVenues(data.venues));
  }, [id]);

  useEffect(() => {
    apiFetch("/artists", {})
      .then(resp => resp.json())
      .then(data => setArtists(data.artists));
  }, [id]);

  useEffect(() => {
    setIsFetchingData(true);
    apiFetch(`/restaurants/${id}`, {})
      .then(resp => resp.json())
      .then(data => {
        setRestaurants(data.restaurants.businesses);
        setIsFetchingData(false);
      })
      .catch(() => {
        setIsFetchingData(false);
      });
  }, [id]);

  const filterVenues = (cityName, venues) => {
    const venue = venues.filter(venue => venue.city === cityName);
    return venue;
  };

  const filterArtists = (cityArtist, artists) => {
    const artist = artists.filter(artists => artists.name === cityArtist);
    return artist;
  };

  if (city) {
    const { name, description, image, artist, airbnb } = city;
    return (
      <>
        <div className="city1">
          <h1> {name} </h1>
          <p> {description} </p>
          {/* TODO: extract this component */}
          <img id="randCity1" src={`${image}`} alt="pic of city" />
          <div>
            <p> Average Airbnb Price: {airbnb}</p>
            {filterVenues(name, venues).map(({ id, name }) => (
              <p key={id}>
                Venues: <Link to={`/venue/${id}`}>{name}</Link>{" "}
              </p>
            ))}
            {filterArtists(artist, artists).map(({ id, name }) => (
              <p key={id}>
                Upcoming Artists:
                <Link to={`/artist/${id}`}>{name}</Link>{" "}
              </p>
            ))}
          </div>
        </div>

        <Tabs defaultActiveKey={TABS.restaurants.key}>
          {restaurants.length ? (
            <Tab eventKey={TABS.restaurants.key} title={TABS.restaurants.title}>
              <Restaurants data={restaurants} />
            </Tab>
          ) : (
            <></>
          )}
        </Tabs>
      </>
    );
  }

  return <> </>;
};

City.propTypes = {};

export default City;
