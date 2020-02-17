import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Card, CardBody, CardTitle, CardText, CardImg } from 'reactstrap'
import { Container, Row, Col, Spinner} from 'reactstrap'
import apiFetch from '../lib/api-fetch'
import yoda from '../assets/yoda-portrait.jpg'
import './about.css'

const People = props => {
  const [people, setPeople] = useState([])
  useEffect(() => {
    apiFetch('/about', {})
      .then(resp => resp.json())
      .then(data => {
        setPeople(data.about)
        console.log(data)
      })
  }, [])

  return (
    <div className="body">
			<h1>About Us</h1>

    <Container className="themed-container">
      {people.length ? people.map(
        ({ name, photo, stats: { commits, issues }, description }) =>
        <Row xs="3">

                <Card key={name}>
                    <CardTitle>{name}</CardTitle>
                <CardBody>
                    <CardImg src={yoda} alt="yoda" top-width="50%"/>
                    <CardText>{description}</CardText>
                    <br />
                    <CardText> Commits: {commits} </CardText>
                    <CardText> Issues: {issues} </CardText>
                </CardBody>
                </Card>

         </Row>
      ) : <Spinner type="grow" color="info" />}
    </Container>
    </div>

  )

}
People.propTypes = {

}

export default People