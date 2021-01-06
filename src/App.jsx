import React, { useEffect, useState } from 'react'
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import HomeController from './components/pages/home'
import MainContent from './components/atoms/mainContent/'
import HeaderController from './components/organisms/header'
import settings from './settings'
import { useChainId } from './hooks/use-chain-id'
import queryString from 'query-string'

const mapStateToProps = _state => {
  return {
    chainId: _state.wallet.chainId
  }
}

const mapDispatchToProps = _dispatch => {
  return {}
}

const App = ({ chainId }) => {
  const { error } = useChainId(chainId)
  const { addToast } = useToasts()

  useEffect(() => {
    if (error) {
      addToast(error.message, { appearance: 'error' })
    }
  }, [error, addToast])

  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path={'/'}
          render={() => {
            return (
              <React.Fragment>
                <HeaderController />
                <MainContent>
                  <HomeController />
                </MainContent>
              </React.Fragment>
            )
          }}
        />
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </BrowserRouter>
  )
}

App.propTypes = {
  chainId: PropTypes.number
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
