import { expect } from "chai";

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
    it("STAKE:Stake tx will return if \"Unverified address\"", async function (): Promise<void> {
        await expect(
            this.instance.stake(1e9)
        ).to.be.revertedWith("Unverified address");
    });
    it("STAKE:Stake tx will return if \"The amount is less than zero\"", async function (): Promise<void> {
        await this.stakeInstance.mint(this.owner.address, 1e9);
        await expect(
            this.instance.stake(0)
        ).to.be.revertedWith("The amount is less than zero");
    });
    it("STAKE:Total amount and amount of the operation of the staker is equal to 1e9", async function (): Promise<void> {
        await this.stakeInstance.mint(this.owner.address, 1e9);
        await this.stakeInstance.approve(
            this.instance.address,
            1e9
        )
        await this.instance.stake(1e9);

        const { totalAmount, operations } = await this.instance.getStaker(
            this.owner.address
        );
        const { amount } = operations[0];

        expect(totalAmount).to.eq(1e9);
        expect(amount).to.eq(1e9);
    });
}