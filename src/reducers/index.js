const initialState = {
  symbol: "TWTR"
}

const searchFilter = (state = initialState, action) => {
  switch (action.type) {
    case 'SEARCH_STOCK':
      return Object.assign({}, state, {
        symbol:action.symbol
      })
    default:
      return state
  }
}

export default searchFilter