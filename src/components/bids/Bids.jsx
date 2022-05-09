import React, { useContext, useEffect, useState } from 'react'
import './bids.css'
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import bids1 from '../../assets/bids1.png'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import apiCall from '../../utils/api';
import { BidsLoader } from '../../utils/loaders';

const Bids = ({ title, api, search, id }) => {

  const [itemData, setItemData] = useState([])
  const [loading, setLoading] = useState(true)


  const { userData } = useContext(AuthContext)

  useEffect(async () => {
    let url = "";    

    if (api == 'user' && userData) {
      url = `/items/user/${userData.userId}`;
    } else if (api == "getUser") {
      url = `/items/user/${id}`
    } else {
      url = `/items/all`;
    }

    await apiCall.get(url)
      .then(res => {
        setItemData(res)        
        setLoading(false)        
      })
      .catch(err => {
        setLoading(true)
      });

    return () => {

    }
  }, [])

  // useEffect(async () => {
  //   let itemsListed = [];
  //   if (api == 'user') {
  //     itemsListed = await apiCall.get(`/items/user/${59}`, search);
  //   } else {
  //     itemsListed = await apiCall.get(`/items/all`, search);
  //   }
  //   console.log(itemsListed)

  //   setItemData(itemsListed)
  //   return () => {

  //   }
  // }, [search])

  return (
    <div className='bids section__padding'>
      <div className="bids-container">
        <div className="bids-container-text">
          <h1>{title}</h1>
        </div>
        <div className="bids-container-card">
          {!loading ? itemData.map((value, index) => {
            return (
              <div className="card-column" key={"bid" + index}>
                <div className="bids-card">
                  <div className="bids-card-top">
                    <img src={value.img_url} alt="" />
                    <Link to={`/post/${value.id}`}>
                      <p className="bids-title">{value.name}</p>
                    </Link>
                  </div>
                  <div className="bids-card-bottom">
                    <p>{value.price} <span>{value.currency.symbol}</span></p>
                    <p> <AiFillHeart /> 92</p>
                  </div>
                </div>
              </div>
            )
          }): Array(8).fill('').map((value,index) => <BidsLoader key={"BidsLoader" + index}/>)}
        </div>
      </div>
      <div className="load-more">
        <button>Load More</button>
      </div>
    </div>
  )
}

export default Bids
