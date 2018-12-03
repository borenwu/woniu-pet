import React from 'react'
import Web3 from 'web3'
import TruffleContract from 'truffle-contract'
import AdoptionJson from './truffle/Adoption.json'
import { Button } from 'antd';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.web3 = null
        this.Adoption = null
        this.init()
        this.state = {

        }
    }

    init() {
        if (typeof window.web3 != 'undefined') {
            this.web3Provider = window.web3.currentProvider;
        } else {
            alert('请安装metamask')
        }
        this.web3 = new Web3(this.web3Provider)
        this.initAdoption()
    }

    initAdoption() {
        this.Adoption = TruffleContract(AdoptionJson)
        this.Adoption.setProvider(this.web3Provider)
        return this.markAdopted()
    }

    async markAdopted() {
        const adoptionInstance = await this.Adoption.deployed()
        const adapters = await adoptionInstance.getAdopters.call()
        console.log(adapters)
    }

    async adopt(petId){
        const account = window.web3.eth.defaultAccount
        const adoptionInstance = await this.Adoption.deployed()
        await adoptionInstance.adopt(petId,{from:account})
        this.markAdopted()
    }

    render() {
        return <Button type="primary" onClick={()=>this.adopt(0)}>领养第0个</Button>
    }
}

export default App
