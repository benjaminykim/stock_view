import React from 'react';
import Chart from './HighChart'
import StockCard from './StockCard'
import { Row, Col } from 'react-bootstrap'

class StockView extends React.Component {
  render() {
    console.log("StockView Render");
    return (
      <Row>
        <Col sm={9}>
          <div style={{height:"800px", width:"100%"}}>
            <Chart ticker={this.props.ticker} data={this.props.data} volume={this.props.volume}/>
          </div>
        </Col>
        <Col sm={3}>
          <div style={{position:'relative', height:"800px", width:"100%"}}>
            <StockCard ticker={this.props.ticker} company_name={this.props.company_name} data={this.props.data} volume={this.props.volume[0]} />
          </div>
        </Col>
      </Row>
    )
  }
}

export default StockView;