import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Button, Navbar, Nav } from "react-bootstrap";
import PropTypes from "prop-types";

import Home from "../page/home";
import About from "../page/about";
import Cities from "../page/cities";
import City from "../page/city";
import Artists from "../page/artists";
import Attractions from "../page/attractions";
import Business from "../page/business";
import Music from "../page/music";
import Venue from "../page/venue";
import Event from "../page/event";



const Navigation = props => (
  <Router>
<<<<<<< HEAD
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
        <li className="nav-item active">
          <Link to="/venue" className="nav-link">venue</Link>
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

      <Route path="/business">
        <Business />
      </Route>

      <Route path="/music">
        <Music />
      </Route>

      <Route path="/event">
        <Event />
      </Route>

      <Route path="/venue">
        <Venue />
      </Route>

      <Route path="/">
        <Home />
      </Route>

    </Switch>
=======
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
              <Link to="/artists" className="nav-link">Artists</Link>
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
        <Route path="/city/:id" children={<City/>} />
        <Route path="/attractions">
          <Attractions />
        </Route>
        <Route path="/artists">
          <Artists />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
>>>>>>> 155a3989864284bf5747187e72aad197605799db
  </Router>
)



Navigation.propTypes = {};

export default Navigation;
