import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import apiFetch from "../lib/api-fetch";
const Events = props => {
  const [event, setEvent] = useState([]);
  useEffect(() => {
    apiFetch("/event", {})
      .then(resp => resp.json())
      .then(data => {
        setEvent(data.event);
        console.log(data);
      });
  }, []);

  return (
    <div>
      {event.length &&
        event.map(
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
Events.propTypes = {};

export default Events;
