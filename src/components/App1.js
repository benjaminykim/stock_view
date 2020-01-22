import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container';
import { Navbar, Nav, Form, Button } from 'react-bootstrap';
import '../App.css';
import StockView from '../containers/StockView'
import WatchlistView from './WatchlistView'
import MarketView from './MarketView'

class App extends React.Component {
  render() {
    store.dispatch()
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
                <Form.Control size="sm" type="text" placeholder="TWTR" className="mr-sm-2" />
                <Button size="sm" variant="outline-success">Search</Button>
              </Form>
            </Navbar.Collapse>
          </Navbar>
          <br/>
          <Route exact path="/stock_view" component={StockView} />
          <Route exact path="/stock_view/watchlist" component={WatchlistView} />
          <Route exact path="/stock_view/markets" component={MarketView} />
        </Container>
      </Router>
    )
  }
}

export default App;