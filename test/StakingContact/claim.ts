import { expect } from "chai"
import { ethers } from "hardhat"

export default (): void => {
    it("CLAIM:Expected that after stake and claim, the balance of reward tokens will be 12e8",
        async function(): Promise<void> {
            await this.stakeInstance.mint(
                this.owner.address,
                4e9
            )
            await this.stakeInstance.approve(
                this.instance.address,
                4e9
            )
            await this.instance.stake(2e9);
            await ethers.provider.send("evm_increaseTime", [this.endTime]);
            await this.instance.stake(2e9);
            await ethers.provider.send("evm_increaseTime", [this.endTime]);
            await this.instance.claim();
    
            const balance = await this.rewardInstance.balanceOf(this.owner.address);

            expect(balance).to.eq(12e8);
        });
    it("CLAIM:Expected that after stake, unstake and claim, the balance of reward tokens will be 24e8",
        async function(): Promise<void> {
            await this.stakeInstance.mint(
                this.owner.address,
                8e9
            )
            await this.stakeInstance.approve(
                this.instance.address,
                8e9
            )
            await this.instance.stake(2e9);
            await ethers.provider.send("evm_increaseTime", [this.endTime]);
            await this.instance.stake(2e9);
            await ethers.provider.send("evm_increaseTime", [this.endTime]);
            await this.instance.unstake();
            await this.instance.stake(2e9);
            await ethers.provider.send("evm_increaseTime", [this.endTime]);
            await this.instance.stake(2e9);
            await ethers.provider.send("evm_increaseTime", [this.endTime]);
            await this.instance.claim();

            const rewardBalance = await this.rewardInstance.balanceOf(this.owner.address);
            const stakingBalance = await this.stakeInstance.balanceOf(this.owner.address);

            expect(rewardBalance).to.eq(24e8);
            expect(stakingBalance).to.eq(4e9);
        });
}