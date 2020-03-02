import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Button, Navbar, Nav, Container } from "react-bootstrap";
import PropTypes from "prop-types";

import Home from "../page/home";
import About from "../page/about";
import Cities from "../page/cities";
import City from "../page/city";
import Artists from "../page/artists";
import Attractions from "../page/attractions";
import Restaurant from "../page/restaurant";
import Music from "../page/music";
import Venue from "../page/venue";
import Event from "../page/event";
import Artist from "../page/artist";
import Venues from "../page/venues";

const Navigation = props => (
  <Router>
    <div className="container-fuild mx-auto">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item active">
            <Link to="/about" className="nav-link">
              About
            </Link>
          </li>
          <li className="nav-item active">
            <Link to="/cities" className="nav-link">
              Cities
            </Link>
          </li>
          <li className="nav-item active">
            <Link to="/venues" className="nav-link">
              Venues
            </Link>
          </li>
          <li className="nav-item active">
            <Link to="/artists" className="nav-link">
              Artists
            </Link>
          </li>
        </ul>
      </nav>
    </div>

    <Switch>
      <Route path="/about">
        <About />
      </Route>
      <Route path="/cities">
        <Cities />
      </Route>
      <Route path="/city/:id">
        <City />
      </Route>
      <Route path="/attractions">
        <Attractions />
      </Route>
      <Route path="/artists">
        <Artists />
      </Route>
      <Route path="/artist/:id">
        <Artist />
      </Route>
      <Route path="/restaurant/:id">
        <Restaurant />
      </Route>
      <Route path="/music">
        <Music />
      </Route>
      <Route path="/venues">
        <Venues />
      </Route>
      <Route path="/venue/:id">
        <Venue />
      </Route>
      <Route path="/event">
        <Event />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  </Router>
);

Navigation.propTypes = {};

export default Navigation;
