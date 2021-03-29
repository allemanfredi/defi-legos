import { SET_LOADING } from '../../constants'

const setLoading = ({ isLoading, text }) => ({
  type: SET_LOADING,
  payload: {
    loading: {
      isLoading,
      text
    }
  }
})

export { setLoading }
