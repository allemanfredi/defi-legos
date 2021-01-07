import React, { useEffect } from 'react'
import Home from './Home'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { buildAndExecute } from '../../../actions/build-strategy'
import { connectWallet, disconnectWallet } from '../../../actions/wallet'
import { useAddress } from '../../../hooks/use-address'
import { setPage } from '../../../actions/header'

const mapStateToProps = _state => {
  return {
    selectedPage: _state.header.selectedPage,
    wallet: _state.wallet
  }
}

const mapDispatchToProps = _dispatch => {
  return {
    buildAndExecute: () => _dispatch(buildAndExecute()),
    connectWallet: () => _dispatch(connectWallet()),
    disconnectWallet: _provider => _dispatch(disconnectWallet(_provider)),
    setPage: _page => _dispatch(setPage(_page))
  }
}

const HomeController = ({
  buildAndExecute,
  wallet,
  selectedPage,
  history,
  connectWallet,
  disconnectWallet,
  setPage
}) => {
  const { isConnected, account, provider } = wallet
  const { address } = useAddress(account)

  const onChangeSelectedPage = _page => {
    setPage(_page)
    history.push(_page)
  }

  return (
    <Home
      buildAndExecute={buildAndExecute}
      selectedPage={selectedPage}
      isConnected={isConnected}
      address={address}
      onConnectWallet={connectWallet}
      onDisconnectWallet={() => disconnectWallet(provider)}
      onChangeSelectedPage={onChangeSelectedPage}
    />
  )
}

HomeController.propTypes = {
  buildAndExecute: PropTypes.func,
  history: PropTypes.object,
  selectedPage: PropTypes.string,
  wallet: PropTypes.object,
  connectWallet: PropTypes.func,
  disconnectWallet: PropTypes.func,
  setPage: PropTypes.func
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeController))
