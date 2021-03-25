import { combineReducers } from 'redux'
import walletReducer from './wallet'
import buildStrategyReducer from './build-strategy'
import simulatorReducer from './simulator'
import { reducer as toastrReducer } from 'react-redux-toastr'

const rootReducer = combineReducers({
  wallet: walletReducer,
  buildStrategy: buildStrategyReducer,
  simulator: simulatorReducer,
  toastr: toastrReducer
})

export default rootReducer
