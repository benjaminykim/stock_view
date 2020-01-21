export const SEARCH_STOCK = "SEARCH_STOCK";

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
export function fetchStock(symbol) {
  return function(dispatch) {
    dispatch(requestStock(symbol));
    var url = "A"
    return fetch(url)
      .then(
        response => response.json(),
        error => console.log("ERROR: ", error)
      )
      .then(data => receiveStock(symbol, data));
  }
}