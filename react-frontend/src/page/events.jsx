import React, { useContext } from "react";
import Events from "../containers/events";
import { CityHuntContext } from "../App";

const EventsPage = () => {
  const { coordinates } = useContext(CityHuntContext);
  return (
    <>
      <h1>Events</h1>
      {coordinates ? <Events coordinates={coordinates} /> : <></>}
    </>
  );
};

export default EventsPage;