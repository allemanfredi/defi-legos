import { SIMULATOR_ENABLED, SIMULATOR_DISABLED } from '../../constants'

const initialState = {
  isEnabled: false,
  forkId: null
}

const simulatorReducer = (_state = initialState, _action) => {
  const { type, payload } = _action
  if (type === SIMULATOR_ENABLED) {
    const { forkId } = payload
    return Object.assign({}, _state, {
      ..._state,
      isEnabled: true,
      forkId
    })
  }
  if (type === SIMULATOR_DISABLED) {
    return Object.assign({}, _state, {
      ..._state,
      isEnabled: false
    })
  }
  return _state
}

export default simulatorReducer
