import BigNumber from 'bignumber.js'

const searchByVaultId = async ({ fixedInputs, dsa, mgr, index }) => {
  try {
    const vaultId = fixedInputs[0] // NOTE: vault_id is always at 0 position
    const { ilk } = await mgr.getCdp(parseInt(vaultId))
    const symbol = ilk.toLowerCase().split('-')[0]
    const decimals = dsa.tokens.info[symbol.toLowerCase()].decimals
    return BigNumber(fixedInputs[index])
      .multipliedBy(10 ** decimals)
      .toFixed()
  } catch (_err) {
    throw _err
  }
}

export { searchByVaultId }
