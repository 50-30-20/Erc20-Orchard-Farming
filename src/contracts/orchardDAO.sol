// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

import "./interfaces/IERC20.sol";
import {SafeMath} from "./utils/SafeMath.sol";

contract OrchardDAO  is ERC721URIStorage {
    using SafeMath for uint256;
    
    uint256 public orchardsCount;
    uint256 public tokenId;
    uint256 public minimumStake;
    IERC20 governanceToken;

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
        address payable orchardAddress;
    }

    struct orchardDonation {
        uint256 orchardId;
        address payable sender;
        uint256 amount;
    }

    orchardDonation[] public donationsLedger;

    mapping(uint256 => orchards) public proposals;
    mapping(uint256 => mapping(address => orchardDonation)) public userDonations;
    mapping(uint256 => orchardDonation[]) public orchardsAllDonations;

    constructor(IERC20 tokenAddress) ERC721("TrophyChar", "TRP"){
        orchardsCount = 0;
        minimumStake = 10 ether;
        governanceToken = tokenAddress;
    } 

    function orchardProposal(
        string memory name, 
        string memory link, 
        string memory country,
        string memory farm,
        uint256 areaSize,
        address payable orchardAddress
    ) public {
        orchardsCount = orchardsCount + 1;
        tokenId = tokenId + 1;

        proposals[orchardsCount] = orchards(
            orchardsCount,
            name,
            link,
            country,
            farm,
            areaSize,
            false,
            false,
            0,
            orchardAddress
        );

        _safeMint(address(this), tokenId);
    }

    function delagateStake(uint256 proposalId, uint256 amount) public {
        require(amount != 0, "Please specify an amount");

        governanceToken.transferFrom(msg.sender, address(this), amount);

        orchards memory _orchards = proposals[proposalId];

        _orchards.stakesGathered = _orchards.stakesGathered + amount;
        
        if(_orchards.stakesGathered >= minimumStake) {
            _orchards.stakesAccumulated = true;
            _orchards.accepted = true;
        }

        proposals[proposalId] = _orchards;
    }

    function getProposal(uint256 proposalId) public view returns(orchards memory){
        return proposals[proposalId];
    }

    function getOrchardDonation(uint256 orchardId) public view returns(orchardDonation[] memory){
        return orchardsAllDonations[orchardId];
    }

    function donateToOrchard(uint256 orchardId, uint256 amount) public payable {
        orchards memory _orchards = proposals[orchardId];

        require(_orchards.accepted, "Orchard Not Accepted By DAO");

        orchardDonation memory _donation = userDonations[orchardId][msg.sender];

        _donation.amount = _donation.amount + amount;
        _donation.sender = payable(msg.sender);
        _donation.orchardId = orchardId;

        userDonations[orchardId][msg.sender] = _donation;

        donationsLedger.push(
            orchardDonation(
                orchardId,
                payable(msg.sender),
                amount
            )
        );

        orchardsAllDonations[orchardId] = donationsLedger;

        _orchards.orchardAddress.transfer(amount);
    } 
}