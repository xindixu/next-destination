import React from 'react'
import PropTypes from 'prop-types'
import './home.css'
import { Row, Col, Container } from 'react-bootstrap'
import Austin from "./austin.jfif"
import Banner from "./banner.jpg"

const Home = props => {
	return (
		<div className="body">
			<h1>Home</h1>
			<img className="banner" src={Banner} alt="Picture of City" />
			<p className="descr"> The following are randomized cities and their main attractions. </p>
			<Container className="Container" >
				<Row className="Row">
					<Col sm>
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
					</Col>
				</Row>
			</Container>
		</div>
	)
}

Home.propTypes = {

}

export default Home
