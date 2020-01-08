import React from 'react';
import './App.css';
import { LineChart, Line, CartesianGrid, Tooltip, XAxis, YAxis, Legend } from 'recharts'
import Stock from './components/Stock'

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
      <div className="Information">
        <Stock name={this.state.stockName}/>
        {this.generateChart()}
      </div>
    )
  }

  generateChart() {
    if (this.state.isDataLoaded)
    {
      var data = this.generateData();
      return (
        <LineChart width={600} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="time"/>
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="close" stroke="#8884d8" />
          <Line type="monotone" dataKey="high" stroke="#34e5eb" />
          <Line type="monotone" dataKey="low" stroke="#eb34a8" />
          <Line type="monotone" dataKey="open" stroke="#59eb34" />
        </LineChart>
      )
    }
    return (
      <LineChart width={600} height={300}>
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis />
        <YAxis />
        <Tooltip/>
      </LineChart>
    )
  }

  timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var year = a.getFullYear() % 100;
    var month = a.getMonth() + 1;
    var date = a.getDate();
    var time = month + '/' + date + '/' + year;
    return time;
  }

  generateData() {
    var data = [];
    for (var i=0; i < this.state.data.c.length; i++)
    {
      data.push({
        'close': this.state.data.c[i],
        'high': this.state.data.h[i],
        'low': this.state.data.l[i],
        'open': this.state.data.o[i],
        'time': this.timeConverter(this.state.data.t[i]),
        'volume': this.state.data.v[i]
      });
    }
    return (data);
  }

  storeCandleData(data, name, resolution)
  {
    this.setState({
      data:data,
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
