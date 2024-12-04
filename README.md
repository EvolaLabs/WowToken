# Wow Coin Smart Contracts Documentation

#### Overview

The Wow Coin Presale and Vesting Contracts are designed to manage the token presale and subsequent vesting schedule, ensuring compliance with the presale's terms and providing a secure and transparent framework for token distribution. The contracts work in tandem to handle payments, purchase limits, vesting schedules, and token release, integrating seamlessly with a React app interface for ease of user interaction.

## 1. Presale Contract

This contract handles the token sale, setting purchase limits, accepting payments, and interacting with the Vesting Contract to distribute tokens according to the vesting rules.

#### Key Components

**Token Price Management:** Allows the owner to set and update the price of tokens during the presale.
**Purchase Limits:** Specifies minimum and maximum purchase amounts to control participation in the presale.
**Vesting Contract Integration:** Transfers purchased tokens to the Vesting Contract for controlled release based on the vesting schedule.

#### Events:

**TokensPurchased:** Logs every token purchase with the buyer’s address and purchase amount.
**PriceUpdated:** Logs any changes to the token price, ensuring transparency.

#### Core Functions

**setVestingContract:** Links the Presale Contract to a Vesting Contract to ensure tokens are handled per the vesting schedule.
**setWallet:** Updates the wallet address to which funds from token sales are sent.
**setPresaleStatus:** Allows the owner to toggle the presale’s active state.
**buyTokens:** Enables users to purchase tokens by sending Ether, which is then calculated to an equivalent token amount and transferred to the Vesting Contract.
**endPresale:** Closes the presale and initiates the vesting schedule in the Vesting Contract.
**withdrawRemainingBalance:** Allows the owner to reclaim any unsold tokens from the contract.

## 2. Vesting Contract

This contract manages the vesting schedule, ensuring that tokens are gradually released to purchasers over time.

#### Key Components

**Vesting Schedule:** Enforces a 6-month vesting period where beneficiaries can claim 30% of tokens immediately, with the remaining tokens unlocked gradually.
**Pausable and ReentrancyGuard:** Adds security features to pause the contract if needed and protect against reentrancy attacks.
**Beneficiaries:** Tracks each participant’s purchased tokens and the amount already claimed.

#### Core Functions

**addBeneficiary:** Adds participants with their allocated tokens, controlled by the Presale Contract.
**startVesting:** Begins the vesting schedule when the presale ends.
**claimTokens:** Allows beneficiaries to claim their unlocked tokens based on the vesting period.
**getUnlockedTokens:** Calculates the number of tokens available for claim, ensuring compliance with the vesting schedule.

#### Events

**TokensClaimed:** Logs each instance of a beneficiary claiming tokens, providing transparency and tracking of token distribution.

#### License

The contract is licensed under the [MIT License](https://opensource.org/license/mit-0/).

## Deployments on Testnet

Contracts are verified deployed on Base Sepolia network with the following contract address:
**Erc20 Contract (Mock Wow):** 0x6ECAF3B1832BF9b32100D78EBF04fA93262Da067
**Presale Contract:** 0x6e3a960d49ea6595384B9CeD7131a39796985E00
**Vesting Contract:** 0xcF72904F20CA3561a09303De2B4b7B2562dd0475

## Integration with React App

**User Interface:** The React app provides an intuitive interface for users to participate in the presale, view vesting schedules, and claim tokens.
**Web3 Interactions:** Through Web3, the React app connects to the Ethereum network, allowing users to interact with both contracts directly from the app, ensuring a seamless user experience.
**Real-time Updates:** The app dynamically updates token prices, purchase limits, and vesting status, providing participants with a responsive, interactive experience.

## Gas Report

```shell
················································································································
|  Solidity and Network Configuration                                                                          │
···························|·················|···············|·················|································
|  Solidity: 0.8.27        ·  Optim: true    ·  Runs: 200    ·  viaIR: false   ·     Block: 30,000,000 gas     │
···························|·················|···············|·················|································
|  Network: ETHEREUM       ·  L1: 21 gwei                    ·                 ·        2518.61 usd/eth        │
···························|·················|···············|·················|················|···············
|  Contracts / Methods     ·  Min            ·  Max          ·  Avg            ·  # calls       ·  usd (avg)   │
···························|·················|···············|·················|················|···············
|  Erc20Contract           ·                                                                                   │
···························|·················|···············|·················|················|···············
|      transfer            ·         34,889  ·       51,989  ·         43,439  ·             2  ·        2.30  │
···························|·················|···············|·················|················|···············
|  PresaleContract         ·                                                                                   │
···························|·················|···············|·················|················|···············
|      buyTokens           ·        100,861  ·      135,061  ·        123,091  ·            60  ·        6.51  │
···························|·················|···············|·················|················|···············
|      endPresale          ·              -  ·            -  ·         53,155  ·             9  ·        2.81  │
···························|·················|···············|·················|················|···············
|      setVestingContract  ·              -  ·            -  ·         46,282  ·             1  ·        2.45  │
···························|·················|···············|·················|················|···············
|  VestingContract         ·                                                                                   │
···························|·················|···············|·················|················|···············
|      claimTokens         ·         58,662  ·       92,862  ·         79,709  ·            13  ·        4.22  │
···························|·················|···············|·················|················|···············
|  Deployments                               ·                                 ·  % of limit    ·              │
···························|·················|···············|·················|················|···············
|  Erc20Contract           ·              -  ·            -  ·        603,591  ·           2 %  ·       31.92  │
···························|·················|···············|·················|················|···············
|  PresaleContract         ·              -  ·            -  ·      1,039,645  ·         3.5 %  ·       54.99  │
···························|·················|···············|·················|················|···············
|  VestingContract         ·              -  ·            -  ·        789,097  ·         2.6 %  ·       41.74  │
···························|·················|···············|·················|················|···············
|  Key                                                                                                         │
················································································································
|  ◯  Execution gas for this method does not include intrinsic gas overhead                                    │
················································································································
|  △  Cost was non-zero but below the precision setting for the currency display (see options)                 │
················································································································
|  Toolchain:  hardhat                                                                                         │
················································································································
```
