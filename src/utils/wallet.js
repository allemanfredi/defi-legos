export const setupNetwork = ({
  provider,
  chainId,
  chainName,
  nativeCurrency: { name, symbol, decimals },
  nodes,
  blockExplorerUrls
}) =>
  provider.request({
    method: 'wallet_addEthereumChain',
    params: [
      {
        chainId: `0x${chainId.toString(16)}`,
        chainName,
        nativeCurrency: {
          name,
          symbol,
          decimals
        },
        rpcUrls: nodes,
        blockExplorerUrls
      }
    ]
  })