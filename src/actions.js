export function searchStock(symbol) {
  console.log(symbol);
  return {
    type: "SEARCH_STOCK",
    symbol
  }
}