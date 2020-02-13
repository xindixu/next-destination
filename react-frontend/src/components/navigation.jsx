import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types'

import Home from '../page/home'
import About from '../page/about'
import Cities from '../page/cities'
import City from '../page/city'
import Prices from '../page/prices'
import Attractions from '../page/attractions'

const Navigation = props => (
  <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/cities">Cities</Link>
          </li>
          <li>
            <Link to="/attractions">Attractions</Link>
          </li>
          <li>
            <Link to="/prices">Prices</Link>
          </li>
        </ul>
        <Button>Hi</Button>
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
        <Route path="/prices">
          <Prices />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
  </Router>
)


Navigation.propTypes = {

}

export default Navigation
