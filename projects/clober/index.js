const abi = require("./abi.json");
const { sumTokens2 } = require('../helper/unwrapLPs')

const FACTORY = "0x93A43391978BFC0bc708d5f55b0Abe7A9ede1B91"

async function tvl(_, _b, _cb, { api }) {
    let tokenAddresses = await api.fetchList({  lengthAbi: abi.nonce, itemAbi: abi.computeTokenAddress, target: FACTORY}) 
    tokenAddresses = tokenAddresses.flat()
    const markets = await api.multiCall({  abi: abi.market, calls: tokenAddresses })
    const base = await api.multiCall({  abi: abi.baseToken, calls: markets}) 
    const quote = await api.multiCall({  abi: abi.quoteToken, calls: markets})
    const ownerTokens = markets.map((v, i) => ([[base[i], quote[i]], v]))
    return sumTokens2({ api, ownerTokens })
}
module.exports = {
    methodology: "TVL consists of assets deposited into market contracts",
    ethereum: { tvl },
    polygon: { tvl },
    arbitrum: { tvl }
}