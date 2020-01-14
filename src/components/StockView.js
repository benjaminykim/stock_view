import React from 'react';
import Chart from './Chart'
import Search from './Search'

function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var year = a.getFullYear() % 100;
  var month = a.getMonth() + 1;
  var date = a.getDate();
  var time = month + '/' + date + '/' + year;
  return time;
}

function generateData(finData) {
  var data = [];
  for (var i=0; i < finData.c.length; i++)
  {
    data.push({
      'close': finData.c[i],
      'high': finData.h[i],
      'low': finData.l[i],
      'open': finData.o[i],
      'time': timeConverter(finData.t[i]),
      'volume': finData.v[i]
    });
  }
  return (data);
}

class StockView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null,
      stockName: null,
      resolution: null,
      isDataLoaded: false,
    }
    this.base_url = 'https://finnhub.io/api/v1'
    this.candle_endpoint = '/stock/candle?'
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(record) {
    console.log(record);
    this.getStockCandle(record.key);
  }

  render() {
    return (
      <div style={{
        paddingBottom:'50%',
        position:'relative',
        height:0
      }}>
      <Chart data={this.state.data}/>
      <Search f={this.handleClick}/>
      </div>
    )
  }

  storeCandleData(data, name, resolution)
  {
    this.setState({
      data:generateData(data),
      stockName:name,
      resolution:resolution,
      isDataLoaded:true,
    });
  }

  getCandleUrl(name, count, resolution)
  {
    var url = this.base_url + this.candle_endpoint + "symbol=" + name + "&resolution=" + resolution +  "&count=" + count + "&token=boamq6vrh5rbii6a3j30"
    return (url);
  }

  getStockCandle(name="AAPL", count=200, resolution="D")
  {
    var url = this.getCandleUrl(name, count, resolution);
    console.log(url);
    fetch(url, {
      "method": "GET",
    })
    .then(response => response.json())
    .then(data => this.storeCandleData(data, name, resolution))
    .catch(err => {
      console.log(err);
    });
  }

  componentDidMount(){
    this.getStockCandle("TWTR", 200, "D");
  }
}

export default StockView;
