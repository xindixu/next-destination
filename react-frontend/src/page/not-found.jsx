import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="text-center">
    <h1>
      We looked everywhere but couldn&apos;t find what you are looking for.
    </h1>
    <Link className="btn btn-primary " to="/">
      Back to home
    </Link>
  </div>
);

export default NotFound;
