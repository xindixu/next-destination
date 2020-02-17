import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import apiFetch from "../lib/api-fetch";
const Businesses = props => {
  const [business, setBusiness] = useState([]);
  useEffect(() => {
    apiFetch("/business", {})
      .then(resp => resp.json())
      .then(data => {
        setBusiness(data.business);
        console.log(data);
      });
  }, []);

  return (
    <div>
      {business.length &&
        business.map(
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
Businesses.propTypes = {};

export default Businesses;
