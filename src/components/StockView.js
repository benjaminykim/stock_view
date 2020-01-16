import React from 'react';
import Chart from './Chart'
import StockCard from './StockCard'
import { Row, Col} from 'react-bootstrap'


class StockView extends React.Component {
  render() {
    console.log("StockView Render");
    return (
      <Row>
        <Col sm={8}>
          <div style={{height:"800px", width:"100%"}}>
          <Chart data={this.props.data}/>
          </div>
        </Col>
        <Col sm={4}>
          <div style={{position:"absolute", top:"19px", width:"80%"}}>
            <StockCard data={this.props.name}/>
          </div>
        </Col>
      </Row>
    )
  }
}

export default StockView;
