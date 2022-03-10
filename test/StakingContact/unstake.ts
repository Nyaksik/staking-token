import { expect } from "chai";

export default (): void => {
    it("UNSTAKE:Expected that the length of the operations and the total amount after the unstake is 0",
        async function(): Promise<void> {
            await this.stakeInstance.mint(
                this.owner.address,
                9e9
            )
            await this.stakeInstance.approve(
                this.instance.address,
                9e9
            )
            await this.instance.stake(3e9);
            await this.instance.stake(3e9);
            await this.instance.stake(3e9);
            await this.instance.unstake();

            const { amount } = await this.instance
                .getStaker(this.owner.address);
            
            expect(amount).to.eq(0);
        });
    it("UNSTAKE:Balance is expected to be 9e9 after stake and unstake",
        async function(): Promise<void> {
            await this.stakeInstance.mint(
                this.owner.address,
                9e9
            )
            await this.stakeInstance.approve(
                this.instance.address,
                9e9
            )
            await this.instance.stake(3e9);
            await this.instance.stake(3e9);
            await this.instance.stake(3e9);
            await this.instance.unstake();

            const balance = await this.stakeInstance.balanceOf(this.owner.address);
            expect(balance).to.eq(9e9);
        })
    it("UNSTAKE:Expected that if the total stake is 0, \"No stakes\" will return",
        async function(): Promise<void> {
            await expect(
                this.instance.unstake()
            ).to.be.revertedWith("No stakes");
        });
}