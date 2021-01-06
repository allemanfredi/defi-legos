import { PAGE_CHANGED } from '../../constants'

const setPage = _page => {
  return {
    type: PAGE_CHANGED,
    payload: {
      page: _page
    }
  }
}

export { setPage }
