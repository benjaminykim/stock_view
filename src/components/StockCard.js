import React from 'react';
import { Button, Card, Table } from 'react-bootstrap'

const StockCard = (props) => {
  //props = props.data;
  //var data = props.data[0];
  return (
    <Card bg="dark" text="white" style={{ width: '100%' }}>
    <Card.Header>
      <div class="float-left">{props.name}</div>
      <div class="float-right"><Button style={{
        width: "30px",
        height: "30px",
        textAlign: "center",
        padding: "0px 6px",
        fontSize: "14px",
        lineHeight: 1.428571429,
        borderRadius: "15px"
      }}>+</Button></div>
    </Card.Header>
    <Card.Body>
      <Table striped bordered hover variant="dark">
        <tbody>
          <tr>
            <td>Ticker</td>
            <td>{props.symbol}</td>
          </tr>
          <tr>
            <td>Open </td>
            <td>${ props.data[1] }</td>
          </tr>
          <tr>
            <td>Close </td>
            <td>${ props.data[2] }</td>
          </tr>
          <tr>
            <td>High </td>
            <td>${ props.data[3] }</td>
          </tr>
          <tr>
            <td>Low </td>
            <td>${ props.data[4] }</td>
          </tr>
          <tr>
            <td>Volume</td>
            <td>{ props.volume }</td>
          </tr>
        </tbody>
      </Table>
    </Card.Body>
  </Card>
  );
};

export default StockCard;
