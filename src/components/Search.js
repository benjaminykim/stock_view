import React from 'react';
import ReactSearchBox from 'react-search-box'

function loadFile(filePath) {
  var result = null;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", filePath, false);
  xmlhttp.send();
  if (xmlhttp.status===200) {
    result = xmlhttp.responseText;
  }
  return result;
}


const Search = () => {
  var data = loadFile('./public/stock_listed.txt');
  console.log(data);
  return (
    <ReactSearchBox
            placeholder=""
            value="AAPL"
            data={data}
            callback={record => console.log(record)}
          />)
}

export default Search;
