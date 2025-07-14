const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("Escrow", function () {
  let contract;
  let depositor;
  let beneficiary;
  let arbiter;
  const deposit = ethers.parseEther("1");
  beforeEach(async () => {
    [depositor, beneficiary, arbiter] = await ethers.getSigners();
    const Escrow = await ethers.getContractFactory("Escrow");
    contract = await Escrow.deploy(
      arbiter.getAddress(),
      beneficiary.getAddress(),
      {
        value: deposit,
      }
    );
    await contract.waitForDeployment();
  });

  it("should be funded initially", async function () {
    let balance = await ethers.provider.getBalance(await contract.getAddress());
    expect(balance).to.eq(deposit);
  });

  describe("after approval from address other than the arbiter", () => {
    it("should revert", async () => {
      await expect(contract.connect(beneficiary).approve()).to.be.reverted;
    });
  });

  describe("after approval from the arbiter", () => {
    it("should transfer balance to beneficiary", async () => {
      const before = await ethers.provider.getBalance(beneficiary.getAddress());
      const approveTxn = await contract.connect(arbiter).approve();
      await approveTxn.wait();
      const after = await ethers.provider.getBalance(beneficiary.getAddress());
      expect(after - before).to.eq(deposit);
    });
  });
});
