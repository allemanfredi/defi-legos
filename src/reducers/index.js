import { combineReducers } from 'redux'
import walletReducer from './wallet'
import headerReducer from './header'
import buildStrategyReducer from './build-strategy'

const rootReducer = combineReducers({
  wallet: walletReducer,
  header: headerReducer,
  buildStrategy: buildStrategyReducer
})

export default rootReducer
