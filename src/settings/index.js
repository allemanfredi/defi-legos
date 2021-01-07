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
        additionalArgs: ['getId', 'setId'],
        argsType: ['address', 'number','number', 'number'],
        id: 0
      },
      {
        name: 'aave',
        method: 'withdraw',
        args: ['token', 'amount'],
        additionalArgs: ['getId', 'setId'],
        argsType: ['address', 'number','number', 'number'],
        id: 1
      }
    ],
    instapool_v2: [
      {
        name: 'instapool_v2',
        method: 'flashBorrowAndCast',
        args: ['token', 'amount', 'protocol'], 
        additionalArgs: ['calldata'],
        argsType: ['address', 'number', 'number', 'calldata',],
        id: 2
      },
      {
        name: 'instapool_v2',
        method: 'flashPayback',
        args: ['token', 'amount'],
        additionalArgs: ['getId', 'setId'],
        argsType: ['address', 'number','number', 'number'],
        id: 3
      }
    ],
    uniswap: [
      {
        name: 'uniswap',
        method: 'buy',
        args: ['tokenBuy', 'tokenSell', 'buyAmt', 'unitAmt'],
        additionalArgs: ['getId', 'setId'],
        argsType: ['address', 'address', 'number', 'number','number', 'number'],
        id: 4
      },
      {
        name: 'uniswap',
        method: 'sell',
        args: ['tokenBuy', 'tokenSell', 'buyAmt', 'unitAmt'],
        additionalArgs: ['getId', 'setId'],
        argsType: ['address', 'address', 'number', 'number','number', 'number'],
        id: 5
      },
      {
        name: 'uniswap',
        method: 'deposit',
        args: ['tokenA', 'tokenB', 'amtA', 'unitAmt', 'slippage'],
        additionalArgs: ['getId', 'setId'],
        argsType: ['address', 'address', 'number', 'number', 'number','number', 'number'],
        id: 6
      },
      {
        name: 'uniswap',
        method: 'withdraw',
        args: ['tokenA', 'tokenB', 'uniAmt', 'unitAmtA', 'unitAmtB'],
        additionalArgs: ['getId', 'setId'],
        argsType: ['address', 'address', 'number', 'number', 'number','number', 'number'],
        id: 7
      }
    ],
  }
}

export default settings