import { ethers } from "hardhat";

async function main() {
  const RewardToken = await ethers.getContractFactory("RewardToken");
  const rewardToken = await RewardToken.deploy(process.env.LP_TOKEN_ADDRESS as string);

  await rewardToken.deployed();

  console.log("Reward token deployed to:", rewardToken.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
