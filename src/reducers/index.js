import { SEARCH_STOCK } from '../actions';

const initialState = {
  symbol: "TWTR",
  data: [0, 1, 2, 3, 4, 5],
  volume: [6, 7],
  isDataLoaded:false,
  resolution:'',
  name:'TWITTER INC',
  profile:null
}

function  rootReducer(
  state=initialState,
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