// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Pet is ERC721 {
    event PetNFTCreated (
        uint tokenId,
        string imageURL,
        uint date,
        address payable from
    );

    constructor() ERC721("Pet", "PET") public  {}

    // function mintPetNFT(string memory _tokenURI) external {
    //     uint _tokenId = totalSupply().add(1);
    //     _safeMint(msg.sender, _tokenId);
    //     _setTokenURI(_tokenId, _tokenURI);

    //     emit PetNFTCreated(_tokenId, _tokenURI, now, msg.sender);
    // }

}

