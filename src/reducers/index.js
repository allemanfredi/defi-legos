import { combineReducers } from 'redux'
import walletReducer from './wallet'
import buildStrategyReducer from './build-strategy'

const rootReducer = combineReducers({
  wallet: walletReducer,
  buildStrategy: buildStrategyReducer
})

export default rootReducer
