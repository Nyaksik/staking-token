# Staking contact project

# Link

- __[Link to the stacking contract](https://rinkeby.etherscan.io/address/0x2e3B0E7DCd2E0aeb56B67c6c24173CC0f64E82FF)__ (Rinkeby test network)
- __[Link to the reward token contract](https://rinkeby.etherscan.io/address/0x3b0475bd7e8511a2eda0318e90a7b9a505506400#writeContract/)__ (Rinkeby test network)
- __[Link to the LP token contract](https://rinkeby.etherscan.io/address/0xdc1d1a85f8de7ce48139cd3cbc61dabe2e85c4c3)__ (Rinkeby test network)

# Staking contract

 > __Staking is when you invest your tokens into the network, and get a reward for doing it.__

## Calculation formula

In my contract, the calculation of reward tokens takes place using a simple formula.

```JavaScript
    rewardTokenAmount = cycles * stakingTokenAmount

    // rewardTokenAmount - amount of reward tokens
    // cycles - count of rounds that have passed during the stake
    // stakingTokenAmount - amount of reward tokens for one cycle

    cycles = (unstakeTime - stakeTime) / endTime

    // unstakeTime - time when the "unstake" or "claim" method was called
    // stakeTime - time when the stake method was called
    // endTime - time period for which interest is charged 

    stakingTokenAmount = amountStake * percentStake / 100

    // amountStake - stake amount
    // percentStake - percentage of accrual of reward tokens from stacked tokens
```

## Basic tasks for interacting with a contract

### Stake

This task makes a stake on the contract by sending LP tokens to the balance of the staking contract from the sender's balance. (Approximate scheme of work on the graph.)

```JavaScript
npx hardhat stake --network rinkeby --amount [STAKE_AMOUNT]
```

[![](https://mermaid.ink/img/pako:eNpFj7sOgzAMRX8l8gw_kKESj3bqUIlupINFDEQ0CQpmqIB_b2ip6ulK5_haXqDxmkBCF3Dsxb1UTsTJ6opxMK4TjXccsOGHSNOTyOvrTbAfyP3BdyPf-WqJe69XUdSRuamlcAneHkrxqcggAUvBotHx7LIjBdyTJQUyRo1hUKDcFr151Mh01oZ9ANnic6IEcGZfvVwDksNMP6k0GF-wh7W9AYMIR0I)](https://mermaid.live/edit#pako:eNpFj7sOgzAMRX8l8gw_kKESj3bqUIlupINFDEQ0CQpmqIB_b2ip6ulK5_haXqDxmkBCF3Dsxb1UTsTJ6opxMK4TjXccsOGHSNOTyOvrTbAfyP3BdyPf-WqJe69XUdSRuamlcAneHkrxqcggAUvBotHx7LIjBdyTJQUyRo1hUKDcFr151Mh01oZ9ANnic6IEcGZfvVwDksNMP6k0GF-wh7W9AYMIR0I)

### Unstake

This task takes all shares from the contract for the LP token contract and claims reward tokens to the sender's balance. (Approximate scheme of work on the graph.)

```JavaScript
npx hardhat unstake --network rinkeby
```

[![](https://mermaid.ink/img/pako:eNptkLFuwjAQQH_Fuhn4gAyVgIQuHRB0szuc4iOxEp-RfVFVEf4dAwntUE-W3rtnnS9QB0tQQBPx3KrP0rDKZ62Pgp3jRtWBJWItX2q5fFMbfaBvjFZJ6Ih_4TSVnSxV-mP_v7C5R0ZP0gY7qq32jme0faD4rKMPA8uoSu1Ts0rEluLkVY83Xo2dzn1OpxffPTn2vUrTCnPt_W8NFuApenQ2L3-5zxqQljwZKPLVYuwMGL5mbzhbFKqskxChOGGfaAE4SDj-cA2FxIFmqXSYP9JP1vUGRvl0hA)](https://mermaid.live/edit#pako:eNptkLFuwjAQQH_Fuhn4gAyVgIQuHRB0szuc4iOxEp-RfVFVEf4dAwntUE-W3rtnnS9QB0tQQBPx3KrP0rDKZ62Pgp3jRtWBJWItX2q5fFMbfaBvjFZJ6Ih_4TSVnSxV-mP_v7C5R0ZP0gY7qq32jme0faD4rKMPA8uoSu1Ts0rEluLkVY83Xo2dzn1OpxffPTn2vUrTCnPt_W8NFuApenQ2L3-5zxqQljwZKPLVYuwMGL5mbzhbFKqskxChOGGfaAE4SDj-cA2FxIFmqXSYP9JP1vUGRvl0hA)


### Claim

This task claims reward tokens on the sender's balance. (Approximate scheme of work on the graph.)

```JavaScript
npx hardhat claim --network rinkeby
```

[![](https://mermaid.ink/img/pako:eNpFj0sKwkAMQK8yZF09QBeCtV7AuptxETqxHepkJE0Rsb274w-zCrz3IHlAmzxBCZ3gtTfH2rHJs7WN4hC4M21iFWz1ZFarjansgW4o3mgaiP_wU1UvZ46kffKz2dkY-Id2bySfGGOaWGdT2zh265HYk5yggEgSMfh8zeNVOdCeIjko8-pRBgeOl-xNV49Kex80CZRnvIxUAE6amju3UKpM9JPqgPmz-LWWJwwEUKw)](https://mermaid.live/edit#pako:eNpFj0sKwkAMQK8yZF09QBeCtV7AuptxETqxHepkJE0Rsb274w-zCrz3IHlAmzxBCZ3gtTfH2rHJs7WN4hC4M21iFWz1ZFarjansgW4o3mgaiP_wU1UvZ46kffKz2dkY-Id2bySfGGOaWGdT2zh265HYk5yggEgSMfh8zeNVOdCeIjko8-pRBgeOl-xNV49Kex80CZRnvIxUAE6amju3UKpM9JPqgPmz-LWWJwwEUKw)

### Change end time

This task allows you to change the period for which reward tokens are accrued.

```JavaScript
npx hardhat changeEndTime --network rinkeby --time [END_TIME]
```

### Change staking percent

This task allows you to change the percentage of reward tokens accrued from stacked tokens.

```JavaScript
npx hardhat changeStakingPercent --network rinkeby --time [STAKING_PERCENT]
```

### Change reward token

This task allows you to change the contract of reward tokens.

```JavaScript
npx hardhat changeRewardToken --network rinkeby --time [REWARD_TOKEN_ADDRESS]
```

# Reward token

__Standard token ERС20. Added minter modifier for staking contract.__

# Staking token

__Standard token ERС20. Needed for local tests and checking the correct operation of the staking contract methods.__

# Basic commands

## Use it to launch a local blockchain

```TypeScript
npx hardhat node
// or
npm run start
```

## Use it to compile the contract

```TypeScript
npx hardhat clean && npx hardhat compile
// or
npm run compile
```

## Use it to deploy the contract locally

- __Deploy stacking contract__

```TypeScript
npx hardhat run scripts/deploy.ts --network localhost
// or
npm run local
```

- __Deploy reward token__

```TypeScript
npx hardhat run scripts/deployReward.ts --network localhost
```

## Use it to deploy the contract in the rinkeby test network

- __Deploy stacking contract__

```TypeScript
npx hardhat run scripts/deploy.ts --network rinkeby
// or
npm run rinkeby
```

- __Deploy reward token__

```TypeScript
npx hardhat run scripts/deployReward.ts --network rinkeby
```

## Use it to test

```TypeScript
npx hardhat test
// or
npm run test
```

## Use it to view the test coverage

```TypeScript
npx hardhat coverage
// or
npm run coverage
```

## Use it to view global options and available tasks

```TypeScript
npx hardhat help
// or
npm run help
```

# Etherscan verification

To try out Etherscan verification, you first need to deploy a contract to an Ethereum network that's supported by Etherscan, such as Ropsten.

In this project, copy the .env.example file to a file named .env, and then edit it to fill in the details. Enter your Etherscan API key, your Ropsten node URL (eg from Alchemy), and the private key of the account which will send the deployment transaction. With a valid .env file in place, first deploy your contract:

```TypeScript
npx hardhat run scripts/deploy.ts --network rinkeby
// or
npm run rinkeby
```

Then, copy the deployment address and paste it in to replace `DEPLOYED_CONTRACT_ADDRESS` in this command:

```TypeScript
npx hardhat verify --network rinkeby DEPLOYED_CONTRACT_ADDRESS
```

# Performance optimizations

For faster runs of your tests and scripts, consider skipping ts-node's type checking by setting the environment variable `TS_NODE_TRANSPILE_ONLY` to `1` in hardhat's environment. For more details see [the documentation](https://hardhat.org/guides/typescript.html#performance-optimizations).
