import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Container } from 'react-bootstrap';
import '../App.css';
import StockView from '../containers/StockView';
import Search from '../containers/Search';

class App extends React.Component {
  render() {
    return (
        <Router>
        <Container fluid>
          <Navbar hover style={{backgroundColor:"#3d4147"}} expand="lg" variant="dark" sticky="top">
            <Navbar.Brand style={{color:"#20c94d"}}href="/stock_view">stock_view</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/stock_view">Home</Nav.Link>
              </Nav>
              <Search/>
            </Navbar.Collapse>
          </Navbar>
          <br/>
          <Route exact path="/stock_view" component={StockView} />
        </Container>
      </Router>
    )
  }
}

export default App;