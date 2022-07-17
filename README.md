# Orchard
The project aims to support Orchards (fruit & Nut farming) for fruitfully harvest.

Technical Flow:-
1) Orchards register their farms, which are represented as NFT with attributes including the sq area of the land, Name of the fruits grown, etc.
2) User supports these farms ( real life farm) they stake (donate) on the platform.
3) To keep things fair so small Orchards too can raise collateral. The donations are distributed randomly.
4) The random choice is computed from chainlink VRF so the donation to orchards is fair and unpredictable.
5) The yield is returned to donators (stakers) by orchards by the amount raised by the harvest. The harvest reward is represented as ERC20 (mock DAI, USDT) but in real case scenario it would ETH etc


# How it's made

Orchard application makes use of the following softwares:

### `NFTStorage`: for data storage on IPFS that generates a transation hash used to create an NFT of a photo.
###  `Solidity`:  for the smart contract
###  `OpenZeppelin ERC721`:  we use the ERC721 template for a faster development of the Orchards smart contract
###  `Ganache`:  for local blockchain development
###  `Rinkeby`: the network I deployed the app
###  `React Js, Material-ui,  Web3`: React Js for the frontend,  Material-ui and Web3 to connect to blockchain.
###  `Chainlink`: To generate random number so funds are distributed randomly I have used Chainlink VRF.

## Demo
- [Home Page](https://i.imgur.com/WaQ2Ru9.png)
<img src="https://i.imgur.com/WaQ2Ru9.png" width="950" height="490" />
- [Donate Page](https://i.imgur.com/FHMHw0x.png)
<img src="https://i.imgur.com/FHMHw0x.png" width="950" height="490" />
- [Create DAO Proposal](https://i.imgur.com/2XVgmwl.png) 
<img src="https://i.imgur.com/2XVgmwl.png" width="950" height="490" />
- [Vote / Stake / Donate] (https://i.imgur.com/wSoQJOL.png)<br> <br>
<img src="https://i.imgur.com/wSoQJOL.png" width="950" height="490" />

# Getting Started
### `yarn start`

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
