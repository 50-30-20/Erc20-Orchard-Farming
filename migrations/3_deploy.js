const Vault = artifacts.require('Vault')
const Orchard = artifacts.require('Orchard')
const OrchardDAO = artifacts.require('OrchardDAO')
const OrchardFunctionality = artifacts.require('OrchardFunctionality')
const ChainlinkSelector = artifacts.require('ChainlinkSelector')

const RINKEBY_VRF_COORDINATOR = '0xb3dCcb4Cf7a26f6cf6B120Cf5A73875B7BBc655B'
const RINKEBY_LINKTOKEN = '0x01BE23585060835E02B77ef475b0Cc51aA1e0709'
const RINKEBY_KEYHASH = '0x2ed0feb3e7fd2022120aa84fab1945545a9f2ffc9076fd6156fa96eaff4c1311'

module.exports = async function (deployer) {
    await deployer.deploy(Vault)

    await deployer.deploy(Orchard)
    const token = await Orchard.deployed()

    await deployer.deploy(OrchardDAO, token.address)
    const orchardDAO = await OrchardDAO.deployed()

    await deployer.deploy(OrchardFunctionality, token.address, orchardDAO.address)

    await deployer.deploy(ChainlinkSelector, RINKEBY_VRF_COORDINATOR, RINKEBY_LINKTOKEN, RINKEBY_KEYHASH)
}
