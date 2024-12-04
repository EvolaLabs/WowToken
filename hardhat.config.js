require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const BSC_API_KEY = process.env.BSC_API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },

  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    local: {
      url: "http://127.0.0.1:8545",
      accounts: [PRIVATE_KEY],
    },

    bscTestnet: {
      url: "https://data-seed-prebsc-1-s3.binance.org:8545/",
      chainId: 97,
      accounts: [PRIVATE_KEY],
    },

    bscMainnet: {
      url: "https://bsc-dataseed4.binance.org/",
      chainId: 56,
      gasPrice: 2000000000,
      accounts: [PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: BSC_API_KEY,
  },

  sourcify: {
    enabled: true,
  },

  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },

  mocha: {
    timeout: 4000000,
  },
};
