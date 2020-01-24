import React from 'react';
import { Button, Card, Accordion } from 'react-bootstrap'

const color="#3d4147"
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const StockCard = (props) => {
  return (
    <div style={{position:'relative', height:"100%", width:"100%"}}>
      <Accordion>
        <Card text="white" border="success" style={{ width: '100%', backgroundColor:color }}>
          <Card.Header as="h5">
              {props.symbol}
              <Button style={{
                width: "25px",
                height: "25px",
                textAlign: "center",
                padding: "0px 6px",
                fontSize: "14px",
                float: "right",
                lineHeight: 1.428571429,
                borderRadius: "15px"}}>+</Button>
          </Card.Header>
          <Card.Body>
            <Card.Subtitle className="mb-2 text-muted">
              ${props.data[0][4]}
              <br/>
              {numberWithCommas(props.volume[0][1])}
            </Card.Subtitle>
          </Card.Body>
        </Card>
        <Card text="white" border="success" style={{ backgroundColor:color}}>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              Description
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>{props.description}</Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  );
};

export default StockCard;