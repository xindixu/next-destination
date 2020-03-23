import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation
} from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

import Home from "../page/home";
import About from "../page/about";
import Cities from "../page/cities";
import City from "../page/city";
import Restaurants from "../page/restaurants";
import Restaurant from "../page/restaurant";
import Event from "../page/event";
import Events from "../page/events";

const AppNavBar = () => {
  const location = useLocation();

  return (
    <Navbar bg="dark" variant="dark">
      <Nav className="mr-auto" defaultActiveKey={location.pathname}>
        <Nav.Link eventKey="/" as={Link} to="/">
          Home
        </Nav.Link>
        <Nav.Link eventKey="/about" as={Link} to="/about">
          About
        </Nav.Link>
        <Nav.Link eventKey="/cities" as={Link} to="/cities">
          Cities
        </Nav.Link>
        <Nav.Link eventKey="/restaurants" as={Link} to="/restaurants">
          Restaurants
        </Nav.Link>
        <Nav.Link eventKey="/events" as={Link} to="/events">
          Events
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

const Navigation = () => (
  <Router>
    <AppNavBar />
    <Switch>
      <Route path="/about">
        <About />
      </Route>
      <Route path="/unittests">
        <About />
      </Route>
      <Route path="/cities">
        <Cities />
      </Route>
      <Route path="/city/:id">
        <City />
      </Route>
      <Route path="/restaurant/:id">
        <Restaurant />
      </Route>
      <Route path="/restaurants/">
        <Restaurants />
      </Route>
      <Route path="/events/">
        <Events />
      </Route>
      <Route path="/event/:id">
        <Event />
      </Route>
      <Route exact path="/">
        <Home />
      </Route>
    </Switch>
  </Router>
);

export default Navigation;
