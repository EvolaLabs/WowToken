// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract WowToken is ERC20, ERC20Permit {
    constructor() ERC20("WOW EARN", "WOW") ERC20Permit("WOW EARN") {
        _mint(msg.sender, 1_000_000_000 ether);
    }
}
