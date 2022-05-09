import React, { useContext, useEffect, useState } from 'react';
import './nft.css'
import item from '../../assets/item1.png'
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import { CONTRACT_ADDRESS } from '../../config';
import { getContract, tokenImage } from '../../utils/web3Helper';
import NFTMarketABI from '../../ABI/croNFTMarket.json'
import NFTABI from '../../ABI/croNFT.json'
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import api from '../../utils/api';
import Web3 from 'web3';


const NFT = () => {

  const { userData, setUserData } = useContext(AuthContext)

  const notify = (message, flag = false) => flag ? toast.success(message) : toast.error(message);

  const { web3Provider, isConnected, account } = useContext(AuthContext)

  const { id } = useParams();

  const [price, setPrice] = useState({})
  const [currencies, setCurrencies] = useState([])
  const [itemData, setItemData] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(async () => {
    if (!isConnected || !account || itemData == {}) {
      return false;
    }
    const data = await tokenImage(web3Provider, id)
    setItemData(data)
    console.log(data);
    const currencies1 = await api.get(`/currencies/all`);
    setCurrencies(currencies1)
    setLoading(false)
    return () => {

    }
  }, [])

  const validate = values => {
    const errors = {};
    if (!values.priceValue) {
      errors.priceValue = 'Required';
    } else if (values.priceValue <= 0) {
      errors.priceValue = 'Invalid amount!';
    }

    if (!values.currency) {
      errors.currency = 'Required';
    }

    return errors;
  };


  const formik = useFormik({
    initialValues: {
      priceValue: 0,
      currency: '1' // listed items
    },
    onSubmit: async values => {
      console.log('submitted!');
      return false;
    },
    validate,
    handleChange: values => {
      setPrice(values)
      console.log(values);
    },
    handleSubmit: async () => {

    }
  })

  const inputChange = () => {

  }

  const listItem = async () => {
    if (!isConnected || !account || itemData == {}) {
      notify("Please connect your wallet!");
      return false;
    }    

    const marketContract = getContract(NFTMarketABI, CONTRACT_ADDRESS.marketplace, web3Provider);
    const tokenContract = getContract(NFTABI, CONTRACT_ADDRESS.token, web3Provider);
    await tokenContract.methods
      .setApprovalForAll(CONTRACT_ADDRESS.marketplace, true)
      .send({ from: account }, function (err, res) {
        if (err) {
          console.log("An error occured", err);
          return false;
        }
        return res;
      });

    const param1 = Array(1).fill(id)
    const param2 = Array(1).fill(currencies.filter(item => item.id == formik.values.currency)[0].address)
    const param3 = Array(1).fill(Web3.utils.toWei(formik.values.priceValue.toString()))

    console.log(param1, param2, param3)

    await marketContract.methods
      .listing(param1, param2, param3)
      .send({ from: account }, function (err, res) {
        if (err) {
          console.log("An error occured", err);
          return;
        }
        return res;
      })
      .then(async res => {
        const value = { nft_id: id, creator: userData.userId, price: formik.values.priceValue, collection: CONTRACT_ADDRESS.token, currency: formik.values.currency, owner: userData.userId, name: itemData.result.name, desc: itemData.result.desc, img_url: itemData.result.image }
        await api.post(`/items/create`, value)
          .then(res => {
            console.log(res);
          });
      })
      .catch(err => {
        console.log(err)
        return false;
      });

  }

  return (!loading &&
    <div className='item section__padding'>
      <div className="item-image">
        <img src={itemData.result.image} alt="item" />
      </div>
      <div className="item-content">
        <div className="item-content-title">
          <h1>{itemData.result.name}</h1>
        </div>
        <div className="item-content-creator">
          <div><p>Creater</p></div>
          <div>
          </div>
        </div>
        <div className="item-content-detail">
          <p>{itemData.result.desc}</p>
        </div>
        <div className="item-content-buy">
          <form className="profile-bottom-input" onSubmit={formik.handleSubmit}>
            <input type="number" placeholder='Search Item here' onChange={formik.handleChange} name="priceValue" value={formik.values.priceValue} />
            <select onChange={formik.handleChange} value={formik.values.currency} name="currency">
              {currencies.map((currency, index) => <option key={"currency" + index} value={currency.id}>{currency.symbol}</option>)}
            </select>
            <button className="primary-btn list-btn" type="submit" onClick={() => { listItem() }}>List NFT</button>
          </form>
          {(formik.errors.priceValue || formik.errors.currency) ? <div className="error-div">ERROR!</div> : ""}
        </div>
      </div>
    </div>
  )
};

export default NFT;
