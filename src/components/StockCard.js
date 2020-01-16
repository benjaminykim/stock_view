import React from 'react';

const StockCard = (props) => {
  return (
      <div>
        <p>Stock: {props.data.stockName}</p>
      </div>
  );
};

export default StockCard;
