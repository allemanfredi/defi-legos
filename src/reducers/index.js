import { combineReducers } from 'redux'
import walletReducer from './wallet'
import buildStrategyReducer from './build-strategy'
import simulatorReducer from './simulator'
import generalReducer from './general'
import { reducer as toastrReducer } from 'react-redux-toastr'

const rootReducer = combineReducers({
  wallet: walletReducer,
  buildStrategy: buildStrategyReducer,
  simulator: simulatorReducer,
  general: generalReducer,
  toastr: toastrReducer
})

export default rootReducer
