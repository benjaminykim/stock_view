import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Stock from './components/Stock'
import Chart from './components/Chart'
import Search from './components/Search'
import StockView from './components/StockView'
import WatchlistView from './components/WatchlistView'
import MarketView from './components/MarketView'

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
      <div  className="stock-information">
        <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/" className="navbar-brand">Stock View</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Home</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/watchlist" className="nav-link">Watchlist</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/markets" className="nav-link">Markets</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br/>
          <Route path="/" exact component={StockView} />
          <Route path="/watchlist" component={WatchlistView} />
          <Route path="/markets" component={MarketView} />
        </div>
      </Router>
        <div  style={{
                paddingBottom: '50%',
                position:'relative',
                height:0
            }}>
          <Chart data={this.state.data}/>
          <Search f={this.handleClick}/>
        </div>
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
    this.getStockCandle("TWTR", 200, "D");
  }
}

export default App;
