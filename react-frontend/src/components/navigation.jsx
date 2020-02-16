import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Button, Navbar, Nav } from "react-bootstrap";
import PropTypes from "prop-types";

import Home from "../page/home";
import About from "../page/about";
import Cities from "../page/cities";
import City from "../page/city";
import Prices from "../page/prices";
import Attractions from "../page/attractions";
import Business from "../page/business";
// import Event from "../page/event";


const Navigation = props => (
  <Router>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li className="nav-item active">
          <Link to="/about" className="nav-link">About</Link>
        </li>
        <li className="nav-item active">
          <Link to="/cities" className="nav-link">Cities</Link>
        </li>
        <li className="nav-item active">
          <Link to="/attractions" className="nav-link">Attractions</Link>
        </li>
        <li className="nav-item active">
          <Link to="/prices" className="nav-link">Prices</Link>
        </li>
      </ul>
    </nav>

    <Switch>
      <Route path="/about">
        <About />
      </Route>
      <Route path="/cities">
        <Cities />
      </Route>
      <Route path="/city/:id" children={<City />} />
      <Route path="/attractions">
        <Attractions />
      </Route>
      <Route path="/prices">
        <Prices />
      </Route>
      <Route path="/">
        <Home />
      </Route>
      <Route path="/business">
        <Business />
      </Route>
      <Route path="/music">
        <Home />
      </Route>
      <Route path="/venue">
        <Home />
      </Route>
    </Switch>
  </Router>
)



Navigation.propTypes = {};

export default Navigation;
