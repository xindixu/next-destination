import React, { useEffect, useState } from "react";
import Events from "../containers/events";
import { setLocation } from "../lib/util";

const EventsPage = () => {
  const [coordinates, setCoordinates] = useState(null);
  useEffect(() => {
    setLocation(setCoordinates);
  }, []);

  return (
    <>
      <h1>Events</h1>
      {coordinates ? <Events coordinates={coordinates} /> : <></>}
    </>
  );
};

export default EventsPage;
