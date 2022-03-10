import { ethers } from "hardhat";

async function main() {
    const RewardToken = await ethers.getContractFactory("TestUniswapLiquidity");
    const rewardToken = await RewardToken.deploy();

    await rewardToken.deployed();

    console.log("Reward token deployed to:", rewardToken.address);
}

    main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
