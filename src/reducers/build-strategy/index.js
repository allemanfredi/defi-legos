import { OPTION_SELECTED, OPTION_DELETED, OPTIONS_REORDERED } from '../../constants'

const initialState = {
  options: []
}

const buildStrategyReducer = (_state = initialState, _action) => {
  if (_action.type === OPTION_SELECTED) {
    return Object.assign({}, _state, {
      options: [..._state.options, _action.payload.option]
    })
  }
  if (_action.type === OPTION_DELETED || _action.type === OPTIONS_REORDERED) {
    return Object.assign({}, _state, {
      options: _action.payload.options
    })
  }
  return _state
}

export default buildStrategyReducer
