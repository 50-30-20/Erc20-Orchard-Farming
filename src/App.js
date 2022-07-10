import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'
import { Navbar } from './components/layout/navbar/Navbar'
import Footer from './components/layout/footer/Footer'
import Home from './components/home/Home'
import PetDetails from './components/home/pet-details/PetDetails'
import CreatePet from './components/create-post/CreatePet'

import Web3 from 'web3'
import MyPet from './abis/Pet.json'

function App() {
  const [account, setAccount] = React.useState('')
  const [contractData, setContractData] = React.useState('')

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)

      await window.ethereum.enable()
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    } else {
      window.alert(
        'Non-Ethereum browser detected. You should consider trying MetaMask!',
      )
    }

    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    setAccount(accounts[0])
    const networkId = await web3.eth.net.getId()
    const networkData = MyPet.networks[networkId]

    if (networkData) {
      const abi = MyPet.abi
      const address = MyPet.networks[networkId].address
      const myContract = new web3.eth.Contract(abi, address)
      setContractData(myContract)
    } else {
      window.alert('Contract is not deployed to detectednetwork')
    }
  }

  return (
    <Router>
      <div className="cl">
        <Navbar account={account} loadWeb3={loadWeb3} />
        <Route exact path="/" component={Home} />
        <Switch>
          <Route exact path="/create-pet" component={CreatePet} />

          <Route path="/pet-details/:petId">
            <PetDetails account={account} contractData={contractData} />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  )
}

export default App
