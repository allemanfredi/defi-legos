import { WALLET_CONNECTED, WALLET_DISCONNECTED, SMART_ACCOUNTS_LOADED, WALLET_ACCOUNT_CHANGED } from '../constants'
import DSA from 'dsa-sdk'
import Web3 from 'web3'
import store from '../store'

const middleware = ({ dispatch }) => {
  return _next => {
    return async _action => {
      const { type, payload } = _action

      if (type === WALLET_CONNECTED) {
        const { account, provider } = payload
        const web3 = new Web3(provider)
        const dsa = new DSA(web3)
        const smartAccounts = await dsa.getAccounts(account)
        dispatch({
          type: SMART_ACCOUNTS_LOADED,
          payload: {
            smartAccounts
          }
        })
      }

      if (type === WALLET_ACCOUNT_CHANGED) {
        const { account } = payload
        const provider = store.getState().wallet.provider
        const web3 = new Web3(provider)
        const dsa = new DSA(web3)
        const smartAccounts = await dsa.getAccounts(account)
        dispatch({
          type: SMART_ACCOUNTS_LOADED,
          payload: {
            smartAccounts
          }
        })
      }

      if (type === WALLET_DISCONNECTED) {
        // TODO
      }
      return _next(_action)
    }
  }
}

export { middleware }
