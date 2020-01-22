import React from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { fetchStock } from '../actions';
const Search = ({dispatch}) => {
  let input;
  console.log("search called");

  return (
  <Form inline onSubmit={e => {
    console.log("form search submit: ", input.value);
    e.preventDefault();
    if (!input.value.trim()) {
      return;
    }
    dispatch(fetchStock(input.value));
    input.value = '';
  }}>
    <Form.Control
      size="sm"
      type="text"
      placeholder="TWTR"
      className="mr-sm-2"
      onSubmit={ e => {
      console.log("form search submit: ", input.value);
    e.preventDefault();
    if (!input.value.trim()) {
      return;
    }
    dispatch(fetchStock(input.value));
    input.value = '';
  }}
    />
    <input ref={node => (input = node)} />
    <Button
      size="sm"
      variant="outline-success"
      onClick={e => {
        console.log("button search submit: ", input.value);
        e.preventDefault();
        if (!input.value.trim()) {
          return;
        }
        dispatch(fetchStock(input.value));
        input.value = '';
      }}
    >Search</Button>
  </Form>
  )
}

export default connect()(Search);