import React from 'react';
import { Card, Table } from 'react-bootstrap'

const StockCard = (props) => {
  console.log(props.data);
  var data = props.data[0];
  return (
    <Card bg="dark" text="white" style={{ width: '100%' }}>
    <Card.Header><center>{ props.company_name } </center></Card.Header>
    <Card.Body>
      <Table striped bordered hover variant="dark">
        <tbody>
          <tr>
            <td>Ticker</td>
            <td>{props.ticker}</td>
          </tr>
          <tr>
            <td>Open </td>
            <td>${ data[1] }</td>
          </tr>
          <tr>
            <td>Close </td>
            <td>${ data[2] }</td>
          </tr>
          <tr>
            <td>High </td>
            <td>${ data[3] }</td>
          </tr>
          <tr>
            <td>Low </td>
            <td>${ data[4] }</td>
          </tr>
          <tr>
            <td>Volume</td>
            <td>{ props.volume[1] }</td>
          </tr>
        </tbody>
      </Table>
    </Card.Body>
  </Card>
  );
};

export default StockCard;
