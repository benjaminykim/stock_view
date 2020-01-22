import React from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap'
const Search = () => {
  return (
  <Form inline >
    <Form.Control size="sm" type="text" placeholder="TWTR" className="mr-sm-2" />
    <Button size="sm" variant="outline-success">Search</Button>
  </Form>
  )
}

export default connect()(Search);