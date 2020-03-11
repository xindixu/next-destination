import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams, Link } from "react-router-dom";

import apiFetch from "../lib/api-fetch";

const Restaurant = ({ restaurant }) => {
  const {
    name,
    categories,
    location: { display_address: address },
    image_url: image,
    coordinates: { latitude, longitude },
    price
  } = restaurant;
  return (
    <>
      <h1>{name}</h1>
      <img src={image} alt={name} />
      {categories.map(({ title }) => (
        <span key={title}>#{title}</span>
      ))}
      <p>
        ({latitude}, {longitude}){" "}
      </p>
      <p>{address}</p>
      <p>{price}</p>
    </>
  );
};
Restaurant.propTypes = {};

export default Restaurant;
