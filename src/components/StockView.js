import React from 'react';
import Chart from './Chart'
import StockCard from './StockCard'
import { Row, Col } from 'react-bootstrap'


class StockView extends React.Component {
  render() {
    console.log("StockView Render");
    return (
      <Row>
        <Col sm={8}>
          <div style={{height:"700px", width:"100%", background:"white"}}>
            <Chart data={this.props.data}/>
          </div>
        </Col>
        <Col sm={4}>
          <div style={{position:'relative', height:"800px", width:"100%"}}>
            <StockCard ticker={this.props.ticker} company_name={this.props.company_name} data={this.props.data} />
          </div>
        </Col>
      </Row>
    )
  }
}

export default StockView;
