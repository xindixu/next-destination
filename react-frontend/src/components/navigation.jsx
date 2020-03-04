import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import PropTypes from "prop-types";

import Home from "../page/home";
import About from "../page/about";
import Cities from "../page/cities";
import City from "../page/city";
import Artists from "../page/artists";
import Restaurant from "../page/restaurant";
import Venue from "../page/venue";
import Event from "../page/event";
import Artist from "../page/artist";
import Venues from "../page/venues";

const Navigation = () => (
  <Router>
    <Navbar bg="dark" variant="dark">
      <Nav className="mr-auto" defaultActiveKey="/">
        <Nav.Link eventKey="/" as={Link} to="/">
          Home
        </Nav.Link>
        <Nav.Link eventKey="/about" as={Link} to="/about">
          About
        </Nav.Link>
        <Nav.Link eventKey="/cities" as={Link} to="/cities">
          Cities
        </Nav.Link>
        <Nav.Link eventKey="/venues" as={Link} to="/venues">
          Venues
        </Nav.Link>
        <Nav.Link eventKey="/artists" as={Link} to="/artists">
          Artists
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
      <Route path="/artists">
        <Artists />
      </Route>
      <Route path="/artist/:id">
        <Artist />
      </Route>
      <Route path="/restaurant/:id">
        <Restaurant />
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
