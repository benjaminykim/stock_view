import { SEARCH_STOCK } from '../actions';

function  rootReducer(
  state={
    symbol: "TWTR",
    data: []
  },
  action
) {
  switch (action.type) {
    case SEARCH_STOCK:
      return Object.assign({}, state, {
        symbol: action.symbol
      })
    default:
      return state;
  }
}

export default rootReducer;