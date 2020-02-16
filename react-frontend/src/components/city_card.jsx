import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Button, Navbar, Nav } from "react-bootstrap";
import PropTypes from "prop-types";
import Austin from "../page/austin.jfif"

const Ccard = props => (

                    <div className="randCity1">
						  <h3> Austin, TX </h3>
						  <img id="randCity1" src={Austin} alt="pic of city" />
						  
						  
							  <div>
								  <p> Average Airbnb Price: </p>
								  <p> Main Attractions: </p>
								  <p> #BBQ, #Music, #Nightlife </p>
								  <p> Similar Cities </p>
								  <p> City A, City B City C </p>
							  </div>
							  
					  </div>


)



Ccard.propTypes = {};

export default Ccard;