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

function  getData() {
  var data = loadFile('https://raw.githubusercontent.com/benjaminykim/stock_view/master/public/stock_listed.txt');
  var res = data.split('\n');
  var stock_ticker;
  var company_name;
  var add;
  var ret = [];
  for (var i=1; i < res.length; i++)
  {
    add = res[i];
    stock_ticker = add.substr(0, add.indexOf('|') - 1);
    company_name = add.substr(add.indexOf('|') + 1, add.indexOf('-') - 1);
    ret.push({
      key:stock_ticker,
      value:company_name});
  }
  console.log(ret);
  return (ret);
}


const Search = () => {
  var data = getData();
  return (
    <ReactSearchBox
            placeholder=""
            value="AAPL"
            data={data}
            callback={record => console.log(record)}
          />)
}

export default Search;
