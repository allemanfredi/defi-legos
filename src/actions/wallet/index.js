import { WALLET_CONNECTED, WALLET_DISCONNECTED, WALLET_CHAIN_CHANGED, WALLET_ACCOUNT_CHANGED } from '../../constants'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import Web3 from 'web3'

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: process.env.REACT_APP_INFURA_ID
    }
  }
}

const web3Modal = new Web3Modal({
  network: 'mainnet',
  providerOptions
})
web3Modal.clearCachedProvider()

const connectWallet = () => {
  return async _dispatch => {
    try {
      const provider = await web3Modal.connect()
      if (provider) {
        subscribeProvider(provider, _dispatch)

        const web3 = new Web3(provider)
        web3.eth.extend({
          methods: [
            {
              name: 'chainId',
              call: 'eth_chainId',
              outputFormatter: web3.utils.hexToNumber
            }
          ]
        })
        const accounts = await web3.eth.getAccounts()
        const chainId = await web3.eth.chainId()

        _dispatch({
          type: WALLET_CONNECTED,
          payload: {
            account: accounts[0],
            provider,
            chainId
          }
        })
      }
    } catch (_err) {
      console.error(`Error during connecting with a wallet: ${_err}`)
    }
  }
}

const disconnectWallet = _provider => {
  return async _dispatch => {
    if (_provider.wc) {
      await _provider.disconnect()
    }

    web3Modal.clearCachedProvider()
    _dispatch({
      type: WALLET_DISCONNECTED,
      payload: {}
    })
  }
}

const subscribeProvider = async (_provider, _dispatch) => {
  if (!_provider.on) {
    return
  }
  _provider.on('disconnect', () => {
    _dispatch({
      type: WALLET_DISCONNECTED,
      payload: {}
    })
  })

  _provider.on('accountsChanged', _accounts => {
    _dispatch({
      type: WALLET_ACCOUNT_CHANGED,
      payload: {
        account: _accounts[0]
      }
    })
  })

  _provider.on('chainChanged', _chainId => {
    _dispatch({
      type: WALLET_CHAIN_CHANGED,
      payload: {
        chainId: _chainId
      }
    })
  })
}

export { connectWallet, disconnectWallet }
