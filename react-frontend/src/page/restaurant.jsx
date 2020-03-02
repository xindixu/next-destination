import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams, Link } from "react-router-dom";

import apiFetch from "../lib/api-fetch";

const Restaurant = props => {
  const [restaurant, setRestaurant] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    apiFetch(`/restaurant/${id}`, {})
      .then(resp => resp.json())
      .then(data => setRestaurant(data.restaurant));
  }, []);

  return (
    <div>
      {restaurant.length &&
        restaurant.map(
          ({
            name,
            category,
            description,
            address,
            coordinates,
            price,
            hours
          }) => (
            <p key={name}>
              name: {name}
              <br />
              category: {category}
              <br />
              address: {address}
              <br />
              description: {description}
              <br />
              coordinates: {coordinates.x}, {coordinates.y}
              <br />
              price: {price}
              <br />
              {hours.map(({ day, start, end }) => (
                <p key={name}>
                  {day}: {start}-{end}
                </p>
              ))}
            </p>
          )
        )}
    </div>
  );
};
Restaurant.propTypes = {};

export default Restaurant;
