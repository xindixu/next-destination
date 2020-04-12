import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Container, Form, FormControl } from "react-bootstrap"
import './search.css'

const Search = props => {
    const [query, setQuery] = useState("")
    return (
        <Container fluid className="full-page">
            <Form inline>
                <FormControl type="text" placeholder="Search" value={query} onChange={(e) => setQuery(`${query}${e.target.value}`)} />
                <Button variant="outline-success">Search</Button>
            </Form>
            {/* {query} */}
        </Container>
    )
}

Search.propTypes = {

}

export default Search
