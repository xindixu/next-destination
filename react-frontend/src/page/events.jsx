import React, { useContext } from "react";
import Events from "../containers/events";
import { CityHuntContext } from "../App";
import { EVENTS_PAGE_SCHEMA } from "../lib/constants";

const EventsPage = () => {
  const { coordinates } = useContext(CityHuntContext);

  return (
    <>
      <h1>Events</h1>
      {coordinates ? (
        <Events coordinates={coordinates} tableSchema={EVENTS_PAGE_SCHEMA} />
      ) : (
        // <></>
        <Events city="austin" tableSchema={EVENTS_PAGE_SCHEMA} />
      )}
    </>
  );
};

export default EventsPage;
