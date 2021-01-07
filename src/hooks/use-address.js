import { useMemo } from 'react'
import { formatAddress } from '../utils/address'

const useAddress = _address => {
  return useMemo(() => {
    return {
      address: _address ? formatAddress(_address) : '-'
    }
  }, [_address])
}

export { useAddress }
