import {  SEARCH_STOCK,
          FETCH_STOCK,
          REQUEST_STOCK,
          RECEIVE_STOCK} from '../actions';

const initialState = {
  symbol: "TWTR",
  data: [],
  isFetching:false,
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
    case REQUEST_STOCK:
      return Object.assign({}, state, {
        symbol: action.symbol,
        isFetching: true
      })
    case RECEIVE_STOCK:
      return Object.assign({}, state, {
        isFetching: false,
        data: action.data
      })
    default:
      return state;
  }
}

export default rootReducer;