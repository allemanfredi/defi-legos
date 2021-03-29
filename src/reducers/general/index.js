import { SET_LOADING } from '../../constants'

const initialState = {
  loading: {
    isLoading: false,
    text: null
  }
}

const generalReducer = (_state = initialState, _action) => {
  const { type, payload } = _action
  if (type === SET_LOADING) {
    const { loading } = payload
    return Object.assign({}, _state, {
      ..._state,
      loading
    })
  }
  return _state
}

export default generalReducer
