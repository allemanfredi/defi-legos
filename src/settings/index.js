const settings =  {
  optionNameToLabel: {
    uniswap: 'Uniswap',
    aave: 'AAVE',
    instapool_v2: 'Instapool V2'
  },
  options: {
    aave: [
      {
        name: 'aave',
        method: 'deposit',
        args: ['token', 'amount'],
        id: 6
      },
      {
        name: 'aave',
        method: 'withdraw',
        args: ['token', 'amount'],
        id: 7
      }
    ],
    instapool_v2: [
      {
        name: 'instapool_v2',
        method: 'flashBorrowAndCast',
        args: ['token', 'amount', 'route', 'calldata'],
        id: 4
      },
      {
        name: 'instapool_v2',
        method: 'flashPayback',
        args: ['token', 'amount',],
        id: 5
      }
    ],
    uniswap: [
      {
        name: 'uniswap',
        method: 'buy',
        args: ['buyAddr', 'sellAddr', 'buyAmt', 'unitAmt'],
        id: 0
      },
      {
        name: 'uniswap',
        method: 'sell',
        args: ['buyAddr', 'sellAddr', 'buyAmt', 'unitAmt'],
        id: 1
      },
      {
        name: 'uniswap',
        method: 'deposit',
        args: ['tokenA', 'tokenB', 'amtA', 'unitAmt', 'slippage'],
        id: 2
      },
      {
        name: 'uniswap',
        method: 'withdraw',
        args: ['tokenA', 'tokenB', 'uniAmt', 'unitAmtA', 'unitAmtB'],
        id: 3
      }
    ],
  }
}

export default settings