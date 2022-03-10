import { task } from "hardhat/config";

const FACTORY = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f";
const ROUTER = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
const WETH = "0xc778417E063141139Fce010982780140Aa0cD5Ab";

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

task("createPair", "Claim")
    .setAction(async (_, { ethers }) => {
        const [signer] = await ethers.getSigners();
        const instance = await ethers.getContractAt(
            "IUniswapV2Factory",
            FACTORY,
            signer
        );
        const pair = await instance.createPair(
            WETH,
            process.env.CONTRACT_ADDRESS as string,
        )

        console.log(pair)
    })

task("getPair", "Claim")
    .setAction(async (_, { ethers }) => {
        const [signer] = await ethers.getSigners();
        const instance = await ethers.getContractAt(
            "IUniswapV2Factory",
            FACTORY,
            signer
        );

        const pair = await instance.getPair(process.env.CONTRACT_ADDRESS as string, WETH)

        console.log(pair)
    })

task("addLiquidity", "Claim")
    .setAction(async (_, { ethers }) => {
        const [signer] = await ethers.getSigners()
        const IRouter = await ethers.getContractAt(
            "IUniswapV2Router",
            ROUTER
        )
        const ERC20 = await ethers.getContractFactory("RewardToken")
        const tokenA = await ERC20.attach(WETH)
        const tokenB = await ERC20.attach(process.env.CONTRACT_ADDRESS as string)

        console.log("Tokens attached")

        const ethValue = await ethers.utils.parseEther("0.01")
        const nyanCoinValue = await ethers.utils.parseEther("2500")
        const txEth = await tokenA.approve(
            ROUTER,
            ethValue
        )

        txEth.wait()

        console.log("TokenA approve")

        const txNyanCoin = await tokenB.approve(
            ROUTER,
            nyanCoinValue
        )

        txNyanCoin.wait()

        console.log("TokenB approve")

        const blockNumber = await ethers.provider.getBlockNumber()
        const block = await ethers.provider.getBlock(blockNumber)
        const addLiquidity = await IRouter.addLiquidity(
            WETH,
            process.env.CONTRACT_ADDRESS as string,
            ethValue,
            nyanCoinValue,
            1,
            1,
            signer.address,
            block.timestamp + 100
        )

        addLiquidity.wait()

        console.log("LP created")
    })