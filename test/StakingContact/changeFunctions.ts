import { expect } from "chai";

export default (): void => {
    it("END TIME:End time is equal to the parameter when the deployment",
        async function (): Promise<void> {
            const time = await this.instance.endTime();

            expect(time).to.eq(this.endTime);
        }
    );
    it("END TIME:End time will change to 2000 seconds",
        async function (): Promise<void> {
            await this.instance.changeEndTime(2000);

            const time = await this.instance.endTime();

            expect(time).to.eq(this.endTime * 2);
        }
    );
    it("END TIME:Only the owner can change",
        async function (): Promise<void> {
            await expect(
                this.instance.connect(this.addr1).changeEndTime(2000)
            ).to.be.revertedWith(
                "AccessControl: account 0x70997970c51812dc3a010c7d01b50e0d17dc79c8 is missing role 0xb19546dff01e856fb3f010c267a7b1c60363cf8a4664e21cc89c26224620214e"
            )
        }
    );
    it("STAKING PERCENT:Staking percent is equal to the parameter when the deployment",
        async function (): Promise<void> {
            const percent = await this.instance.stakingPercent();

            expect(percent).to.eq(this.stakingPercent);
        }
    );
    it("STAKING PERCENT:Staking percent will change to 40 percent",
        async function (): Promise<void> {
            await this.instance.changeStakingPercent(40);

            const percent = await this.instance.stakingPercent();

            expect(percent).to.eq(this.stakingPercent * 2);
        }
    );
    it("STAKING PERCENT:Only the owner can change",
        async function (): Promise<void> {
            await expect(
                this.instance.connect(this.addr1).changeStakingPercent(2000)
            ).to.be.revertedWith(
                "AccessControl: account 0x70997970c51812dc3a010c7d01b50e0d17dc79c8 is missing role 0xb19546dff01e856fb3f010c267a7b1c60363cf8a4664e21cc89c26224620214e"
            )
        }
    );
}