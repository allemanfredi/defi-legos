import {
  OPTION_SELECTED,
  OPTION_DELETED,
  OPTIONS_REORDERED,
  SET_OPTION_INPUTS,
  BUILD_FAILED,
  BUILD_SUCEEDED,
  RESET_BUILD_ERROR
} from '../../constants'

const initialState = {
  options: [],
  error: null,
  promiEvent: null
}

const buildStrategyReducer = (_state = initialState, _action) => {
  const { type, payload } = _action
  if (type === OPTION_SELECTED) {
    return Object.assign({}, _state, {
      options: [..._state.options, payload.option]
    })
  }
  if (type === OPTION_DELETED || type === OPTIONS_REORDERED || type === SET_OPTION_INPUTS) {
    return Object.assign({}, _state, {
      options: payload.options
    })
  }
  if (type === BUILD_FAILED) {
    return Object.assign({}, _state, {
      error: payload.error
    })
  }
  if (type === RESET_BUILD_ERROR) {
    return Object.assign({}, _state, {
      error: null
    })
  }
  if (type === BUILD_SUCEEDED) {
    return Object.assign({}, _state, {
      promiEvent: payload.promiEvent
    })
  }
  return _state
}

export default buildStrategyReducer
