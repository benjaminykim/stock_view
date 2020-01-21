import React from 'react';
import Chart from '../components/HighChart'
import StockCard from '../components/StockCard'
import { Row, Col } from 'react-bootstrap'

const StockView = (props) => {
  props = props.props;
  console.log("StockView Render");
  return (
    <Row>
      <Col sm={9}>
        <div style={{height:"100%", width:"100%"}}>
          <Chart data={props} />
        </div>
      </Col>
      <Col sm={3}>
        <div style={{position:'relative', height:"100%", width:"100%"}}>
          <StockCard data={props} />
        </div>
      </Col>
    </Row>
  )
}

export default StockView;