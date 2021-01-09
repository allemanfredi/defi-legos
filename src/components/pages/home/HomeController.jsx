import React from 'react'
import Home from './Home'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { buildAndExecute, createStrategy } from '../../../actions/build-strategy'
import { connectWallet, disconnectWallet } from '../../../actions/wallet'
import { useAddress } from '../../../hooks/use-address'

const mapStateToProps = _state => {
  return {
    wallet: _state.wallet
  }
}

const mapDispatchToProps = _dispatch => {
  return {
    buildAndExecute: () => _dispatch(buildAndExecute()),
    createStrategy: () => _dispatch(createStrategy()),
    connectWallet: () => _dispatch(connectWallet()),
    disconnectWallet: _provider => _dispatch(disconnectWallet(_provider))
  }
}

const HomeController = ({ buildAndExecute, wallet, selectedPage, connectWallet, disconnectWallet, createStrategy }) => {
  const { isConnected, account, provider, smartAccounts } = wallet
  const { address } = useAddress(account)

  return (
    <Home
      buildAndExecute={buildAndExecute}
      selectedPage={selectedPage}
      isConnected={isConnected}
      address={address}
      smartAccount={smartAccounts[0]}
      onConnectWallet={connectWallet}
      onDisconnectWallet={() => disconnectWallet(provider)}
      onNewStrategy={createStrategy}
    />
  )
}

HomeController.propTypes = {
  buildAndExecute: PropTypes.func,
  selectedPage: PropTypes.string,
  wallet: PropTypes.object,
  connectWallet: PropTypes.func.isRequired,
  disconnectWallet: PropTypes.func.isRequired,
  createStrategy: PropTypes.func.isRequired
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeController))
