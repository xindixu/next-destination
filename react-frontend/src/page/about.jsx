import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {Card, CardBody, CardTitle, CardText} from 'reactstrap'
import apiFetch from '../lib/api-fetch'

const People = props => {
  const [people, setPeople] = useState([])
  useEffect(() => {
    apiFetch('/us', {})
      .then(resp => resp.json())
      .then(data => {
        setPeople(data.us)
        console.log(data)
      })
  }, [])

  return (
    <div>
      {people.length && people.map(
<<<<<<< HEAD
        ({ name, photo, description }) =>
          <p key={name}>{name}: {description}</p>
=======
        ({ name, photo, stats, description}) =>
          <Card>
            <CardTitle key={name}>{name}</CardTitle>
            <CardBody key={name}>
            <CardText>{description}</CardText>
            <br/>
            <CardText key={name}> Commits: {stats['commits']} </CardText>
            <CardText key={name}> Issues: {stats['issues']} </CardText>
            </CardBody>
           </Card>
>>>>>>> 155a3989864284bf5747187e72aad197605799db
      )}
    </div>

  )
}
People.propTypes = {

}

export default People