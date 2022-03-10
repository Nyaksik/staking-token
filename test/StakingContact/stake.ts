import { expect } from "chai";
import { ethers } from "hardhat";

export default (): void => {
    it("STAKE:Initial total staked amount is 0", async function (): Promise<void> {
        const balance = await this.instance.totalStaked();

        expect(balance).to.eq(0);
    });
    it("STAKE:Total sum of the stakes is 1e9", async function (): Promise<void> {
        await this.stakeInstance.mint(this.owner.address, 1e9);
        await this.stakeInstance.approve(
            this.instance.address,
            1e9
        );
        await this.instance.stake(1e9);

        const totalStaked = await this.instance.totalStaked();

        expect(totalStaked).to.eq(1e9);
    });
    it("STAKE:Stake tx will return if \"The amount exceeds the allowance\"", async function (): Promise<void> {
        await this.stakeInstance.mint(this.owner.address, 1e9);
        await this.stakeInstance.approve(
            this.instance.address,
            1e9
        );
        await expect(
            this.instance.stake(1e10)
        ).to.be.revertedWith("The amount exceeds the allowance");
    });
    it("STAKE:Stake tx will return if \"The amount is less than zero\"", async function (): Promise<void> {
        await expect(
            this.instance.stake(0)
        ).to.be.revertedWith("The amount is less than zero");
    });
    it("STAKE:Stake tx will return if \"The amount is less than zero\"", async function (): Promise<void> {
        await this.stakeInstance.mint(this.owner.address, 1e9);
        await expect(
            this.instance.stake(0)
        ).to.be.revertedWith("The amount is less than zero");
    });
    it("STAKE:Expected that after the stake the amount of the staker is 1e9 ", async function (): Promise<void> {
        await this.stakeInstance.mint(this.owner.address, 1e9);
        await this.stakeInstance.approve(
            this.instance.address,
            1e9
        )
        await this.instance.stake(1e9);

        const { amount } = await this.instance.getStaker(
            this.owner.address
        );

        expect(amount).to.eq(1e9);
    });
    it("STAKE:Expected that if the cyclesCount is greater than 0, the claim will be triggered", async function (): Promise<void> {
        await this.stakeInstance.mint(this.owner.address, 2e9);
        await this.stakeInstance.approve(
            this.instance.address,
            2e9
        )
        await this.instance.stake(1e9);
        await ethers.provider.send("evm_increaseTime", [this.endTime]);
        await this.instance.stake(1e9);
        
        const balance = await this.rewardInstance.balanceOf(this.owner.address);

        expect(balance).to.eq(2e8);
    });
}