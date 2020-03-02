import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams, Link } from "react-router-dom";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

import apiFetch from "../lib/api-fetch";
import "./city.css";
import SortableTable from "../components/sortable-table";

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
const Restaurants = ({ data }) => {
  const settings = {
    name: {
      title: "Restaurants",
      getBodyFormat: (_, { id, alias, name }) => (
        <Link to={`/restaurants/${alias}`}>{name}</Link>
      ),
      isKey: true,
      dataSort: true
    },
    distance: {
      title: "Distance",
      getBodyFormat: (_, { distance }) => <span>{distance}</span>,
      isKey: false,
      dataSort: true
    },
    location: {
      title: "Address",
      getBodyFormat: (_, { location: { address1, address2 } }) => (
        <span>
          {address1}, {address2}
        </span>
      ),
      isKey: false,
      dataSort: false
    },
    price: {
      title: "Price",
      getBodyFormat: (_, { price }) => <span>{price}</span>,
      isKey: false,
      dataSort: true
    },
    rating: {
      title: "Rating",
      getBodyFormat: (_, { rating }) => <span>{rating}</span>,
      isKey: false,
      dataSort: true
    },
    url: {
      title: "URL",
      getBodyFormat: (_, { url }) => (
        <a href={url} target="_blank" rel="noopener noreferrer">
          Yelp
        </a>
      ),
      isKey: false,
      dataSort: false
    }
  };
  return <SortableTable settings={settings} data={data} />;
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
