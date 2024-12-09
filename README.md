# WOW EARN Token

A standard ERC20 token implementation for the WOW EARN project.

## Overview

WOW EARN Token (WOW) is a fixed-supply ERC20 token with the following specifications:
- Total Supply: 1,000,000,000 (1 billion) tokens
- Decimals: 18
- Name: "WOW EARN"
- Symbol: "WOW"

## Technical Details

The contract is implemented using Solidity version 0.8.20 and follows the ERC20 standard. It includes:
- Standard ERC20 functionality (transfer, approve, transferFrom)
- Fixed supply minted at deployment
- No additional minting capability
- No burning mechanism
- No special privileges or admin functions

## Security Features

- Built on OpenZeppelin's battle-tested ERC20 implementation
- Uses custom errors for gas-efficient error handling
- No external dependencies beyond standard OpenZeppelin contracts
- No complex logic that could introduce vulnerabilities

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Gas Report

```shell
|  Contract          ·  Method        ·  Min        ·  Max        ·  Avg        ·  # calls      │
·····················|················|·············|·············|·············|···············
|  WowToken          ·  transfer      ·      34,889 ·      51,989 ·      43,439 ·            2  │
·····················|················|·············|·············|·············|···············
|  Deployment        ·                ·           - ·           - ·     603,591 ·            1  │
```

## Deployments

[Addresses will be added after deployment]
