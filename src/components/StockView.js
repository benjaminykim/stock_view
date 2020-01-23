import React from 'react';
import { Row, Col } from 'react-bootstrap'
import { Button, Card, Accordion } from 'react-bootstrap'
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

const color="#3d4147";
Highcharts.theme = {
  colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066',
      '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
  chart: {
      backgroundColor: {
          linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
          stops: [
              [0, '#4c5159'],
              [1, color]
          ]
      },
      style: {
          fontFamily: '\'Unica One\', sans-serif'
      },
      plotBorderColor: '#606063'
  },
  title: {
      style: {
          color: '#E0E0E3',
          textTransform: 'uppercase',
          fontSize: '20px'
      }
  },
  subtitle: {
      style: {
          color: '#E0E0E3',
          textTransform: 'uppercase'
      }
  },
  xAxis: {
      gridLineColor: '#707073',
      labels: {
          style: {
              color: '#E0E0E3'
          }
      },
      lineColor: '#707073',
      minorGridLineColor: '#505053',
      tickColor: '#707073',
      title: {
          style: {
              color: '#A0A0A3'
          }
      }
  },
  yAxis: {
      gridLineColor: '#707073',
      labels: {
          style: {
              color: '#E0E0E3'
          }
      },
      lineColor: '#707073',
      minorGridLineColor: '#505053',
      tickColor: '#707073',
      tickWidth: 1,
      title: {
          style: {
              color: '#A0A0A3'
          }
      }
  },
  tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      style: {
          color: '#F0F0F0'
      }
  },
  plotOptions: {
      series: {
          dataLabels: {
              color: '#F0F0F3',
              style: {
                  fontSize: '13px'
              }
          },
          marker: {
              lineColor: '#333'
          }
      },
      boxplot: {
          fillColor: '#505053'
      },
      candlestick: {
          lineColor: 'white'
      },
      errorbar: {
          color: 'white'
      }
  },
  legend: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      itemStyle: {
          color: '#E0E0E3'
      },
      itemHoverStyle: {
          color: '#FFF'
      },
      itemHiddenStyle: {
          color: '#606063'
      },
      title: {
          style: {
              color: '#C0C0C0'
          }
      }
  },
  credits: {
      style: {
          color: '#666'
      }
  },
  labels: {
      style: {
          color: '#707073'
      }
  },
  drilldown: {
      activeAxisLabelStyle: {
          color: '#F0F0F3'
      },
      activeDataLabelStyle: {
          color: '#F0F0F3'
      }
  },
  navigation: {
      buttonOptions: {
          symbolStroke: '#DDDDDD',
          theme: {
              fill: '#505053'
          }
      }
  },
  // scroll charts
  rangeSelector: {
      buttonTheme: {
          fill: '#505053',
          stroke: '#000000',
          style: {
              color: '#CCC'
          },
          states: {
              hover: {
                  fill: '#707073',
                  stroke: '#000000',
                  style: {
                      color: 'white'
                  }
              },
              select: {
                  fill: '#000003',
                  stroke: '#000000',
                  style: {
                      color: 'white'
                  }
              }
          }
      },
      inputBoxBorderColor: '#505053',
      inputStyle: {
          backgroundColor: '#333',
          color: 'silver'
      },
      labelStyle: {
          color: 'silver'
      }
  },
  navigator: {
      handles: {
          backgroundColor: '#666',
          borderColor: '#AAA'
      },
      outlineColor: '#CCC',
      maskFill: 'rgba(255,255,255,0.1)',
      series: {
          color: '#7798BF',
          lineColor: '#A6C7ED'
      },
      xAxis: {
          gridLineColor: '#505053'
      }
  },
  scrollbar: {
      barBackgroundColor: '#808083',
      barBorderColor: '#808083',
      buttonArrowColor: '#CCC',
      buttonBackgroundColor: '#606063',
      buttonBorderColor: '#606063',
      rifleColor: '#FFF',
      trackBackgroundColor: '#404043',
      trackBorderColor: '#404043'
  }
};
Highcharts.setOptions(Highcharts.theme);

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
    highchartsBackground: "#9427d6",
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

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const StockView = (props) => {
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
      </Col>
    </Row>
  )}
  return (<div></div>)
}

export default StockView;