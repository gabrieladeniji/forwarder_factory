// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

import "./Forwarder.sol";

contract ForwarderFactory {

    event Deployed(address _address, uint256 _salt);

    function getByteCode(address destination) private pure returns (bytes memory) {
        bytes memory bytecode = type(Forwarder).creationCode;
        return abi.encodePacked( bytecode, abi.encode( address(destination) ) );
    }

    function getComputedAddress(address destination, uint _salt) public view returns (address) {
        bytes memory bytecode = getByteCode(destination);
        bytes32 hash = keccak256(
            abi.encodePacked(
                bytes1(0xff),
                address(this),
                _salt,
                keccak256(bytecode)
            )
        );
        return address(uint160(uint256(hash)));
    }

    function initForwarder(address payable destination, uint256 _salt) public {
        address _address;
        bytes memory bytecode = getByteCode(destination);
        assembly {
            _address := create2(
                callvalue(),
                add(bytecode, 0x20),
                mload(bytecode),
                _salt
            )
            if iszero(extcodesize(_address)) {
                revert(0, 0)
            }
        }
        emit Deployed(_address, _salt);
    }

}
