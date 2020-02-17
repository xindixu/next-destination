import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Card, CardBody, CardTitle, CardText } from 'reactstrap'
import apiFetch from '../lib/api-fetch'

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
    <div>
      {people.length ? people.map(
        ({ name, photo, stats: { commits, issues }, description }) =>
          <Card key={name}>
            <CardTitle>{name}</CardTitle>
            <CardBody>
              <CardText>{description}</CardText>
              <br />
              <CardText> Commits: {commits} </CardText>
              <CardText> Issues: {issues} </CardText>
            </CardBody>
          </Card>
      ) : <p>Fetching data...</p>}
    </div>

  )

}
People.propTypes = {

}

export default People