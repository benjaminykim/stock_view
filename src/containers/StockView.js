import { connect } from 'react-redux'
import StockView1 from '../components/StockView'
import { addStock } from '../actions'

const mapStateToProps = state => {
  console.log(state)
  return {
    symbol: state.symbol,
    name: state.name,
    description: state.description,
    data: state.data,
    volume: state.volume,
    isDataLoaded: state.isDataLoaded
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onClick: symbol => {
      dispatch(addStock(symbol))
    }
  }
}

const StockContainer = connect(
  mapStateToProps,
  mapDispatchToProps
) (StockView1)

export default StockContainer