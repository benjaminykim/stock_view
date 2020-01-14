import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import StockView from './components/StockView'
import WatchlistView from './components/WatchlistView'
import MarketView from './components/MarketView'

class App extends React.Component {
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
      </div>
    )
  }
}

export default App;
