import { PAGE_CHANGED } from '../../constants'

const initialState = {
  selectedPage: '/'
}

const headerReducer = (_state = initialState, _action) => {
  if (_action.type === PAGE_CHANGED) {
    return Object.assign({}, _state, {
      selectedPage: _action.payload.page
    })
  }
  return _state
}

export default headerReducer
