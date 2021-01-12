import BigNumber from 'bignumber.js'

const handleUniswap = async ({ fixedInputs, method, dsa, index, decimalsSuggestor }) => {
  try {
    // NOTE: handle getId and setId
    if (method === 'withdraw' && index >= 5) return '0'
    if (method === 'deposit' && index >= 5) return '0'
    if (method === 'sell' && index >= 4) return '0'
    if (method === 'buy' && index >= 4) return '0'

    if (method === 'deposit' && index === 3) {
      // NOTE: [3] must become [2]/[3] => The unit amount of amtB/amtA with slippage.
      const tokenA = dsa.tokens.info[fixedInputs[0].toLowerCase()]
      const tokenB = dsa.tokens.info[fixedInputs[1].toLowerCase()]
      if (!tokenA || !tokenB) {
        throw new Error('Invalid Input')
      }

      const amtA = fixedInputs[2]
      const amtB = fixedInputs[3]

      return (fixedInputs[3] = BigNumber(amtA ** tokenA.decimals)
        .dividedToIntegerBy(amtB ** tokenB.decimals)
        .toFixed())
    }

    if (method === 'deposit' && index === 4) {
      return BigNumber(fixedInputs[4])
        .multipliedBy(10 ** 16)
        .toFixed()
    }

    if (method === 'deposit' && index === 2) {
      return BigNumber(fixedInputs[index])
        .multipliedBy(10 ** dsa.tokens.info[fixedInputs[decimalsSuggestor[index]].toLowerCase()].decimals)
        .toFixed()
    }

    if (method === 'withdraw' && index === 2) {
      return BigNumber(fixedInputs[index])
        .multipliedBy(10 ** 18)
        .toFixed()
    }

    if (method === 'withdraw' && index === 3) {
      const tokenA = dsa.tokens.info[fixedInputs[0].toLowerCase()]
      const tokenB = dsa.tokens.info[fixedInputs[1].toLowerCase()]
      if (!tokenA || !tokenB) {
        throw new Error('Invalid Input')
      }
      const uniAmt = fixedInputs[2]
      const { unitAmtA } = await dsa['uniswap'].getWithdrawAmount(tokenA.symbol, tokenB.symbol, uniAmt)
      return unitAmtA
    }

    if (method === 'withdraw' && index === 4) {
      const tokenA = dsa.tokens.info[fixedInputs[0].toLowerCase()]
      const tokenB = dsa.tokens.info[fixedInputs[1].toLowerCase()]
      if (!tokenA || !tokenB) {
        throw new Error('Invalid Input')
      }
      const uniAmt = fixedInputs[2]
      const { unitAmtB } = await dsa['uniswap'].getWithdrawAmount(tokenA.symbol, tokenB.symbol, uniAmt)
      return unitAmtB
    }
  } catch (_err) {
    throw _err
  }
}

export { handleUniswap }
