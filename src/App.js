import React from 'react';
import './App.css';
import Stock from './components/Stock'
import Chart from './components/Chart'
import Search from './components/Search'

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

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null,
      stockName: null,
      resolution: null,
      isDataLoaded: false,
    }
  }

  render() {
    return (
      <div  className="stock-information"
            style={{
              paddingBottom: '50%',
              position:'relative',
              height:0
            }}>
        <Search/>
        <Stock name={this.state.stockName}/>
        <Chart data={this.state.data}/>
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

  getStockCandle(name="AAPL", count=200, resolution="D")
  {
    let url = 'https://finnhub-realtime-stock-price.p.rapidapi.com/stock/candle?count=' + count + '&symbol=' +name + '&resolution=' + resolution;
    console.log(url);
    fetch(url, {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "finnhub-realtime-stock-price.p.rapidapi.com",
        "x-rapidapi-key": "bfc0641820msh0bbab8db87079ebp145b2djsnc142f2e17a4d"
      }
    })
    .then(response => response.json())
    .then(data => this.storeCandleData(data, name, resolution))
    .catch(err => {
      console.log(err);
    });
  }

  componentDidMount(){
    this.getStockCandle("AAPL");
  }
}

export default App;
