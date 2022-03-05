import { artifacts, ethers, waffle } from "hardhat"
import { Artifact } from "hardhat/types";
import stake from "./stake";
import unstake from "./unstake";
import claim from "./claim";
import changeFunctions from "./changeFunctions";
import mintReward from "./mintReward";

describe("Staking contract testing", async function () {
    before(async function() {
        this.zeroAddress = "0x0000000000000000000000000000000000000000";
        [this.owner, this.addr1, this.addr2] = await ethers.getSigners();
        this.endTime = 1000;
        this.stakingPercent = 20500;
    });
    beforeEach(async function() {
        const stakeArtifact: Artifact = await artifacts.readArtifact("StakingToken");
        this.stakeInstance = await waffle.deployContract(
            this.owner,
            stakeArtifact,
            []
        );
        const artifact: Artifact = await artifacts.readArtifact("StakingContract");
        const deployPayload = [
            this.stakeInstance.address,
            this.addr1.address,
            this.endTime,
            this.stakingPercent,
        ];
        this.instance = await waffle.deployContract(
            this.owner,
            artifact,
            deployPayload
        );
        const rewardArtifact: Artifact = await artifacts.readArtifact("RewardToken");
        this.rewardInstance = await waffle.deployContract(
            this.owner,
            rewardArtifact,
            [this.instance.address]
        );
        this.instance.changeRewardToken(this.rewardInstance.address)
    });
    stake();
    unstake();
    claim();
    changeFunctions();
    mintReward();
});