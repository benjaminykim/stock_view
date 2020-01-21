import { connect } from 'react-redux'
import StockView1 from '../components/StockView'
import { addStock } from '../actions'

const mapStateToProps = state => {
  return {
    data: state.data
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