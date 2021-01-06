import { OPTION_SELECTED, OPTION_DELETED } from '../../constants'

const selectOption = _option => {
  return {
    type: OPTION_SELECTED,
    payload: {
      option: _option
    }
  }
}

const deleteOption = _index => {
  return {
    type: OPTION_DELETED,
    payload: {
      index: _index
    }
  }
}

export { selectOption, deleteOption }
