// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers, run, network } = require("hardhat");
require("@nomiclabs/hardhat-etherscan");

async function main() {
  console.log("Deploying Network");
  const simpleStorage = await ethers.getContractFactory("SimpleStorage");
  const simpleStorageInstance = await simpleStorage.deploy();
  await simpleStorageInstance.deployed();

  console.log(
    `SimpleStorage contract deployed at ${simpleStorageInstance.address}`
  );

  if (network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY) {
    await simpleStorageInstance.deployTransaction.wait(6);
    await Verify(simpleStorageInstance.address, []);
  }

  const currentValue = await simpleStorageInstance.retrieve();
  console.log(`Current value: ${currentValue}`);

  const updateValue = await simpleStorageInstance.store(42);
  await updateValue.wait(1);

  const updatedValue = await simpleStorageInstance.retrieve();
  console.log(`Updated value: ${updatedValue}`);
}

const Verify = async (contractAddress, args) => {
  console.log(`Verifying contract ${contractAddress}`);
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes("revert")) {
      console.log(`${contractAddress} failed with args: ${args}`);
    } else if (e.message.toLowerCase().includes("already verified")) {
      console.log(`${contractAddress} Already verified`);
    } else {
      console.log(e);
    }
  }
};
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
