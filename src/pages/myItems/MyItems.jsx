import React, { useContext } from 'react';
import "./myitems.css";
import { useEffect, useState } from 'react'
import '../../components/bids/bids.css';
import { AuthContext } from '../../context/AuthProvider';
import { toast } from 'react-toastify';
import { Bids, NFTs } from '../../components';
import { useFormik } from 'formik';

const MyItems = () => {

  const notify = (message, flag = false) => flag ? toast.success(message) : toast.error(message);
  const { isLogin, setIsLogin, userData, setUserData, web3Provider, setWeb3Provider, isConnected, setIsConnected, setAccount, account } = useContext(AuthContext)

  const formik = useFormik({
    initialValues: {
      keyword: "",
      category: 0 // listed items
    },
    onSubmit: values => {
      console.log('submitted!');
      const items = {
        keyword: values.keyword,
        category: values.category,
      };
      setSearchData(items)
      console.log(items);
      return false;
    },
    handleChange: values => {

    },
    handleSubmit: async () => {

    }
  })

  const [searchData, setSearchData] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(async () => {
    if (!isLogin || !isConnected || !account) {
      // notify("Please connect your wallet!");
      return false;
    }
    setLoading(false);
  }, [])

  return (!loading &&
    <div className='profile section__padding'>
      <div className="profile-bottom" style={{ marginTop: '150px' }}>
        <form className="profile-bottom-input" onSubmit={formik.handleSubmit}>
          <input type="text" placeholder='Search Item here' onChange={formik.handleChange} name="keyword" value={formik.values.keyword} />
          <select onChange={formik.handleChange} value={formik.values.category} name="category">
            <option value="0">Listed</option>
            <option value="1">Owned</option>
          </select>
        </form>
        {formik.values.category == "1" ? <NFTs title="My NFTs" api="user" search={searchData} /> : <Bids title="My Items" api="user" search={searchData} />}

      </div>
    </div>
  )
}

export default MyItems;