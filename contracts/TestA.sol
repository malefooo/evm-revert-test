// SPDX-License-Identifier: MIT
pragma solidity ^0.6.12;

import './interface/ITestB.sol';

contract TestA {

    uint256 public aValue = 8;

    constructor() public {

    }

    function doTest(address testb, uint256 value, bool aSuccess, bool bSuccess) external {
        aValue += value;
        // ITestB(testb).checkValue(value, bSuccess);
        (bool success, bytes memory data) = testb.call(abi.encodeWithSelector(0x08729312, value, bSuccess));
        require(aSuccess, 'aSuccess');
    }
}