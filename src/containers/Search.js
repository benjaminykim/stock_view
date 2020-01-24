import React from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { fetchStock } from '../actions/index';
import store from '../components/Store';
const Search = ({dispatch}) => {
  let input;

  const handleSubmit = (e) => {
    console.log("search submit: ", input.value);
    e.preventDefault();
    if (!input.value.trim()) {
      return;
    }
    if (store.getState().symbol === input.value.toUpperCase())
      return;
    dispatch(fetchStock(input.value.toUpperCase()));
    input.value = '';
  }

  return (
  <Form inline onSubmit={handleSubmit} >
    <Form.Control
      size="sm"
      type="text"
      placeholder="stock..."
      className="mr-sm-2"
      onSubmit={handleSubmit}
      ref={ref => { input = ref }}
    />
    <Button
      size="sm"
      variant="outline-success"
      onClick={handleSubmit}
    >Search</Button>
  </Form>
  )
}

export default connect()(Search);