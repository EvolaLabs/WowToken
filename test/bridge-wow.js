const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");

const MINIMUM_LOCK_AMOUNT = ethers.parseEther("0.1");
const MAXIMUM_CONTRACT_BALANCE = ethers.parseEther("1");

const MINIMUM_BRIDGE_AMOUNT_BSC = ethers.parseEther("5");

describe("Token Vesting", function () {
  async function deployAllContracts() {
    const [owner, COLD_WALLET, MODERATOR, buyer1, buyer2, buyer3] =
      await ethers.getSigners();

    const BRIDGE_WOW = await ethers.getContractFactory("BridgeWow");
    const WOW_TOKEN = await ethers.getContractFactory("WowToken");
    const BRIDGE_BSC = await ethers.getContractFactory("BridgeBsc");

    const BridgeWow = await upgrades.deployProxy(
      BRIDGE_WOW,
      [MINIMUM_LOCK_AMOUNT, COLD_WALLET.address, MAXIMUM_CONTRACT_BALANCE],
      {
        initializer: "initialise",
      }
    );

    const WowToken = await upgrades.deployProxy(WOW_TOKEN, {
      initializer: "initialise",
    });

    const BridgeBsc = await upgrades.deployProxy(
      BRIDGE_BSC,
      [WowToken.target, MINIMUM_BRIDGE_AMOUNT_BSC, MODERATOR.address],
      {
        initializer: "initialise",
      }
    );

    return {
      BridgeWow,
      WowToken,
      BridgeBsc,
      owner,
      MODERATOR,
      COLD_WALLET,
      buyer1,
      buyer2,
      buyer3,
    };
  }

  describe("Deployment", function () {
    it("Should set the right parameter values in ERC20 Token", async function () {
      const { BridgeWow, owner, buyer1, COLD_WALLET } = await loadFixture(
        deployAllContracts
      );
      let _owner = await BridgeWow.owner();
      console.log(_owner);
      console.log(owner.address);

      let coldWalletBal = await ethers.provider.getBalance(COLD_WALLET.address);
      console.log(
        "Cold wallet bal before unlock",
        ethers.formatEther(coldWalletBal)
      );
      await buyer1.sendTransaction({
        to: BridgeWow.target,
        value: ethers.parseEther("1"),
      });

      await buyer1.sendTransaction({
        to: BridgeWow.target,
        value: ethers.parseEther("5000"),
      });

      // await BridgeWow.connect(buyer1).lockCoins({
      //   value: ethers.parseEther("1"),
      // });

      let newBal = await ethers.provider.getBalance(BridgeWow.target);
      let ownerBal = await ethers.provider.getBalance(owner.address);
      console.log("Contract bal Before unlock", ethers.formatEther(newBal));
      console.log("Owner bal Before unlock", ethers.formatEther(ownerBal));

      await BridgeWow.unlockCoins(buyer1.address, ethers.parseEther("1"));

      newBal = await ethers.provider.getBalance(BridgeWow.target);
      ownerBal = await ethers.provider.getBalance(owner.address);
      coldWalletBal = await ethers.provider.getBalance(COLD_WALLET.address);

      console.log("Contract bal After unlock", ethers.formatEther(newBal));
      console.log("Owner bal After unlock", ethers.formatEther(ownerBal));
      console.log(
        "Cold wallet bal After unlock",
        ethers.formatEther(coldWalletBal)
      );
    });

    it("Roles should work as expected", async () => {
      const {
        BridgeWow,
        WowToken,
        BridgeBsc,
        owner,
        MODERATOR,
        buyer1,
        COLD_WALLET,
      } = await loadFixture(deployAllContracts);
      let success = await BridgeBsc.connect(MODERATOR).testRole();
      console.log(success);
    });
  });
});
