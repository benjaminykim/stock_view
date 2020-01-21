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
    data: data,
    receivedAt: Data.now()
  }
}
export function fetchStock(symbol) {
  return function(dispatch) {
    dispatch(requestStock(symbol));
    return fetch(url)
      .then(
        response => response.json(),
        error => console.log("ERROR: ", error)
      )
      .then(data => receiveStock(symbol, data));
  }
}