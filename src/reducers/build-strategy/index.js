import {
  NEW_STRATEGY_CREATED,
  STRATEGY_SELECTED,
  STRATEGY_DELETED,
  OPTION_SELECTED,
  OPTION_DELETED,
  OPTIONS_REORDERED,
  SET_OPTION_INPUTS,
  SET_OPTION_DISABLED
} from '../../constants'

const initialState = {
  strategies: [],
  options: [],
  selectedStrategy: null
}

const buildStrategyReducer = (_state = initialState, _action) => {
  const { type, payload } = _action
  if (type === NEW_STRATEGY_CREATED) {
    return Object.assign({}, _state, {
      strategies: [..._state.strategies, payload.strategy]
    })
  }
  if (type === STRATEGY_SELECTED) {
    return Object.assign({}, _state, {
      selectedStrategy: payload.strategy
    })
  }
  if (type === STRATEGY_DELETED) {
    return Object.assign({}, _state, {
      selectedStrategy: payload.selectedStrategy,
      strategies: payload.strategies
    })
  }
  if (type === OPTION_SELECTED) {
    return Object.assign({}, _state, {
      options: [..._state.options, payload.option]
    })
  }
  if (
    type === OPTION_DELETED ||
    type === OPTIONS_REORDERED ||
    type === SET_OPTION_INPUTS ||
    type === SET_OPTION_DISABLED
  ) {
    return Object.assign({}, _state, {
      options: payload.options
    })
  }
  return _state
}

export default buildStrategyReducer
