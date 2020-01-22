import React from 'react'
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

const Chart = (props) => {
  console.log('props', props)
  if (props.isDataLoaded) {
  return (<HighchartsReact
    highcharts={Highcharts}
    constructorType={'stockChart'}
    options={getOptions(props.data, props.volume, props.symbol)}
  />)
  } else {
    return (<div></div>)
  }
};

export default Chart;