// SPDX-License-Identifier: MIT
pragma solidity ^0.6.12;

contract TestB {

    uint256 public bValue;

    constructor() public {

    }

    function checkValue(uint256 value, bool success) external {
        bValue += value;
        require(success, 'bSuccess');
    }


}