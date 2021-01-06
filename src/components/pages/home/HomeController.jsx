import React from 'react'
import Home from './Home'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const mapStateToProps = _state => {
  return {}
}

const mapDispatchToProps = _dispatch => {
  return {}
}

const HomeController = _props => {
  return <Home />
}

HomeController.propTypes = {}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeController))
