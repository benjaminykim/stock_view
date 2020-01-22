import { SEARCH_STOCK, FETCH_STOCK } from '../actions';

const initialState = {
  symbol: "TWTR",
  data: [0, 1, 2, 3, 4, 5],
  volume: [6, 7],
  isDataLoaded:false,
  resolution:'',
  name:'TWITTER INC',
  description:''
}

function  rootReducer(
  state=initialState,
  action=FETCH_STOCK
) {
  switch (action.type) {
    case SEARCH_STOCK:
      return Object.assign({}, state, {
        symbol: action.symbol
      })
    case FETCH_STOCK:
      
    default:
      return state;
  }
}

export default rootReducer;