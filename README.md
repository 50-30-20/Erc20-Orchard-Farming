# PetGram
PetGram is a decentralized version of the Instagram platform where each viewer pays to have access to the exclusive content of their favorite pets. This creates a more strong relationship between pets and fans which allows fans to connect with their favorite pet in a more personalized way.  Whenever a viewer goes to PetGram will be able to check sample works from different pets, see details from specific pets and unlock exclusive content. The data is stored on IPFS and the generated hash will be used to create an NFT of a photo.


# How it's made
PetGram application makes use of the following softwares:
### `NFTStorage` for data storage on IPFS that generates a transation hash used to create an NFT of a photo.

### `Unlock Protocol` to allow users to pay for exclusive content this protocol was a big part of our use case.

###  `Solidity`  for the smart contract
###  `OpenZeppelin ERC721`  we use the ERC721 template for a faster development of the PetGram smart contract

###  `Ganache`  for local blockchain development
 ###  `Polygon, Matic Network` the network I deployed the app
###  `React Js, Material-ui,  Web3` React Js for the frontend,  Material-ui and Web3 to connect to blockchain.

## Demo
- [Home Page](https://6119c859fed150c8471f90fd--petgrams.netlify.app/)
  ![Main Page](https://raw.githubusercontent.com/electrone901/petgram/main/src/images/cover.png) <br> <br>

# Getting Started
### `yarn start`

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
