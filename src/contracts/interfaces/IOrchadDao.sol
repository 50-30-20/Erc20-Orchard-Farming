// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IOrchadDAO {
 
    struct orchards {
        uint256 orchardId;
        string name;
        string link;
        string country;
        string farm;
        uint256 areaSize;
        bool accepted;
        bool stakesAccumulated;
        uint256 stakesGathered;
    }

    function getProposal(uint256 proposalId) external view returns(orchards memory);
}