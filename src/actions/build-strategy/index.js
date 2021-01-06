import { OPTION_SELECTED } from '../../constants'

const selectOption = _option => {
  return {
    type: OPTION_SELECTED,
    payload: {
      option: _option
    }
  }
}

export { selectOption }
