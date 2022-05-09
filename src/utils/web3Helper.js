import Web3 from "web3";
import { ChainUrl, CONTRACT_ADDRESS } from "../config";
import NFTMarketABI from '../ABI/croNFTMarket.json'
import NFTABI from '../ABI/croNFT.json'
import axios, { Axios } from "axios";

export const getContract = (abi, address, web3Provider) => {
    const currentWeb3 = new Web3(web3Provider);
    return new currentWeb3.eth.Contract(abi, address);
};

export const walletOfOwner = async (web3Provider = "", account) => {
    const currentWeb3 = new Web3(web3Provider);
    const marketContract = getContract(NFTMarketABI, CONTRACT_ADDRESS.marketplace, web3Provider);
    const tokenContract = getContract(NFTABI, CONTRACT_ADDRESS.token, web3Provider);
    const NFTIds = await tokenContract.methods
        .walletOfOwner(account)
        .call({ from: account }, function (err, res) {
            if (err) {
                console.log("An error occured", err);
                return false;
            }
            return res;
        });
    return NFTIds;
}

export const tokenImage = async (web3Provider = "", id) => {
    const currentWeb3 = new Web3(web3Provider);
    const marketContract = getContract(NFTMarketABI, CONTRACT_ADDRESS.marketplace, web3Provider);
    const tokenContract = getContract(NFTABI, CONTRACT_ADDRESS.token, web3Provider);
    const tokenURI = await tokenContract.methods
        .tokenURI(id)
        .call(function (err, res) {
            if (err) {
                console.log("An error occured", err);
                return;
            }
            return res;
        });
    //console.log(tokenURI);
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    const imageURL = await fetch(tokenURI, requestOptions)
    .then(response => response.text())
    .then(result => ({id:id, result: JSON.parse(result)}))
    .catch(error => ({id:id, result:{name:"undefined", image:"undefined", desc:"undefined"}}));    

    return imageURL
}

export const getAccount = async (web3Provider = "") => {
    console.log(web3Provider)
    const currentWeb3 = new Web3(web3Provider);
    let account;
    [account] = await currentWeb3.eth.getAccounts(function (error, accounts) {
        if (error) {
            return false;
        }

        return accounts[0];
    });
    if (!account) return false;
    const result = await currentWeb3.eth.personal.sign('Welcome to Our NFT Marketplace!', account, "")
        .then(res => {
            return true;
        })
        .catch(err => {
            return false;
        })
    if (!result) return false;
    return account;
}

export const addressAbbr = (address) => {
    return `${address.substr(0, 4)}...${address.substr(address.length - 4, address.length)}`;
}


