import React from 'react';
import { Link  } from 'react-router-dom';
import "./myitems.css";
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from "web3modal"

import NFT from '../../ABI/token.json'
import Market from '../../ABI/NFTMarket.json'
import {contractAddress} from "../../config/"
import '../../components/bids/bids.css';
import { AiFillHeart,AiOutlineHeart } from "react-icons/ai";

const MyItems = () => {

    const [nfts, setNfts] = useState([])
    const [loadingState, setLoadingState] = useState('not-loaded')
    useEffect(() => {
        loadNFTs()
    }, [])
    const loadNFTs = async () => {
        /* create a generic provider and query for unsold market items */
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const tokenContract = new ethers.Contract(contractAddress.token, NFT, provider)
        const marketContract = new ethers.Contract(contractAddress.marketplace, Market, provider)
        const data = await marketContract.fetchMarketItems()        
        
        const items = await Promise.all(data.map(async i => {
            const tokenURI = await tokenContract.tokenURI(i.tokenId)
            //const meta = await axios.get(tokenURI);
            const meta = {data:{image:"https://www.innovationsusa.com/images/ui/Menu-Products-Wallcoverings-By-Material.jpg"}};
            let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
            let item = {
                price,
                tokenId: i.tokenId.toNumber(),
                seller: i.seller,
                owner: i.owner,
                image: meta.data.image,
                name: meta.data.name,
                description: meta.data.description,
            }            
            return item;
        }))

        setNfts(items)
        setLoadingState('loaded') 
    }

    const buyNFT = async nft => {
        
        const web3Modal  = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()
        const marketContract = new ethers.Contract(contractAddress.marketplace, Market, signer)
        
        const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')
        //const price =nft.price.toString()
        console.log(price, 'ether');
        const transaction = await marketContract.createMarketSale(contractAddress.token, nft.tokenId, {value: price})
        await transaction.wait()
        loadNFTs()
    }
    if (loadingState === 'loaded' && !nfts.length) return (<h1 className="px-20 py-10 text-3xl">No items in marketplace</h1>)
    return (
        <>
        <div className="flex justify-center">
      <div className="px-4" style={{ maxWidth: '1600px' }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
        <div className="bids-container-card">
          {              
            nfts.map((nft, i) => (                
                <div className="card-column" key={i} >
                  <div className="bids-card">
                    <div className="bids-card-top">
                      <img src={nft.image} alt="" />
                    <Link to={`/post/123`}>
                    <p className="bids-title">Abstact Smoke Red</p>
                    </Link>
                    </div>
                    <div className="bids-card-bottom">
                      <p>{nft.price} <span>ETH</span></p>
                      <p> <AiFillHeart /> 92</p>
                    </div>
                  </div>                  
                </div>
            ))
          }
          </div>
        </div>
      </div>
    </div>
        </>
    )  
}

export default MyItems;