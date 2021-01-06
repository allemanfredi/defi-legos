import React from 'react'
import Home from './Home'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { buildAndExecute } from '../../../actions/build-strategy'

const mapStateToProps = _state => {
  return {}
}

const mapDispatchToProps = _dispatch => {
  return {
    buildAndExecute: () => _dispatch(buildAndExecute())
  }
}

const HomeController = ({ buildAndExecute }) => {
  return <Home buildAndExecute={buildAndExecute} />
}

HomeController.propTypes = {
  buildAndExecute: PropTypes.func
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeController))
