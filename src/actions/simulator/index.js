import axios from 'axios'
import { SIMULATOR_DISABLED, SIMULATOR_ENABLED } from '../../constants'
import store from '../../store'
import { setLoading } from '../general'

const activateSimulator = () => {
  return async _dispatch => {
    try {
      _dispatch(
        setLoading({
          text: 'Connecting with simulereum ...',
          isLoading: true
        })
      )
      const { account } = store.getState().wallet
      const {
        data: { forkId }
      } = await axios.post(`${process.env.REACT_APP_SIMULEREUM_ENDPOINT}/forks/new`, {
        accounts: [account]
      })
      _dispatch({
        type: SIMULATOR_ENABLED,
        payload: {
          forkId
        }
      })
    } catch (_err) {
      console.error(`Error during activating the simulator: ${_err}`)
    }
    _dispatch(
      setLoading({
        isLoading: false
      })
    )
  }
}

const disableSimulator = () => ({
  type: SIMULATOR_DISABLED
})

export { activateSimulator, disableSimulator }
