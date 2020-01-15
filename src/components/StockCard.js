import React from 'react';

const StockCard = (props) => {
  console.log(props);
  console.log(props.stockName);
  console.log(props);
  return (
      <div>
        <p>Stock: {props.data.stockName}</p>
      </div>
  );
};

export default StockCard;
