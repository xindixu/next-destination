import React from "react";
import { Link } from "react-router-dom";

export const MAX_PAGE_NUM = 50;
export const LIMIT = 20;

// schema for apiSorting
export const RESTAURANT_SORTABLE_SCHEMA = {
  best_match: { title: "Best Match", dataSort: true },
  rating: { title: "Rating", dataSort: true },
  review_count: { title: "Review Count", dataSort: true },
  distance: { title: "Distance", dataSort: true }
};

export const EVENT_SORTABLE_SCHEMA = {
  popularity: { title: "Popularity", dataSort: true },
  time_start: { title: "Time Start", dataSort: true }
};

// schema for sortableTable
export const RESTAURANT_SCHEMA = {
  image: {
    title: "",
    getBodyFormat: (_, { image_url: img, name }) => (
      <img src={img} alt={name} />
    ),
    isKey: false,
    dataSort: false
  },
  name: {
    title: "Restaurants",
    getBodyFormat: (_, { alias, name }) => (
      <Link to={`/restaurant/${alias}`}>{name}</Link>
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
    getBodyFormat: (_, { location: { display_address: address } }) => (
      <span>{address.join(", ")}</span>
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
  review_count: {
    title: "Review Count",
    getBodyFormat: (_, { review_count }) => <span>{review_count}</span>,
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

export const EVENT_SCHEMA = {
  name: {
    title: "Events",
    getBodyFormat: (_, { id, name }) => <Link to={`/event/${id}`}>{name}</Link>,
    isKey: true,
    dataSort: true
  },
  location: {
    title: "Address",
    getBodyFormat: (_, { location: { display_address: address } }) => (
      <span>{address}</span>
    ),
    isKey: false,
    dataSort: false
  },
  interested_count: {
    title: "Interested Count",
    getBodyFormat: (_, { interested_count: count }) => <span>{count}</span>,
    isKey: false,
    dataSort: true
  },
  is_free: {
    title: "Free",
    getBodyFormat: (_, { is_free: isFree }) => (
      <span>{isFree ? "Yes" : "No"}</span>
    ),
    isKey: false,
    dataSort: true
  },
  description: {
    title: "Description",
    getBodyFormat: (_, { description }) => <span>{description}</span>,
    isKey: false,
    dataSort: false
  },
  category: {
    title: "Category",
    getBodyFormat: (_, { category }) => <span>{category}</span>,
    isKey: false,
    dataSort: true
  },
  time: {
    title: "Time",
    getBodyFormat: (_, { time_start: start, time_end: end }) => (
      // TODO: format year if no year presents in end
      // TODO: format as May 24, 2020
      <span>
        {new Date(start).toLocaleDateString()} -{" "}
        {new Date(end).toLocaleDateString()}
      </span>
    ),
    isKey: false,
    dataSort: true
  },
  url: {
    title: "URL",
    getBodyFormat: (_, { event_site_url: url }) => (
      <a href={url} target="_blank" rel="noopener noreferrer">
        Yelp
      </a>
    ),
    isKey: false,
    dataSort: false
  }
};
