import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiFetch from "../lib/api-fetch";

import Events from "../containers/events";
import { getLocation } from "../lib/util";

// getLocation();
const EventsPage = props => {
  return (
    <>
      <h1>Events</h1>
      <Events city="austin" />
    </>
  );
};

export default EventsPage;
