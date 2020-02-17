import React from 'react'
import PropTypes from 'prop-types'
import { Jumbotron, Container } from 'reactstrap'

const State = props => {
  return (
    <>
      <div>
        <Jumbotron fluid>
          <Container fluid>
            <h1 className="display-4">Texas</h1>
            <p className="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
          </Container>
        </Jumbotron>
      </div>
    </>
  )
}

State.propTypes = {

}

export default State