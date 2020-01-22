import {  SEARCH_STOCK,
          FETCH_STOCK,
          REQUEST_STOCK,
          RECEIVE_STOCK,
          RECEIVE_PROFILE} from '../actions';

const initialState = {
  symbol: '',
  data: {
    open:[],
    high:[],
    close:[],
    low:[]
  },
  volume: [],
  isFetching:false,
  resolution:'',
  name:'',
  description:'',
  isDataLoaded:false
}

function generateData(finData) {
  var data = [];
  for (var i=0; i < finData.c.length; i++)
  {
    data.push([
      finData.t[i] * 1000,
      finData.o[i],
      finData.h[i],
      finData.l[i],
      finData.c[i]
    ]);
  }
  return (data);
}

function generateVolumeData(finData) {
  var data = [];
  for (var i=0; i < finData.c.length; i++)
  {
    data.push([
      finData.t[i] * 1000,
      finData.v[i]
    ]);
  }
  return (data);
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
        data: generateData(action.data),
        volume: generateVolumeData(action.data),
        isDataLoaded: true
      })
    case RECEIVE_PROFILE:
      return Object.assign({}, state, {
        name: action.name,
        description: action.description
      })
    default:
      return state;
  }
}

export default rootReducer;