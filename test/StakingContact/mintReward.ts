import { expect } from "chai"

export default (): void => {
    it("MINT REWARD:Expected that only stacking contact can mint",
        async function (): Promise<void> {
            await expect(
                this.rewardInstance.mint(this.owner.address, 1e9)
            ).to.be.revertedWith("Only staking contract");
        }
    );
}