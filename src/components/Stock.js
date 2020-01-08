import React from 'react'

const Stock = ({name}) => {
  return (
    <div>
      <center><h1>Stock View</h1></center>
      <div className="stock-information">
        <h2 className="name">TICKER: {name}</h2>
      </div>
    </div>
  )
};

export default Stock
