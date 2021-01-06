import React from 'react'
import Header from './Header'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { connectWallet, disconnectWallet } from '../../../actions/wallet'
import { useAddress } from '../../../hooks/use-address'
import { setPage } from '../../../actions/header'
import { withRouter } from 'react-router-dom'

const mapStateToProps = _state => {
  return {
    selectedPage: _state.header.selectedPage,
    wallet: _state.wallet
  }
}

const mapDispatchToProps = _dispatch => {
  return {
    connectWallet: () => _dispatch(connectWallet()),
    disconnectWallet: _provider => _dispatch(disconnectWallet(_provider)),
    setPage: _page => _dispatch(setPage(_page))
  }
}

const HeaderController = _props => {
  const { wallet, selectedPage, history, connectWallet, disconnectWallet } = _props
  const { isConnected, account, provider } = wallet

  const { address } = useAddress(account)

  const onChangeSelectedPage = _page => {
    _props.setPage(_page)
    history.push(_page)
  }

  return (
    <Header
      selectedPage={selectedPage}
      isConnected={isConnected}
      address={address}
      onConnectWallet={connectWallet}
      onDisconnectWallet={() => disconnectWallet(provider)}
      onChangeSelectedPage={onChangeSelectedPage}
    />
  )
}

HeaderController.propTypes = {
  history: PropTypes.object,
  selectedPage: PropTypes.string,
  wallet: PropTypes.object,
  connectWallet: PropTypes.func,
  disconnectWallet: PropTypes.func,
  setPage: PropTypes.func
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderController))
