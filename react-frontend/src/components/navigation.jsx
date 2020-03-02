import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
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
    <Navbar bg="dark" variant="dark">
      <Nav className="mr-auto" defaultActiveKey="/">
        <Nav.Link eventKey="/">
          <Link to="/">Home</Link>
        </Nav.Link>
        <Nav.Link eventKey="/about">
          <Link to="/about">About</Link>
        </Nav.Link>
        <Nav.Link eventKey="/cities">
          <Link to="/cities">Cities</Link>
        </Nav.Link>
        <Nav.Link eventKey="/venues">
          <Link to="/venues">Venues</Link>
        </Nav.Link>
        <Nav.Link eventKey="/artists">
          <Link to="/artists">Artists</Link>
        </Nav.Link>
      </Nav>
    </Navbar>

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
