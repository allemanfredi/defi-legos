import React from 'react'
import Home from './Home'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { buildAndExecute, createStrategy } from '../../../actions/build-strategy'
import { connectWallet, disconnectWallet } from '../../../actions/wallet'
import { activateSimulator, disableSimulator } from '../../../actions/simulator'

const mapStateToProps = _state => {
  return {
    wallet: _state.wallet,
    simulatorIsEnabled: _state.simulator.isEnabled
  }
}

const mapDispatchToProps = _dispatch => {
  return {
    buildAndExecute: () => _dispatch(buildAndExecute()),
    createStrategy: () => _dispatch(createStrategy()),
    connectWallet: () => _dispatch(connectWallet()),
    disconnectWallet: _provider => _dispatch(disconnectWallet(_provider)),
    activateSimulator: () => _dispatch(activateSimulator()),
    disableSimulator: () => _dispatch(disableSimulator())
  }
}

const HomeController = _props => {
  const { disconnectWallet, wallet } = _props
  const { provider, smartAccounts } = wallet
  return <Home smartAccount={smartAccounts[0]} disconnectWallet={() => disconnectWallet(provider)} {..._props} />
}

HomeController.propTypes = {
  simulatorIsEnabled: PropTypes.bool.isRequired,
  selectedPage: PropTypes.string,
  wallet: PropTypes.object,
  connectWallet: PropTypes.func.isRequired,
  disconnectWallet: PropTypes.func.isRequired,
  createStrategy: PropTypes.func.isRequired,
  activateSimulator: PropTypes.func.isRequired,
  disableSimulator: PropTypes.func.isRequired,
  buildAndExecute: PropTypes.func
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeController))
