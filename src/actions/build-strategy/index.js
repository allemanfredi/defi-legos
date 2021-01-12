import {
  NEW_STRATEGY_CREATED,
  STRATEGY_SELECTED,
  OPTION_SELECTED,
  OPTION_DELETED,
  OPTIONS_REORDERED,
  SET_OPTION_INPUTS,
  SET_OPTION_DISABLED,
  RESET_BUILD_ERROR
} from '../../constants'
import store from '../../store'
import { v4 as uuidv4 } from 'uuid'
import DSA from 'dsa-sdk'
import Web3 from 'web3'
import _ from 'lodash'
import { toastr } from 'react-redux-toastr'
import BigNumber from 'bignumber.js'
import Maker from '@makerdao/dai'
import { McdPlugin } from '@makerdao/dai-plugin-mcd'
import { handleUniswap } from './helpers/uniswap'
import { searchByVaultId } from './helpers/maker'

const web3 = new Web3()

const createStrategy = _option => {
  const strategies = store.getState().buildStrategy.strategies
  return {
    type: NEW_STRATEGY_CREATED,
    payload: {
      strategy: {
        name: `strategy-${strategies.length}`,
        id: uuidv4()
      }
    }
  }
}

const selectStrategy = _strategy => {
  return {
    type: STRATEGY_SELECTED,
    payload: {
      strategy: _strategy
    }
  }
}

const selectOption = _option => {
  return async _dispatch => {
    if (!store.getState().buildStrategy.selectedStrategy) {
      toastr.error('Strategy not selected')
      return
    }

    _dispatch({
      type: OPTION_SELECTED,
      payload: {
        option: {
          ..._option,
          id: uuidv4(),
          strategy: store.getState().buildStrategy.selectedStrategy
        }
      }
    })
  }
}

const deleteOption = _option => {
  return {
    type: OPTION_DELETED,
    payload: {
      options: store.getState().buildStrategy.options.filter(({ id }) => _option.id !== id)
    }
  }
}

const resetBuildError = () => {
  return {
    type: RESET_BUILD_ERROR
  }
}

const setOptionInputs = (_inputs, _optionToUpdate) => {
  const options = store.getState().buildStrategy.options
  return {
    type: SET_OPTION_INPUTS,
    payload: {
      options: options.map(_option => (_optionToUpdate.id === _option.id ? { ..._option, inputs: _inputs } : _option))
    }
  }
}

const setOptionDisabled = (_disabled, _optionToUpdate) => {
  const options = store.getState().buildStrategy.options
  return {
    type: SET_OPTION_DISABLED,
    payload: {
      options: options.map(_option =>
        _optionToUpdate.id === _option.id ? { ..._option, disabled: _disabled } : _option
      )
    }
  }
}

const reorderOptions = (_startIndex, _endIndex, _strategyId, _index) => {
  const options = store.getState().buildStrategy.options
  const groupedOptions = _.chain([...options])
    .groupBy('strategy.id')
    .value()
  const optionsForStrategyToUpdate = groupedOptions[_strategyId]

  const [removed] = optionsForStrategyToUpdate.splice(_startIndex, 1)
  optionsForStrategyToUpdate.splice(_endIndex, 0, removed)
  groupedOptions[_strategyId] = optionsForStrategyToUpdate

  return {
    type: OPTIONS_REORDERED,
    payload: {
      options: _.flatten(Object.values(groupedOptions))
    }
  }
}

const buildAndExecute = () => {
  return async _dispatch => {
    try {
      const { options, selectedStrategy } = store.getState().buildStrategy
      const { provider, smartAccounts } = store.getState().wallet
      let maker, mgr

      web3.setProvider(provider)
      const dsa = new DSA(web3)
      dsa.setInstance(smartAccounts[0].id)

      if (!selectedStrategy) throw new Error('Strategy not selected')

      const groupedOptions = _.chain([...options])
        .groupBy('strategy.id')
        .value()

      const selectedOptions = groupedOptions[selectedStrategy.id]

      const withFlashloan = Boolean(
        selectedOptions.find(({ method, name }) => name === 'instapool_v2' && method === 'flashBorrowAndCast')
      )

      const withMakerStuff = Boolean(selectedOptions.find(({ name }) => name === 'maker'))
      if (withMakerStuff) {
        maker = await Maker.create('mainnet', {
          plugins: [[McdPlugin, { network: 'mainnet', prefetch: true }]],
          provider: {
            infuraProjectId: process.env.REACT_APP_INFURA_ID
          }
        })
        mgr = maker.service('mcd:cdpManager')
      }

      const values = selectedOptions
        .filter(({ disabled }) => !disabled)
        .map(
          ({ method, name, inputs, args, additionalArgs, argsType, decimalsSuggestor }, _oindex) =>
            new Promise(async (_resolve, _reject) => {
              if (!inputs) throw new Error('Invalid Input')

              const fixedInputs = Array(args.length + additionalArgs.length).fill('0')
              for (let i = 0; i < inputs.length; i++) fixedInputs[i] = inputs[i] ? inputs[i] : '0'

              const realArgs = argsType.map(
                (_type, _iindex) =>
                  new Promise(async (_resolve, _reject) => {
                    try {
                      switch (_type) {
                        case 'address': {
                          const token = dsa.tokens.info[fixedInputs[_iindex].toLowerCase()]
                          if (!token) {
                            _reject('Invalid or not supported token')
                          }

                          _resolve({
                            value: token.address,
                            index: _iindex
                          })
                          break
                        }
                        case 'number': {
                          // getId & setId (at the moment). Only withdraw on Uniswap has more than getId and setId on addiditionalArgsType

                          if (decimalsSuggestor === 'multiplyBy10**18') {
                            _resolve({
                              value: BigNumber(fixedInputs[_iindex]).multipliedBy(10 ** 18),
                              index: _iindex
                            })
                          }

                          if (decimalsSuggestor === 'makerSearchByVaultId' && _iindex < args.length) {
                            _resolve({
                              value: await searchByVaultId({ fixedInputs, dsa, mgr, index: _iindex }),
                              index: _iindex
                            })
                            break
                          }

                          if (name === 'uniswap') {
                            _resolve({
                              value: await handleUniswap({
                                fixedInputs,
                                method,
                                dsa,
                                index: _iindex,
                                decimalsSuggestor
                              }),
                              index: _iindex
                            })
                            break
                          }

                          if (_iindex >= args.length) {
                            _resolve({
                              value: '0',
                              index: _iindex
                            })
                            break
                          }

                          // NOTE: handle generic mapping
                          const whichToken = decimalsSuggestor[_iindex]
                          if (whichToken === undefined) {
                            _resolve(fixedInputs[_iindex])
                            break
                          }
                          const decimals = dsa.tokens.info[fixedInputs[whichToken].toLowerCase()].decimals
                          _resolve({
                            value: BigNumber(fixedInputs[_iindex])
                              .multipliedBy(10 ** decimals)
                              .toFixed(),
                            index: _iindex
                          })
                          break
                        }
                        default:
                          _resolve({
                            value: fixedInputs[_iindex],
                            index: _iindex
                          })
                          break
                      }
                    } catch (_err) {
                      _reject(_err)
                    }
                  })
              )

              try {
                _resolve({
                  value: {
                    connector: name,
                    method,
                    args: (await Promise.all(realArgs)).sort((_a, _b) => _a.index - _b.index).map(({ value }) => value)
                  },
                  index: _oindex
                })
              } catch (_err) {
                _reject(_err)
              }
            })
        )

      const spellValues = (await Promise.all(values)).sort((_a, _b) => _a.index - _b.index).map(({ value }) => value)
      const spells = dsa.Spell()
      spellValues.forEach(_spell => spells.add(_spell))
      console.log(spellValues)

      if (withFlashloan) {
        const flashloanSpell = dsa.Spell()
        flashloanSpell.add(spells.data[0])

        if (spells.data[0].connector !== 'instapool_v2' && spells.data[0].method !== 'flashBorrowAndCast')
          throw new Error('Flashloan position is wrong')

        const spellsToEncodeElements = spells.data.slice(1, spells.length)
        const spellsToEncode = dsa.Spell()
        spellsToEncodeElements.forEach(_spell => spellsToEncode.add(_spell))

        const calldata = dsa.instapool_v2.encodeFlashCastData(spellsToEncode)
        flashloanSpell.data[0].args[flashloanSpell.data[0].args.length - 1] = calldata

        await _monitorTransaction(dsa.cast(flashloanSpell))
        // TODO What next?
      } else {
        await _monitorTransaction(dsa.cast(spells))
        // TODO What next?
      }
    } catch (_err) {
      toastr.error(_err.message ? _err.message : _err)
    }
  }
}

const _monitorTransaction = _promiEvent =>
  new Promise(_resolve => {
    _promiEvent
      .once('transactionHash', _hash => {
        toastr.success(' View on Etherscan!', {
          timeOut: 8000,
          onToastrClick: () => window.open(`https://etherscan.io/tx/${_hash}`, '_blank')
        })
      })
      .once('receipt', () => {
        toastr.success('Transaction confirmed!')
        _resolve()
      })
      .once('error', _err => {
        toastr.error(_err.message)
        _resolve()
      })
  })

export {
  selectOption,
  deleteOption,
  reorderOptions,
  setOptionInputs,
  buildAndExecute,
  resetBuildError,
  setOptionDisabled,
  createStrategy,
  selectStrategy
}
