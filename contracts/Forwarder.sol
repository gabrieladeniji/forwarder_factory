// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Forwarder {

    address payable destinationAddress;

    constructor(address payable _destination) {
        destinationAddress = _destination;
    }

    function flush() public {
        destinationAddress.transfer(address(this).balance);
    }

    function flushERC20(address tokenContractAddress) public {
        IERC20 tokenContract = ERC20(tokenContractAddress);
        uint256 forwarderBalance = tokenContract.balanceOf(address(this));
        tokenContract.transfer(destinationAddress, forwarderBalance);
    }

}
