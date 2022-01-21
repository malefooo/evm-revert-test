// SPDX-License-Identifier: MIT
pragma solidity ^0.6.12;

import './interface/ITestB.sol';

contract TestC {

    uint256 public aValue = 1;

    address[] public newAddrs;

    bool[] public newPasses;

    constructor() public {

    }

    function doTest(address[] calldata addrs,  bool[] calldata passes, uint256 value) external {
        aValue += value;
        bool pass = passes[passes.length - 1];
        if(addrs.length > 1){
            newAddrs = addrs;
            newPasses = passes;
            newAddrs.pop();
            newPasses.pop();
            (bool success, bytes memory data) = newAddrs[newAddrs.length - 1].call(abi.encodeWithSelector(0x8c7fdd66, newAddrs, newPasses, value));
        }
        require(pass, 'failed');
    }
}