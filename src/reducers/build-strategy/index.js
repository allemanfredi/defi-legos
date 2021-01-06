import { OPTION_SELECTED, OPTION_DELETED } from '../../constants'

const initialState = {
  options: []
}

const buildStrategyReducer = (_state = initialState, _action) => {
  if (_action.type === OPTION_SELECTED) {
    return Object.assign({}, _state, {
      options: [..._state.options, _action.payload.option]
    })
  }
  if (_action.type === OPTION_DELETED) {
    return Object.assign({}, _state, {
      options: _state.options.filter((_, _index) => _action.payload.index !== _index)
    })
  }
  return _state
}

export default buildStrategyReducer
