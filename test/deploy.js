const { ethers } = require("hardhat");
const { expect, assert } = require("chai");
//test name
describe.only("SimpleStorage", () => {
  let simpleStorageFactory, simpleStorage;

  beforeEach(async () => {
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await simpleStorageFactory.deploy();
  });

  it("Should deploy a contract", async () => {
    expect(simpleStorage.address).to.exist;
  });

  it("Should store a value", async () => {
    const expectedValue = "0";
    const actualValue = await simpleStorage.retrieve();
    assert.equal(actualValue.toString(), expectedValue);
  });

  it("Should store a value", async () => {
    const expectedValue = "7";
    const transactionResponse = await simpleStorage.store(expectedValue);
    await transactionResponse.wait(1);
    const actualValue = await simpleStorage.retrieve();
    assert.equal(actualValue.toString(), expectedValue);
  });
});
