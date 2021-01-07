const settings =  {
  optionNameToLabel: {
    uniswap: 'Uniswap',
    aave: 'AAVE',
    instapool_v2: 'Instapool V2',
    'curve-y': 'Curve Finance'
  },
  options: {
    aave: [
      {
        name: 'aave',
        method: 'deposit',
        args: ['token', 'amount'],
        additionalArgs: ['getId', 'setId'],
        argsType: ['address', 'number','number', 'number'],
      },
      {
        name: 'aave',
        method: 'withdraw',
        args: ['token', 'amount'],
        additionalArgs: ['getId', 'setId'],
        argsType: ['address', 'number','number', 'number'],
      }
    ],
    'curve-y': [
      {
        name: 'curve-y',
        method: 'sell',
        args: ['tokenBuy', 'tokenSell', 'buyAmt', 'unitAmt'],
        additionalArgs: ['getId', 'setId'],
        argsType: ['address', 'number','number', 'number', 'number', 'number'],
      },
      {
        name: 'curve-y',
        method: 'deposit',
        args: ['token', 'amount', 'unitAmt'],
        additionalArgs: ['getId', 'setId'],
        argsType: ['address', 'number', 'number', 'number', 'number'],
      },
      {
        name: 'curve-y',
        method: 'withdraw',
        args: ['token', 'amount', 'unitAmt'],
        additionalArgs: ['getId', 'setId'],
        argsType: ['address', 'number', 'number', 'number', 'number'],
      }
    ],
    instapool_v2: [
      {
        name: 'instapool_v2',
        method: 'flashBorrowAndCast',
        args: ['token', 'amount', 'protocol'], 
        additionalArgs: ['calldata'],
        argsType: ['address', 'number', 'number', 'calldata',],
      },
      {
        name: 'instapool_v2',
        method: 'flashPayback',
        args: ['token', 'amount'],
        additionalArgs: ['getId', 'setId'],
        argsType: ['address', 'number','number', 'number'],
      }
    ],
    uniswap: [
      {
        name: 'uniswap',
        method: 'buy',
        args: ['tokenBuy', 'tokenSell', 'buyAmt', 'unitAmt'],
        additionalArgs: ['getId', 'setId'],
        argsType: ['address', 'address', 'number', 'number','number', 'number'],
      },
      {
        name: 'uniswap',
        method: 'sell',
        args: ['tokenBuy', 'tokenSell', 'buyAmt', 'unitAmt'],
        additionalArgs: ['getId', 'setId'],
        argsType: ['address', 'address', 'number', 'number','number', 'number'],
      },
      {
        name: 'uniswap',
        method: 'deposit',
        args: ['tokenA', 'tokenB', 'amtA', 'unitAmt', 'slippage'],
        additionalArgs: ['getId', 'setId'],
        argsType: ['address', 'address', 'number', 'number', 'number','number', 'number'],
      },
      {
        name: 'uniswap',
        method: 'withdraw',
        args: ['tokenA', 'tokenB', 'uniAmt', 'unitAmtA', 'unitAmtB'],
        additionalArgs: ['getId', 'setId'],
        argsType: ['address', 'address', 'number', 'number', 'number','number', 'number'],
      }
    ],
  }
}

export default settings