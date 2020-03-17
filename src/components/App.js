import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import '../App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Navbar, Nav, Container } from 'react-bootstrap';
import StockContainer from '../containers/StockContainer';
import Search from '../containers/Search';
import WatchList from './WatchList';

class App extends React.Component {
  render() {
    return (
        <Router>
        <Container fluid>
          <Navbar hover="true" style={{backgroundColor:"#3d4147"}} expand="lg" variant="dark" sticky="top">
            <Navbar.Brand style={{color:"#20c94d"}}href="/stock_view">stock_view</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/stock_view">Home</Nav.Link>
                <Nav.Link href="/watchlist">Watchlist</Nav.Link>
              </Nav>
              <Search/>
            </Navbar.Collapse>
          </Navbar>
          <br/>
          <Route exact path="/stock_view" component={StockContainer} />
          <Route exact path="/watchlist" component={WatchList} />
        </Container>
      </Router>
    )
  }
}

export default App;