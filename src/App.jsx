import React, { useEffect } from 'react'
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import HomeController from './components/pages/home'
import { useChainId } from './hooks/use-chain-id'
import { resetBuildError } from './actions/build-strategy'

const mapStateToProps = _state => {
  return {
    buildError: _state.buildStrategy.error,
    chainId: _state.wallet.chainId
  }
}

const mapDispatchToProps = _dispatch => {
  return {
    resetBuildError: () => _dispatch(resetBuildError())
  }
}

const App = ({ chainId, buildError, resetBuildError }) => {
  const { error } = useChainId(chainId)
  const { addToast } = useToasts()

  useEffect(() => {
    if (error) {
      addToast(error.message, { appearance: 'error' })
    }
    if (buildError) {
      addToast(buildError, { appearance: 'error', onDismiss: resetBuildError })
    }
  }, [error, buildError, addToast, resetBuildError])

  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path={'/'}
          render={() => {
            return <HomeController />
          }}
        />
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </BrowserRouter>
  )
}

App.propTypes = {
  buildError: PropTypes.string,
  chainId: PropTypes.number,
  resetBuildError: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
