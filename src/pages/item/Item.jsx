import React, { useContext, useEffect, useState } from 'react';
import './item.css'
import creator from '../../assets/seller2.png'
import item from '../../assets/item1.png'
import { useParams } from 'react-router-dom';
import api from '../../utils/api';
import { AuthContext } from '../../context/AuthProvider';
import { CONTRACT_ADDRESS } from '../../config';
import { getContract } from '../../utils/web3Helper';
import NFTMarketABI from '../../ABI/croNFTMarket.json'
import croABI from '../../ABI/croERC20.json'
import { toast } from 'react-toastify';
import Web3 from 'web3';

const Item = () => {

  const notify = (message, flag = false) => flag ? toast.success(message) : toast.error(message);

  const { web3Provider, isConnected, account, userData } = useContext(AuthContext)

  const { id } = useParams();

  const [itemData, setItemData] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(async () => {
    try {
      const item1 = await api.get(`/items/${id}`);
      setItemData(item1)
      setLoading(false)
      return false;
    } catch (error) {
      console.log("ERROR" + error);
    }
    return () => {

    }
  }, [])

  const buyItem = async () => {
    if (!isConnected || !account || itemData == {}) {
      notify("Please connect your wallet!");
      return false;
    }
    //buy token

    const marketContract = getContract(NFTMarketABI, CONTRACT_ADDRESS.marketplace, web3Provider);
    const tokenContract = getContract(croABI, CONTRACT_ADDRESS.nativeToken, web3Provider);
    const price = Web3.utils.toWei(itemData.price.toString());

    await tokenContract.methods
      .approve(CONTRACT_ADDRESS.marketplace, price)
      .send({ from: account }, function (err, res) {
        if (err) {
          console.log("An error occured", err);
          return;
        }
        return res;
      });
    await marketContract.methods
      .buy(itemData.nft_id, price)
      .send({ from: account }, function (err, res) {
        if (err) {
          console.log("An error occured", err);
          return;
        }
        return res;
      })
      .then(async (res) => {
        const item1 = await api.get(`/items/delete/${itemData.id}`);
        const transaction = {item: itemData.id, seller: itemData.owner.id, buyer: userData.userId, currency: itemData.currency.id, sold_price: itemData.price}
        await api.get(`/transactions/create`, transaction);
        return false;
      })
      .catch(err => {

      });

  }

  // const updatePrice = async () => {
  //   if (!isConnected || !account || itemData == {}) {
  //     notify("Please connect your wallet!");
  //     return false;
  //   }
  //   //buy token
  //   const marketContract = getContract(NFTMarketABI, CONTRACT_ADDRESS.marketplace, web3Provider);
    
  //   const price = Web3.utils.toWei(itemData.price.toString());
  // }

  const unList = async () => {
    if (!isConnected || !account || itemData == {}) {
      notify("Please connect your wallet!");
      return false;
    }

    const marketContract = getContract(NFTMarketABI, CONTRACT_ADDRESS.marketplace, web3Provider);

    const items = Array(1).fill(itemData.nft_id);

    await marketContract.methods
    .unListing(items)
    .send({ from: account }, function (err, res) {
      if (err) {
        console.log("An error occured", err);
        return;
      }
      return res;
    })
    .then(async (res) => {
      const item1 = await api.get(`/items/delete/${id}`);
      return false;
    })
    .catch(err => {

    });

  }

  return (!loading &&
    <div className='item section__padding'>
      <div className="item-image">
        <img src={itemData.img_url} alt="item" />
      </div>
      <div className="item-content">
        <div className="item-content-title">
          <h1>{itemData.name}</h1>
          <p>From <span>{itemData.price} {itemData.currency.symbol}</span></p>
        </div>
        <div className="item-content-creator">
          <div><p>Creater</p></div>
          <div>
            <img src={creator} alt="creator" />
            <p>{itemData.creator.nickname}</p>
          </div>
        </div>
        <div className="item-content-detail">
          <p>{itemData.desc}</p>
        </div>
        <div className="item-content-buy">
          <button className="primary-btn" onClick={() => { buyItem() }}>Buy For {itemData.price} {itemData.currency.symbol}</button>
          {/* {userData && itemData.creator.id == userData.userId ? <button className="secondary-btn" onClick={() => { updatePrice() }}>Update Price</button> : <button className="primary-btn" onClick={() => { buyItem() }}>Buy For {itemData.price} {itemData.currency.symbol}</button>} */}
          {userData && itemData.creator.id == userData.userId && <button className="primary-btn list-btn" onClick={() => { unList() }}>Unlist</button>}
        </div>
      </div>
    </div>
  )
};

export default Item;
