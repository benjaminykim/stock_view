import React from 'react'
import { LineChart, Line, ResponsiveContainer, CartesianGrid, Tooltip, XAxis, YAxis, Legend} from 'recharts'


const StockToolTip = ({ active, payload, label }) => {
  if (active) {
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

const Chart = ({data}) => {

  if (data)
  {
    return (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width="100%"
            height="100%"
            data={data}
            margin={{ top: 20, left: 20, right:20, bottom: 20}}
          >
            <CartesianGrid strokeDashArray="3 3" />
            <XAxis
              dataKey="time"
              tickCount={5}
            >
        </XAxis>
            <YAxis
              type="number"
              domain={['auto', 'auto']}
            />
            <Tooltip content={<StockToolTip />}/>
            <Legend />
            <Line type="monotone" dataKey="close" stroke="#8884d8" dot={false}/>
            <Line type="monotone" dataKey="high" stroke="#34e5eb" dot={false}/>
            <Line type="monotone" dataKey="low" stroke="#eb34a8" dot={false}/>
            <Line type="monotone" dataKey="open" stroke="#59eb34" dot={false}/>
          </LineChart>
        </ResponsiveContainer>
    )
  }
  else
  {
    return (
        <ResponsiveContainer width={700} height="80%">
          <LineChart width="100%" height="100%" data={data}>
            <CartesianGrid strokeDashArray="3 3" />
            <XAxis dataKey="time" tickCount={5}/>
            <YAxis type="number" domain={['auto', 'auto']} />
            <Tooltip />
            <Legend />
          </LineChart>
        </ResponsiveContainer>
    )
  }
};

export default Chart
