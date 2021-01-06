import { useMemo } from 'react'

const useChainId = _chainId => {
  return useMemo(() => {
    if (_chainId && _chainId !== 1) {
      return {
        error: {
          message: 'Invalid Network. Please use Mainnet!'
        }
      }
    }

    return {
      error: null
    }
  }, [_chainId])
}

export { useChainId }
