import { OPTION_SELECTED, OPTION_DELETED, OPTIONS_REORDERED } from '../../constants'
import store from '../../store'

const selectOption = _option => {
  return {
    type: OPTION_SELECTED,
    payload: {
      option: _option
    }
  }
}

const deleteOption = _indexToDelete => {
  return {
    type: OPTION_DELETED,
    payload: {
      options: store.getState().buildStrategy.options.filter((_, _index) => _index !== _indexToDelete)
    }
  }
}

const reorderOptions = (_startIndex, _endIndex) => {
  const result = store.getState().buildStrategy.options
  const [removed] = result.splice(_startIndex, 1)
  const options = result.splice(_endIndex, 0, removed)

  return {
    type: OPTIONS_REORDERED,
    payload: {
      options
    }
  }
}

export { selectOption, deleteOption, reorderOptions }
