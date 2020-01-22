export const SEARCH_STOCK = "SEARCH_STOCK";
export const REQUEST_STOCK = "REQUEST_STOCK";
export const RECEIVE_STOCK = "RECEIVE_STOCK";
export const FETCH_STOCK = "FETCH_STOCK";
export const ADD_STOCK = "ADD_STOCK";

export function searchStock(symbol) {
  console.log(symbol);
  return {
    type: "SEARCH_STOCK",
    symbol
  }
}

function requestStock(symbol) {
  return {
    type: "REQUEST_STOCK",
    symbol
  }
}

function receiveStock(symbol, data) {
  return {
    type: "RECEIVE_STOCK",
    symbol,
    data: data
  }
}

export function addStock(symbol) {
  return {
    type: "ADD_STOCK",
    symbol
  }
}

const baseUrl = 'https://finnhub.io/api/v1';
const candleEndpoint = '/stock/candle?';
const profileEndpoint = '/stock/profile?';
const token = "&token=boamq6vrh5rbii6a3j30";

function getUrl(endpoint=candleEndpoint, symbol="TWTR", count=200, resolution="D")
{
  var url = baseUrl + endpoint;
  if (endpoint === candleEndpoint) {
    url += "symbol=" + symbol + "&resolution=" + resolution +  "&count=" + count;
  } else if (endpoint === profileEndpoint) {
    url += "symbol=" + symbol;
  }
  url += token;
  return (url);
}

export function fetchStock(symbol) {
  console.log("actions: ", symbol);
  return function(dispatch) {
    dispatch(requestStock(symbol));
    var url = getUrl(candleEndpoint, symbol);
    console.log(url);
    return fetch(url)
      .then(
        response => response.json(),
        error => console.log("ERROR: ", error)
      )
      .then(data => dispatch(receiveStock(symbol, data)));
  }
}