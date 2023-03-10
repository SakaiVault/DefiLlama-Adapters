const { sumTokensExport, } = require('../helper/unknownTokens')

module.exports = {
  methodology: 'count the amount of ankr BNB in the vault', 
  bsc: {
    tvl: sumTokensExport({ chain: 'bsc', owner: '0x25b21472c073095bebC681001Cbf165f849eEe5E', tokens: [
      '0x52F24a5e03aee338Da5fd9Df68D2b6FAe1178827', // ankrBNB
    ] }),
  }
}
