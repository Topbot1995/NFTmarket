import './create.css'
import Image from '../../assets/Image.png'
import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import axios from 'axios';
import NFT from '../../ABI/token.json'
import Market from '../../ABI/NFTMarket.json'
import {APPID, contractAddress, SERVERURL, WEB3APIKEY} from "../../config/"
import propTypes from 'react';
import { pinFileToIPFS } from '../../api/pinata'

const Create = () => {
  
  const [fileUrl,setFileUrl] = useState(null);
  const [formInput, updateFormInput] = useState({name : "", price : "", desc: "", category: "", availItems: "", file: ""});

  useEffect(()=>{
    console.log(formInput);
  }, [formInput])

  const createItem = async () => {

    const data = formInput.file;
    let result = await pinFileToIPFS(data);
    console.log(result.data.IpfsHash);
    createSale(result.data.IpfsHash)    
  }

  const createSale = async url => {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    let contract = new ethers.Contract(contractAddress.token, NFT, signer);
    let transaction = await contract.createToken(url)
    let tx = await transaction.wait()
    let event = tx.events[0]
    let value = event.args[2]
    let tokenId = value.toNumber()
    const price = ethers.utils.parseUnits(formInput.price, 'ether');

    contract = new ethers.Contract(contractAddress.marketplace, Market, signer)
    let listing = formInput.price*2/100
    listing = listing.toString();
    let listingPrice = ethers.utils.parseUnits(listing, 'ether');
    
    transaction = await contract.createMarketItem(contractAddress.token, tokenId, price, {value: listingPrice})
    await transaction.wait()    
  }

  return (
    <div className='create section__padding'>
      <div className="create-container">
        <h1>Create new Item</h1>
        <p className='upload-file'>Upload File</p>
        <div className="upload-img-show">
            <h3>JPG, PNG, GIF, SVG, WEBM, MP3, MP4. Max 100mb.</h3>
            <img src={Image} alt="banner" />
            <p>Drag and Drop File</p>
        </div>
        <form className='writeForm' autoComplete='off' action='javascript:void(0)'>
          
          <div className="formGroup">
            <label>Upload</label>
            <input type="file" className='custom-file-input' onChange={(e)=>{updateFormInput({...formInput, file: e.target.files[0]}); console.log(formInput)}}
          />
          </div>
          <div className="formGroup">
            <label>Name</label>
            <input type="text" placeholder='Item Name' autoFocus={true} onChange={(e)=>{updateFormInput({...formInput, name: e.target.value})}}/>
          </div>
          <div className="formGroup">
            <label>Description</label>
            <textarea type="text" rows={4}
          placeholder='Decription of your item' onChange={(e)=>{updateFormInput({...formInput, desc: e.target.text})}}
          ></textarea>
          </div>
          <div className="formGroup">
            <label>Price</label>
            <div className="twoForm">
              <input type="text" placeholder='Price'  onChange={(e)=>{updateFormInput({...formInput, price: e.target.value})}}/>
              <select>
                <option value="ETH">ETH</option>
                <option value="BTC">BTC</option>
                <option value="LTC">LTC</option>
              </select>
            </div>
          </div>
          <div className="formGroup">
            <label>Category</label>
            <select onChange={(e)=>{updateFormInput({...formInput, category: e.target.value})}}>
               <option value="art">Art</option>
               <option value="photo">Photography</option>
               <option value="sports">Sports</option>
               <option value="collec">Collectibles</option>
               <option value="trading">Trading Cards</option>
               <option value="util">Utility</option>
            </select>
          </div>
          <div className="formGroup">
            <label>Available Items</label>
            <input type="text" placeholder='No of Items' onChange={(e)=>{updateFormInput({...formInput, availItems: e.target.value})}}/>
          </div>
          <button className='writeButton' onClick={()=>{createItem()}}>Create Item</button>
        </form>
      </div>
    </div>
   
  )
};

export default Create;
