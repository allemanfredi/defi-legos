import { OPTION_SELECTED } from '../../constants'

const initialState = {
  options: []
}

const buildStrategyReducer = (_state = initialState, _action) => {
  if (_action.type === OPTION_SELECTED) {
    return Object.assign({}, _state, {
      options: [..._state.options, _action.payload.option]
    })
  }
  return _state
}

export default buildStrategyReducer
