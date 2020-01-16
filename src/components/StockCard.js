import React from 'react';
import { Card, Table } from 'react-bootstrap'

const StockCard = (props) => {
  console.log(props.data);
  var data = props.data[0];
  return (
    <Card bg="success" text="white" style={{ width: '50%' }}>
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
            <td>${ data.open }</td>
          </tr>
          <tr>
            <td>Close </td>
            <td>${ data.close }</td>
          </tr>
          <tr>
            <td>High </td>
            <td>${ data.high }</td>
          </tr>
          <tr>
            <td>Low </td>
            <td>${ data.low }</td>
          </tr>
          <tr>
            <td>Volume</td>
            <td>{ data.volume }</td>
          </tr>
        </tbody>
      </Table>
    </Card.Body>
  </Card>
  );
};

export default StockCard;
