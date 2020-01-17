import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container';
import { Navbar, Nav, Form, Button } from 'react-bootstrap';
import './App.css';
import StockView from './components/StockView'
import WatchlistView from './components/WatchlistView'
import MarketView from './components/MarketView'

const baseUrl = 'https://finnhub.io/api/v1';
const candleEndpoint = '/stock/candle?';
const profileEndpoint = '/stock/profile?';
const token = "&token=boamq6vrh5rbii6a3j30";

function getUrl(endpoint=candleEndpoint, symbol="TWTR", count=200, resolution="D")
{
  var url = baseUrl + endpoint;
  if (endpoint === candleEndpoint) {
    url += "symbol=" + symbol + "&resolution=" + resolution +  "&count=" + count;
  } else if (endpoint === profileEndpoint) {
    url += "symbol=" + symbol;
  }
  url += token;
  return (url);
}

function generateData(finData) {
  var data = [];
  for (var i=0; i < finData.c.length; i++)
  {
    data.push([
      finData.t[i] * 1000,
      finData.o[i],
      finData.h[i],
      finData.l[i],
      finData.c[i],
      finData.v[i]
    ]);
  }
  return (data);
}

function generateVolumeData(finData) {
  var data = [];
  for (var i=0; i < finData.c.length; i++)
  {
    data.push([
      finData.t[i] * 1000,
      finData.v[i]
    ]);
  }
  return (data);
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      symbol: "TWTR",
      data: [],
      volume: [],
      isDataLoaded:false,
      resolution:'',
      name:'TWITTER INC',
      profile:null
    };

    var search_field = '';
  }

  handleChange = (e) => {
    this.search_field = e.target.value.toUpperCase();
  }

  handleEnter = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (this.search_field !== this.state.symbol) {
        this.getStockInformation(this.search_field, 200, "D");
      }
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.search_field !== this.state.symbol) {
      this.getStockInformation(this.search_field, 200, "D");
    }
  }

  storeCandleData(data, symbol, resolution)
  {
    if (data.s === "ok") {
      this.setState({
        data:generateData(data),
        volume:generateVolumeData(data),
        symbol:symbol,
        resolution:resolution,
        isDataLoaded:true,
      });
    } else {
      console.log("invalid user input");
      this.setState({ isDataLoaded:false });
    }
  }

  storeStockProfile(data) {
    if (this.state.isDataLoaded) {
      this.setState({ profile:data, name:data.name });
    }
  }

  getStockCandle(symbol="TWTR", count=200, resolution="D")
  {
    var url = getUrl(candleEndpoint, symbol, count, resolution);
    console.log("Fetch Company Candle: ", url);
    fetch(url, { "method": "GET" })
    .then(response => response.json())
    .then(data => this.storeCandleData(data, symbol, resolution))
    .catch(err => console.log(err));
  }

  getStockProfile(symbol="TWTR")
  {
    var url = getUrl(profileEndpoint, symbol);
    console.log("Fetch Company Profile: ", url);
    fetch(url, { "method": "GET" })
    .then(response => response.json())
    .then(data => this.storeStockProfile(data))
    .catch(err => console.log(err));
  }

  getStockInformation(symbol="TWTR", count=200, resolution="D") {
    this.getStockCandle(symbol, count, resolution);
    this.getStockProfile(symbol);
  }

  componentDidMount(){
    this.getStockInformation();
  }

  renderStockView(){
    if (this.state.isDataLoaded) {
      return (<StockView props={this.state} />);
    }
  }

  render() {
    return (
        <Router>
        <Container fluid>
          <Navbar hover bg="dark" expand="lg" variant="dark" sticky="top">
            <Navbar.Brand style={{color:"#20c94d"}}href="/stock_view">stock_view</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/stock_view">Home</Nav.Link>
                <Nav.Link href="/stock_view/watchlist">Watchlist</Nav.Link>
                <Nav.Link href="/stock_view/markets">Markets</Nav.Link>
              </Nav>
              <Form inline >
                <Form.Control size="sm" type="text" placeholder="TWTR" className="mr-sm-2" onChange={this.handleChange} onKeyPress={this.handleEnter} onSubmit={this.handleSubmit}/>
                <Button size="sm" variant="outline-success" onClick={this.handleSubmit} >Search</Button>
              </Form>
            </Navbar.Collapse>
          </Navbar>
          <br/>
          <Route
							exact
							path='/stock_view'
							render={(props) => (
								<React.Fragment>
                  { this.renderStockView() }
								</React.Fragment>
							)}
						/>
          <Route exact path="/stock_view/watchlist" component={WatchlistView} />
          <Route exact path="/stock_view/markets" component={MarketView} />
        </Container>
      </Router>
    )
  }
}

export default App;