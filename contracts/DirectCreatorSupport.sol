// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract DirectCreatorSupport {
    bool private entered;

    event Appreciation(
        address indexed supporter,
        address indexed creator,
        uint256 amount,
        string message
    );

    modifier nonReentrant() {
        require(!entered, "Reentrant call");
        entered = true;
        _;
        entered = false;
    }

    function appreciateCreator(address payable creator, string calldata message)
        external
        payable
        nonReentrant
    {
        require(creator != address(0), "Invalid creator");
        require(msg.value > 0, "Amount required");

        (bool sent, ) = creator.call{value: msg.value}("");
        require(sent, "Payout failed");

        emit Appreciation(msg.sender, creator, msg.value, message);
    }
}