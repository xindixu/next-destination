import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Card, CardBody, CardTitle, CardText, CardImg, CardDeck } from 'reactstrap'
import { Container, Row, Col, Spinner } from 'reactstrap'
import apiFetch from '../lib/api-fetch'
import yoda from '../assets/yoda-portrait.jpg'

import './about.css'

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
			<h1>About Us</h1>
			<h2>The Project</h2>


    <Container>
    <h2>The Team</h2>
    <Row>
      {people.length ? (
        people.map(
          ({ name, photo, responsibilities, stats: { commits, issues }, description }) => (
            <Col xs={12} sm={6} md={4} lg={4}>
            <Card key={name}>
              <CardBody>
                <CardTitle>{name}</CardTitle>
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
        <p>Fetching data...</p>
      )}
    </Row>
    </Container>

    </div>

  );
};
People.propTypes = {};

export default People;
