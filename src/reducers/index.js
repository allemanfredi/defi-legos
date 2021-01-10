import { combineReducers } from 'redux'
import walletReducer from './wallet'
import buildStrategyReducer from './build-strategy'
import { reducer as toastrReducer } from 'react-redux-toastr'

const rootReducer = combineReducers({
  wallet: walletReducer,
  buildStrategy: buildStrategyReducer,
  toastr: toastrReducer
})

export default rootReducer
