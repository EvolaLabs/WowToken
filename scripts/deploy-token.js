const { ethers } = require("hardhat");

async function main() {
  try {
    const WOW_TOKEN = await ethers.getContractFactory("WowToken");

    const WowToken = await WOW_TOKEN.deploy();

    console.log(`
    ----------------- WOW_TOKEN -----------------
    ${WowToken.target}
    ---------------------------------------------
  `);

    await WowToken.waitForDeployment();

    console.log(`Verify Bsc wow Token:
    npx hardhat verify --network bscMainnet ${WowToken.target}`);
  } catch (error) {}
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
