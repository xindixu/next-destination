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

      <Container className="themed-container">
        <h2>The Team</h2>
        <Row>
          <Col md='4'>
            {people.length ? people.map(
              ({ name, photo, stats: { commits, issues }, description }) =>
                <Row className='no-gutters'>
                  <Col md='3'>
                    <Card>
                      <CardBody>
                        <CardTitle>{name}</CardTitle>
                        <CardText>{description}</CardText>
                        <CardText> Commits: {commits} </CardText>
                        <CardText> Issues: {issues} </CardText>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>

            ) : <Spinner type="grow" color="info" />}
          </Col>
        </Row>
      </Container>
    </div>
  );
};
People.propTypes = {};

export default People;
