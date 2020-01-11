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
  var add = [];
  var ret = [];
  for (var i=1; i < res.length; i++)
  {
    add = res[i].split('|');
    stock_ticker = add[0];
    company_name = add[1];
    if (company_name && company_name.indexOf('-') !== -1) {
      company_name = company_name.substr(0, company_name.indexOf('-') - 1);
    }
    ret.push({
      key:stock_ticker,
      value:company_name
    });
  }
  return (ret);
}

function Search(props) {
  var data = getData();
  return (
    <div  className="search-bar"
          style={{
            position:'relative',
            left:"70%",
            width:"30%"
          }}>
      <ReactSearchBox
              placeholder=""
              value="AAPL"
              data={data}
              onSelect={props.f}
      />
    </div>
  )
}

export default Search;
