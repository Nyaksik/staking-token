import { task } from "hardhat/config";

task("changeEndTime", "Change reward token")
    .addParam("time", "Set end time")
    .setAction(async ({ time }: { time: string}, { ethers }) => {
        const [signer] = await ethers.getSigners();
        const instance = await ethers.getContractAt(
            "StakingContract",
            process.env.STAKING_CONTRACT_ADDRESS as string,
            signer
        );

        await instance.changeEndTime(time);

        console.log(`End time has been changed to ${time}`);
    })

task("changeStakingPercent", "Change reward token")
    .addParam("percent", "Set staking percent")
    .setAction(async ({ percent }: { percent: string}, { ethers }) => {
        const [signer] = await ethers.getSigners();
        const instance = await ethers.getContractAt(
            "StakingContract",
            process.env.STAKING_CONTRACT_ADDRESS as string,
            signer
        );

        await instance.changeStakingPercent(percent);

        console.log(`Percent has been changed to ${percent}`);
    })

task("changeRewardToken", "Change reward token")
    .addParam("address", "Reward token address")
    .setAction(async ({ address }: { address: string}, { ethers }) => {
        const [signer] = await ethers.getSigners();
        const instance = await ethers.getContractAt(
            "StakingContract",
            process.env.STAKING_CONTRACT_ADDRESS as string,
            signer
        );

        await instance.changeRewardToken(address);

        console.log(`Address has been changed to ${address}`);
    })

task("stake", "Stake")
    .addParam("amount", "Amount of tokens")
    .setAction(async ({ amount }: { amount: string }, { ethers }) => {
        const [signer] = await ethers.getSigners();
        const instance = await ethers.getContractAt(
            "StakingContract",
            process.env.STAKING_CONTRACT_ADDRESS as string,
            signer
        );

        await instance.stake(amount);

        console.log(`${signer} made a stake in the amount: ${amount}`);
    })

task("unstake", "Unstake")
    .setAction(async (_, { ethers }) => {
        const [signer] = await ethers.getSigners();
        const instance = await ethers.getContractAt(
            "StakingContract",
            process.env.STAKING_CONTRACT_ADDRESS as string,
            signer
        );

        await instance.unstake();

        console.log(`${signer} took all the stakes`);
    })

task("claim", "Claim")
    .setAction(async (_, { ethers }) => {
        const [signer] = await ethers.getSigners();
        const instance = await ethers.getContractAt(
            "StakingContract",
            process.env.STAKING_CONTRACT_ADDRESS as string,
            signer
        );

        await instance.claim();

        console.log(`${signer} made a claim`);
    })

task("a", "Claim")
.setAction(async (_, { ethers }) => {
    const [signer] = await ethers.getSigners();
    const instance = await ethers.getContractAt(
        "NyanNyanCoin",
        "0xB04418602c83C3AC8187a2f7b3c778B9CF9ed568",
        signer
    );

    console.log(`${instance} made a claim`);
})