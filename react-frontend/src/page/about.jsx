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
    This is project connects music-focused travellers to artists, venues, and cities.
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
        <Spinner type="grow" color="info" />
      )}
    </Row>
    </Container>

    </div>

  );
};
People.propTypes = {};

export default People;
