import { WALLET_CONNECTED, WALLET_DISCONNECTED, WALLET_ACCOUNT_CHANGED } from '../constants'
const middleware = ({ dispatch }) => {
  return _next => {
    return _action => {
      const { type, payload } = _action

      if (type === WALLET_CONNECTED || type === WALLET_ACCOUNT_CHANGED) {
        const { account, provider, chainId } = payload

        if (chainId === 1 || type === WALLET_ACCOUNT_CHANGED) {
          // TODO
        }
      }

      if (type === WALLET_DISCONNECTED) {
        // TODO
      }
      return _next(_action)
    }
  }
}

export { middleware }
