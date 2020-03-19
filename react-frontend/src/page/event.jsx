import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import apiFetch from "../lib/api-fetch";

const Event = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    apiFetch(`/event/${id}`, { useApi: true, json: true }).then(data => {
      setEvent(data.response);
    });
  }, []);

  if (!event) {
    return <></>;
  }

  const {
    name,
    category,
    location: { display_address: address },
    image_url: image,
    latitude,
    longitude,
    cost,
    is_free: isFree,
    event_site_url: url,
    time_start: start,
    time_end: end,
    description
  } = event;

  return (
    <>
      <h1>{name}</h1>
      <img src={image} alt={name} className="md center" />
      <p>
        <span>#{category}</span>
      </p>
      <p>
        Event time: {new Date(start).toLocaleDateString()} -
        {new Date(end).toLocaleDateString()}
      </p>
      <p>
        ({latitude}, {longitude}){" "}
      </p>
      <p>
        <a href={url}>Official Website</a>
      </p>
      <p>{address}</p>
      <p>{cost}</p>
      <p>{description}</p>
    </>
  );
};

export default Event;
