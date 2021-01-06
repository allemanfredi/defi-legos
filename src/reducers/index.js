import { combineReducers } from 'redux'
import walletReducer from './wallet'
import headerReducer from './header'

const rootReducer = combineReducers({
  wallet: walletReducer,
  header: headerReducer
})

export default rootReducer
