import React from 'react';
import { Row, Col } from 'react-bootstrap'
import Chart from './HighChart';
import StockCard from './StockCard';

const StockView = (props) => {
  if (props.isDataLoaded) {
    return (
      <Row>
        <Col sm={9}>
          <Chart data={props.data} volume={props.volume} symbol={props.symbol} />
        </Col>
        <Col sm={3}>
          <StockCard symbol={props.symbol} data={props.data} volume={props.volume} description={props.description} />
        </Col>
      </Row>
    );
  }
  return (<Row></Row>);
}

export default StockView;