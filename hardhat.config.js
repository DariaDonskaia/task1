require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-web3");
require("./tasks/task.js");
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.3",
  networks: {
    rinkeby: {
    url: `https://eth-rinkeby.alchemyapi.io/v2/${alchemyApiKey}`,
    accounts: { mnemonic: mnemonic },
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./tests",
    cache: "./cache",
    artifacts: "./artifacts",
    task: "./tasks"
  },
};
