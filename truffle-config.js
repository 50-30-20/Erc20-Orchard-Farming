require('dotenv').config();
require('babel-register')
require('babel-polyfill')

const HDWalletProvider = require('@truffle/hdwallet-provider')
//const mnemonic = process.env.MNEMONIC.toString().trim()

console.log(process.env.METAMASK_WALLET_SECRET);


module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 7545,
      network_id: '*', // Match any network id
    },
    matic: {
      provider: () =>
        new HDWalletProvider(process.env.METAMASK_WALLET_SECRET, `https://rpc-mumbai.matic.today`),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
    rinkeby: {
      provider: function () {
        return new HDWalletProvider(
          process.env.METAMASK_WALLET_SECRET,
          'https://rinkeby.infura.io/v3/e95c6744ded94bbe81e881b8ca002ce7'
        )
      },
      networkCheckTimeout: 100000,
      network_id: 4,
      skipDryRun: true
    }
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      version: '0.8.1+commit.c7dfd78e',
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
}
