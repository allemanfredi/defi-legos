const settings = {
  optionNameToLabel: {
    uniswap: 'Uniswap',
    aave: 'AAVE',
    instapool_v2: 'Instapool V2',
    'curve': 'Curve Finance',
    maker: 'MakerDAO',
    compound: 'Compound',
    '1inch': '1inch'
  },
  options: {
    aave: [
      {
        name: 'aave',
        method: 'deposit',
        args: ['token', 'amount'],
        additionalArgs: ['getId', 'setId'],
        argsType: ['address', 'number', 'number', 'number'],
        decimalsSuggestor: {
          1: 0 //indexAmount: tokenIndex
        }
      },
      {
        name: 'aave',
        method: 'withdraw',
        args: ['token', 'amount'],
        additionalArgs: ['getId', 'setId'],
        argsType: ['address', 'number', 'number', 'number'],
        decimalsSuggestor: {
          1: 0
        }
      }
    ],
    compound: [
      {
        name: 'compound',
        method: 'deposit',
        args: ['token', 'amount'],
        additionalArgs: ['getId', 'setId'],
        argsType: ['address', 'number', 'number', 'number'],
        decimalsSuggestor: {
          1: 0
        }
      },
      {
        name: 'compound',
        method: 'withdraw',
        args: ['token', 'amount'],
        additionalArgs: ['getId', 'setId'],
        argsType: ['address', 'number', 'number', 'number'],
        decimalsSuggestor: {
          1: 0
        }
      },
      {
        name: 'compound',
        method: 'borrow',
        args: ['token', 'amount'],
        additionalArgs: ['getId', 'setId'],
        argsType: ['address', 'number', 'number', 'number'],
        decimalsSuggestor: {
          1: 0
        }
      },
      {
        name: 'compound',
        method: 'payback',
        args: ['token', 'amount'],
        additionalArgs: ['getId', 'setId'],
        argsType: ['address', 'number', 'number', 'number'],
        decimalsSuggestor: {
          1: 0
        }
      },
      {
        name: 'compound',
        method: 'liquidate',
        args: ['borrower', 'tokenToPay', 'tokenInReturn', 'amount'],
        additionalArgs: ['getId', 'setId'],
        argsType: ['address', 'address', 'address', 'number', 'number', 'number'],
        decimalsSuggestor: {
          3: 1
        }
      },
      {
        name: 'compound',
        method: 'depositCToken',
        args: ['token', 'amount'],
        additionalArgs: ['getId', 'setId'],
        argsType: ['address', 'number', 'number', 'number'],
        decimalsSuggestor: {
          1: 0
        }
      },
      {
        name: 'compound',
        method: 'withdrawCToken',
        args: ['token', 'amount'],
        additionalArgs: ['getId', 'setId'],
        argsType: ['address', 'number', 'number', 'number'],
        decimalsSuggestor: {
          1: 0
        }
      }
    ],
    'curve': [
      {
        name: 'curve',
        method: 'sell',
        args: ['buyToken', 'sellToken', 'sellAmt', 'unitAmt'],
        additionalArgs: ['getId', 'setId'],
        argsType: ['address', 'address', 'number', 'number', 'number', 'number'],
        decimalsSuggestor: {
          2: 1,
          3: 1
        }
      },
      {
        name: 'curve',
        method: 'deposit',
        args: ['token', 'amount', 'unitAmt'],
        additionalArgs: ['getId', 'setId'],
        argsType: ['address', 'number', 'number', 'number', 'number'],
        decimalsSuggestor: {
          1: 0,
          2: 0
        }
      },
      {
        name: 'curve',
        method: 'withdraw',
        args: ['token', 'amount', 'unitAmt'],
        additionalArgs: ['getId', 'setId'],
        argsType: ['address', 'number', 'number', 'number', 'number'],
        decimalsSuggestor: {
          1: 0,
          2: 0
        }
      }
    ],
    instapool_v2: [
      {
        name: 'instapool_v2',
        method: 'flashBorrowAndCast',
        args: ['token', 'amount', 'protocol'],
        additionalArgs: ['calldata'],
        argsType: ['address', 'number', 'number', 'calldata'],
        decimalsSuggestor: {
          1: 0
        }
      },
      {
        name: 'instapool_v2',
        method: 'flashPayback',
        args: ['token', 'amount'],
        additionalArgs: ['getId', 'setId'],
        argsType: ['address', 'number', 'number', 'number'],
        decimalsSuggestor: {
          1: 0
        }
      }
    ],
    maker: [
      {
        name: 'maker',
        method: 'open',
        args: ['collateralVault'],
        additionalArgs: [],
        argsType: ['string']
      },
      {
        name: 'maker',
        method: 'close',
        args: ['maker'],
        additionalArgs: [],
        argsType: ['number']
      },
      {
        name: 'maker',
        method: 'deposit',
        args: ['vault_id', 'amount'],
        additionalArgs: ['getId', 'setId'],
        argsType: ['number', 'number', 'number', 'number'],
        decimalsSuggestor: 'makerSearchByVaultId'
      },
      {
        name: 'maker',
        method: 'withdraw',
        args: ['vault_id', 'amount'],
        additionalArgs: ['getId', 'setId'],
        argsType: ['number', 'number', 'number', 'number'],
        decimalsSuggestor: 'makerSearchByVaultId'
      },
      {
        name: 'maker',
        method: 'borrow',
        args: ['vault_id', 'amount'],
        additionalArgs: ['getId', 'setId'],
        argsType: ['number', 'number', 'number', 'number'],
        decimalsSuggestor: 'makerSearchByVaultId'
      },
      {
        name: 'maker',
        method: 'payback',
        args: ['vault_id', 'amount'],
        additionalArgs: ['getId', 'setId'],
        argsType: ['number', 'number', 'number', 'number'],
        decimalsSuggestor: 'makerSearchByVaultId'
      },
      {
        name: 'maker',
        method: 'transfer',
        args: ['vaultId', 'nextOwner'],
        additionalArgs: [],
        argsType: ['number', 'address'],
        decimalsSuggestor: {}
      },
      {
        name: 'maker',
        method: 'exitDai',
        args: ['vaultId', 'amount'],
        additionalArgs: ['getId', 'setId'],
        argsType: ['number', 'number', 'number', 'number'],
        decimalsSuggestor: 'makerSearchByVaultId'
      },
      {
        name: 'maker',
        method: 'withdrawLiquidated',
        args: ['vaultId', 'amount'],
        additionalArgs: ['getId', 'setId'],
        argsType: ['number', 'number', 'number', 'number'],
        decimalsSuggestor: 'makerSearchByVaultId'
      },
      {
        name: 'maker',
        method: 'depositDai',
        args: ['amount'],
        additionalArgs: ['getId', 'setId'],
        argsType: ['number', 'number', 'number'],
        decimalsSuggestor: {
          0: 'multiplyBy10**18'
        }
      }
    ],
    uniswap: [
      {
        name: 'uniswap',
        method: 'buy',
        args: ['tokenBuy', 'tokenSell', 'buyAmt', 'unitBuyAmt'],
        additionalArgs: ['getId', 'setId'],
        argsType: ['address', 'address', 'number', 'number', 'number', 'number'],
        decimalsSuggestor: {
          2: 0,
          3: 0
        }
      },
      {
        name: 'uniswap',
        method: 'sell',
        args: ['tokenBuy', 'tokenSell', 'sellAmt', 'unitSellAmt'],
        additionalArgs: ['getId', 'setId'],
        argsType: ['address', 'address', 'number', 'number', 'number', 'number'],
        decimalsSuggestor: {
          2: 1,
          3: 1
        }
      },
      {
        name: 'uniswap',
        method: 'deposit',
        //args: ['tokenA', 'tokenB', 'amtA', 'unitAmt', 'slippage'],
        args: ['tokenA', 'tokenB', 'amtA', 'amtB', 'slippage'],
        additionalArgs: ['getId', 'setId'],
        argsType: ['address', 'address', 'number', 'number', 'number', 'number', 'number'],
        decimalsSuggestor: {
          2: 0
        }
      },
      {
        name: 'uniswap',
        method: 'withdraw',
        args: ['tokenA', 'tokenB', 'uniAmt'],
        additionalArgs: ['unitAmtA', 'unitAmtB', 'getId', 'setId'],
        argsType: ['address', 'address', 'number', 'number', 'number', 'number', 'number'],
        decimalsSuggestor: {}
      }
    ],
    '1inch': [
      {
        name: '1inch',
        method: 'sell',
        args: ['tokenBuy', 'tokenSell', 'sellAmt', 'unitAmt'],
        additionalArgs: ['getId', 'setId'],
        argsType: ['address', 'address', 'number', 'number', 'number', 'number'],
        decimalsSuggestor: {
          2: 0,
          3: 0
        }
      },
    ],
  }
}

export default settings
