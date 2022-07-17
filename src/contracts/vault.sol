// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

import "./link/VRFConsumerBase.sol";
import "./interfaces/IERC20.sol";
import {SafeMath} from "./utils/SafeMath.sol";

contract Vault {
    using SafeMath for uint256;
    uint256 donationCount;
    uint256 donationsAccumulated;

    struct donotaion {
        address sender;
        uint256 amount;
    }

    mapping(address => donotaion) donations;

    constructor() {
        donationCount = 0;
        donationsAccumulated = 0;
    }

    function depositErc20(IERC20 tokenAddress, uint256 amount) public payable {
        tokenAddress.approve(address(this), amount);
        tokenAddress.transferFrom(msg.sender, address(this), amount);

        donationsAccumulated = donationsAccumulated + amount;
        donationCount = donationCount + 1;
        donations[msg.sender] = donotaion(
            msg.sender,
            amount
        );
    }

    // function distrubuteRandomFund() public payable {

    // }
}