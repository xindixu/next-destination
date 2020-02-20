import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Card, CardBody, CardTitle, CardText, CardImg, CardDeck } from 'reactstrap'
import { Container, Row, Col, Spinner } from 'reactstrap'
import apiFetch from '../lib/api-fetch'
import marshall_pic from '../assets/marshall_portrait.jpg'
import yulissa_pic from '../assets/yulissa_portrait.jpg'
import quinton_pic from '../assets/quinton_portrait.jpg'
import nathan_pic from '../assets/nathan_portrait.jpg'
import xindi_pic from '../assets/xindi_portrait.jpg'
import './about.css'

const photos = {
   marshall: marshall_pic,
   yulissa: yulissa_pic,
   quinton: quinton_pic,
   nathan: nathan_pic,
   xindi: xindi_pic
}
const People = props => {
  const [people, setPeople] = useState([]);
  useEffect(() => {
    apiFetch("/about", {})
      .then(resp => resp.json())
      .then(data => {
        setPeople(data.about);
        console.log(data);
      });
  }, []);

  return (

    <div className="body">

	<Container>
    <h1>About Us</h1>
	<h2>The Project</h2>
    <div className='flex-links'>
    <p>This project connects music-focused travellers to artists, venues, and cities.</p>
    <ul>
        <p><b>Links about our project</b></p>
        <li><a href="https://gitlab.com/nmcraig/cs-331e/issues">Our Issue Tracker</a></li>
        <li><a href="https://gitlab.com/nmcraig/cs-331e/">Our Repo</a></li>
        <li><a href="https://gitlab.com/nmcraig/cs-331e/-/wikis/Phase-1-Development">Our report for phase 1 Development</a></li>
        <li><a href="https://gitlab.com/nmcraig/cs-331e/-/wikis/Technical-Report">The overall technical report</a></li>
        <p><b>Links about Data</b></p>
        <li><a href="https://www.artists.bandsintown.com/support/api-installation">Artists and Venues through BandsinTown</a></li>
        <li><a href="http://developers.teleport.org/api/getting_started/#search_name">City Searching Feature and Photo Database</a></li>
        <li><a href="https://www.mediawiki.org/wiki/API:Main_page">Information about Cities</a></li>
        <li><a href="http://insideairbnb.com/get-the-data.html">Airbnb Data for Different Cities</a></li>
    </ul>
    </div>
    <h2>The Team</h2>
    <Row>

      {people.length ? (
        people.map(
          ({ name, responsibilities, stats: { commits, issues }, description, id }) => (
            <Col xs={12} sm={6} md={4} lg={4}>
            <Card key={name}>
              <CardBody>
                <CardTitle>{name}</CardTitle>
                <img src={photos[id]} ></img>
                <CardText>Skills: {responsibilities}</CardText>
                <CardText>Description: {description}</CardText>
                <CardText> Commits: {commits} </CardText>
                <CardText> Issues: {issues} </CardText>
              </CardBody>
            </Card>
            </Col>
          )
        )
      ) : (
        <div className='abs_spinner'>
            <Spinner type="grow" color="info" />
        </div>
      )}
    </Row>
    </Container>

    </div>

  );
};
People.propTypes = {};

export default People;
