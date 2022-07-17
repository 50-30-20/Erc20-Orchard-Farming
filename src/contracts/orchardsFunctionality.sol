// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./interfaces/IERC20.sol";
import "./interfaces/IOrchadDAO.sol";

import {SafeMath} from "./utils/SafeMath.sol";

contract OrchardFunctionality {
    IERC20 tokenAddress;
    IOrchadDAO orchardDAO;

    struct post {
        uint256 orchardId;
        string link;
        string description;
        uint256 likes;
    }

    post[] public posts;

    mapping(uint256 => post[]) public orchardsPosts;

    constructor(IERC20 _tokenAddress, IOrchadDAO _orchardDAO) {
        tokenAddress = _tokenAddress;
        orchardDAO = _orchardDAO;
    }

    function updateOrchardHarvest(uint256 orchardId) public {

    }

    function addPostsOnOrchard(uint256 orchardID, string memory link, string memory description) public {
        posts.push(
            post(
                orchardID,
                link,
                description,
                0
            )
        );
    }
}