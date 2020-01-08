import React from 'react';
import 'App.css';
import { LineChart, Line, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts'
import Stock from 'components/Stock'

function generateChart(data) {
  var index = 0;
  data = data.map(item => {
    index++;
    return {"index":index, "value":item};
  });
  return (
    <LineChart width={600} height={300} data={data}>
      <Line type="monotone" dataKey="value" stroke="#8884d8" />
      <CartesianGrid strokeDasharray="3 3"/>
      <XAxis dataKey="index"/>
      <YAxis dataKey="value"/>
      <Tooltip/>
    </LineChart>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      c: [],
      h: [],
      l: [],
      o: [],
      s: [],
      t: [],
      v: [],
      stockName: null,
    }
  }

  render() {
    return (
      <div className="Information">
        <Stock name={this.state.stockName}/>
        {generateChart(this.state.c)}
      </div>
    )
  }

  storeCandleData(data, name)
  {
    this.setState({
      c:data.c,
      h:data.h,
      l:data.l,
      o:data.o,
      s:data.s,
      t:data.t,
      v:data.v,
      stockName:name,
    });
  }

  getStockCandle(name="AAPL")
  {
    let url = 'https://finnhub-realtime-stock-price.p.rapidapi.com/stock/candle?count=200&symbol=' +name + "&resolution=D";
    console.log(url);
    fetch(url, {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "finnhub-realtime-stock-price.p.rapidapi.com",
        "x-rapidapi-key": "bfc0641820msh0bbab8db87079ebp145b2djsnc142f2e17a4d"
      }
    })
    .then(response => response.json())
    .then(data => this.storeCandleData(data, name))
    .catch(err => {
      console.log(err);
    });
  }

  componentDidMount(){
    this.getStockCandle("AAPL");
  }
}

export default App;
