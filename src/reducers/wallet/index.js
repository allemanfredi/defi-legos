import { WALLET_CONNECTED, WALLET_DISCONNECTED, WALLET_CHAIN_CHANGED, WALLET_ACCOUNT_CHANGED } from '../../constants'

const initialState = {
  account: null,
  chainId: null,
  isConnected: false,
  provider: null
}

const walletReducer = (_state = initialState, _action) => {
  const { payload, type } = _action

  if (type === WALLET_CONNECTED) {
    return Object.assign({}, _state, {
      account: payload.account,
      isConnected: true,
      provider: payload.provider,
      chainId: payload.chainId
    })
  }

  if (type === WALLET_DISCONNECTED) {
    return Object.assign({}, _state, {
      account: null,
      isConnected: false
    })
  }

  if (type === WALLET_CHAIN_CHANGED) {
    return Object.assign({}, _state, {
      chainId: payload.chainId
    })
  }

  if (type === WALLET_ACCOUNT_CHANGED) {
    return Object.assign({}, _state, {
      account: payload.account
    })
  }

  return _state
}

export default walletReducer
