import React from 'react'

const Stock = ({name}) => {
  return (
    <div  className="stock-title"
          style={{
            position:'relative',
            top:'0',
            left:'100px',
            width:'100%',
            height:'50px',
          }}>
      <center><h1>Stock View</h1></center>
      <div  className="stock-information">
        <h2 className="name">TICKER: {name}</h2>
      </div>
    </div>
  )
};

export default Stock
