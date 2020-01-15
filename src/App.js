import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import './App.css';
import StockView from './components/StockView'
import WatchlistView from './components/WatchlistView'
import MarketView from './components/MarketView'

class App extends React.Component {
  render() {
    return (
      <div  className="stock-information" >
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
              <Form inline>
                <FormControl type="text" placeholder="AAPL" className="mr-sm-2" />
                <Button variant="outline-success">Search</Button>
              </Form>
            </Navbar.Collapse>
          </Navbar>
          <br/>
          <Route path="/stock_view" exact component={StockView} />
          <Route path="/watchlist" component={WatchlistView} />
          <Route path="/markets" component={MarketView} />
        </Container>
      </Router>
      </div>
    )
  }
}

export default App;
