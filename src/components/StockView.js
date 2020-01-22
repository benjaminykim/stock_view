import React from 'react';
import { Row, Col } from 'react-bootstrap'
import { Button, Card, Table } from 'react-bootstrap'
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import DarkUnica from 'highcharts/themes/dark-unica';

DarkUnica(Highcharts);

function getOptions(ohlc, volume, ticker) {
  return ({
    yAxis: [{
      labels: {
          align: 'left'
      },
      height: '80%',
      resize: {
          enabled: true
      }
      }, {
      labels: {
          align: 'left'
      },
      top: '80%',
      height: '20%',
      offset: 0
    }],
    tooltip: {
      shape: 'square',
      headerShape: 'callout',
      borderWidth: 0,
      shadow: false,
      positioner: function (width, height, point) {
          var chart = this.chart,
              position;

          if (point.isHeader) {
              position = {
                  x: Math.max(
                      // Left side limit
                      chart.plotLeft,
                      Math.min(
                          point.plotX + chart.plotLeft - width / 2,
                          // Right side limit
                          chart.chartWidth - width - chart.marginRight
                      )
                  ),
                  y: point.plotY
              };
          } else {
              position = {
                  x: point.series.chart.plotLeft,
                  y: point.series.yAxis.top - chart.plotTop
              };
          }

          return position;
      }
    },
    series: [{
      type: 'ohlc',
      id: 'aapl-ohlc',
      name: ticker + ' Stock Price',
      data: ohlc
    }, {
      type: 'column',
      id: ticker + '-volume',
      name: ticker + ' Volume',
      data: volume,
      yAxis: 1
    }],
    responsive: {
      rules: [{
          condition: {
              maxWidth: 800
          },
          chartOptions: {
              rangeSelector: {
                  inputEnabled: false
              }
          }
      }]
    }
  });
}

const StockView = (props) => {
  console.log("StockView props: ", props);
  if (props.isDataLoaded) {
  return (
    <Row>
      <Col sm={9}>
        <div style={{height:"100%", width:"100%"}}>
            <HighchartsReact
              highcharts={Highcharts}
              constructorType={'stockChart'}
              options={getOptions(props.data, props.volume, props.symbol)}
            />
        </div>
      </Col>
      <Col sm={3}>
        <div style={{position:'relative', height:"100%", width:"100%"}}>
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
              <Table striped bordered variant="dark">
                <tbody>
                  <tr>
                    <td>Ticker</td>
                    <td>{props.symbol}</td>
                  </tr>
                  <tr>
                    <td>Open </td>
                    <td>${ props.data[0][1] }</td>
                  </tr>
                  <tr>
                    <td>Close </td>
                    <td>${ props.data[0][4] }</td>
                  </tr>
                  <tr>
                    <td>High </td>
                    <td>${ props.data[0][2] }</td>
                  </tr>
                  <tr>
                    <td>Low </td>
                    <td>${ props.data[0][3] }</td>
                  </tr>
                  <tr>
                    <td>Volume</td>
                    <td>{ props.volume[0][1] }</td>
                  </tr>
                </tbody>
              </Table>
              <p>{ props.description }</p>
            </Card.Body>
          </Card>
        </div>
      </Col>
    </Row>
  )}
  return (<div></div>)
}

export default StockView;