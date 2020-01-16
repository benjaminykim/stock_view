import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import './App.css';
import StockView from './components/StockView'
import WatchlistView from './components/WatchlistView'
import MarketView from './components/MarketView'

const base_url = 'https://finnhub.io/api/v1';
const candle_endpoint = '/stock/candle?';

function getCandleUrl(name, count, resolution)
{
  var url = base_url + candle_endpoint + "symbol=" + name + "&resolution=" + resolution +  "&count=" + count + "&token=boamq6vrh5rbii6a3j30"
  return (url);
}

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
    super(props);
    this.state = {
      search_field: '',
      stock_name: "TWTR",
      data: [],
      isDataLoaded:false,
      resolution:''
    };

    var search_field = '';
  }

  handleChange = (e) => {
    console.log("App.handleChange: ", e.target.value);
    this.search_field = e.target.value;
  }

  handleSubmit = (e) => {
    if (this.search_field !== this.state.stock_name) {
      this.getStockCandle(this.search_field, 200, "D");
    }
  }

  storeCandleData(data, name, resolution)
  {
    if (data.s === "ok") {
      this.setState({
        data:generateData(data),
        stock_name:name,
        resolution:resolution,
        isDataLoaded:true,
      });
    } else {
      console.log("invalid user input");
    }
  }

  getStockCandle(name="TWTR", count=200, resolution="D")
  {
    var url = getCandleUrl(name, count, resolution);
    console.log("fetching: ", url);
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
    this.getStockCandle(this.state.stock_name, 200, "D");
  }

  render() {
    return (
        <Router>
        <Container fluid="true">
          <Navbar bg="light" expand="lg" sticky="top">
            <Navbar.Brand href="/stock_view">stock_view</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/stock_view">Home</Nav.Link>
                <Nav.Link href="/watchlist">Watchlist</Nav.Link>
                <Nav.Link href="/markets">Markets</Nav.Link>
              </Nav>
              <Form inline onSubmit={this.handleSubmit}>
                <FormControl type="text" placeholder="TWTR" className="mr-sm-2" onChange={this.handleChange} />
                <Button variant="outline-success" onClick={this.handleSubmit} >Search</Button>
              </Form>
            </Navbar.Collapse>
          </Navbar>
          <br/>
          <Route
							exact
							path='/stock_view'
							render={(props) => (
								<React.Fragment>
                  <StockView name={this.state.stock_name} data={this.state.data} />
								</React.Fragment>
							)}
						/>
          <Route path="/watchlist" component={WatchlistView} />
          <Route path="/markets" component={MarketView} />
        </Container>
      </Router>
    )
  }
}

export default App;