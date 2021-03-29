import React, { Fragment } from 'react'
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import HomeController from './components/pages/home'
import Notifications from './components/atoms/notifications'
import Loader from './components/organisms/loader'

const mapStateToProps = _state => {
  return {
    loading: _state.general.loading
  }
}

const mapDispatchToProps = _dispatch => {
  return {}
}

const App = ({ loading }) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path={'/'}
          render={() => {
            return (
              <Fragment>
                <Loader loading={loading} />
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
