import React from 'react'
import { LineChart, Line, ResponsiveContainer, CartesianGrid, Tooltip, XAxis, YAxis, Legend} from 'recharts'

const StockToolTip = ({ active, payload, label }) => {
  if (active && payload) {
    return (
      <div className="custom-tooltip">
        <p>{`date  : ${payload[0].payload.time}`}</p>
        <p>{`close : $${payload[0].payload.close}`}</p>
        <p>{`high  : $${payload[0].payload.high}`}</p>
        <p>{`low   : $${payload[0].payload.low}`}</p>
        <p>{`open  : $${payload[0].payload.open}`}</p>
        <p>{`volume: ${payload[0].payload.volume}`}</p>
      </div>
    );
  }
  return null;
};

function renderLines(data, o, h, c, l) {
  return (
    <Line type="monotone" dataKey="close" stroke="#8884d8" dot={false}/>
  )
}

function Chart(props) {
  console.log("chart: ", props.data);
  return (
    <ResponsiveContainer width="100%" height={700}>
      <LineChart data={props.data} margin={{ top: 20, left:0, right:50, bottom: 20}} >
        <CartesianGrid strokeDashArray="3 3" />
        <XAxis dataKey="time" tickCount={5} />
        <YAxis type="number" domain={['auto', 'auto']} />
        {/*<Tooltip content={<StockToolTip />} />*/}
        <Tooltip />
        <Legend />
        { renderLines(props.data, false, false, true, false) }
      </LineChart>
    </ResponsiveContainer>
  )
};

export default Chart
