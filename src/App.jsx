import React, { Fragment } from 'react'
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import HomeController from './components/pages/home'
import Notifications from './components/atoms/notifications'

const mapStateToProps = _state => {
  return {}
}

const mapDispatchToProps = _dispatch => {
  return {}
}

const App = _props => {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path={'/'}
          render={() => {
            return (
              <Fragment>
                <Notifications />
                <HomeController />
              </Fragment>
            )
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
