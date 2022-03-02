import { ethers } from "hardhat";

async function main() {
    const RewardToken = await ethers.getContractFactory("StakingContact");
    const rewardToken = await RewardToken.deploy(
        process.env.LP_TOKEN_ADDRESS as string,
        process.env.REWARD_TOKEN_ADDRESS as string,
        300,
        20
    );

    await rewardToken.deployed();

    console.log("Staking contract deployed to:", rewardToken.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
