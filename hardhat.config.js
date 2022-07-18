require("@nomicfoundation/hardhat-toolbox");
require("solidity-coverage");
const dotenv = require("dotenv");
dotenv.config();

const RinkebyURL = process.env.RINKEBY_RPC_URL;
const PrivateKey = process.env.PRIVATE_KEY;
const EtherScanAPIKey = process.env.ETHERSCAN_API_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: EtherScanAPIKey,
  },
  networks: {
    localhost: {
      url: "http://localhost:8545",
      chainId: 31337,
    },

    rinkeby: {
      url: RinkebyURL,
      accounts: [PrivateKey],
      chainId: 4,
    },
  },
  solidity: "0.8.9",
};
