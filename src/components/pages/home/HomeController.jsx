import React from 'react'
import Home from './Home'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { buildAndExecute } from '../../../actions/build-strategy'
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
    connectWallet: () => _dispatch(connectWallet()),
    disconnectWallet: _provider => _dispatch(disconnectWallet(_provider))
  }
}

const HomeController = ({ buildAndExecute, wallet, selectedPage, connectWallet, disconnectWallet }) => {
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
    />
  )
}

HomeController.propTypes = {
  buildAndExecute: PropTypes.func,
  selectedPage: PropTypes.string,
  wallet: PropTypes.object,
  connectWallet: PropTypes.func,
  disconnectWallet: PropTypes.func
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeController))
