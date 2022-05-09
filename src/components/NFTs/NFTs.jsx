import React, { useContext, useEffect, useState } from 'react'
import './nft.css'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import { tokenImage, walletOfOwner } from '../../utils/web3Helper';
import { BidsLoader } from '../../utils/loaders';

const NFTs = ({ title, api, search }) => {

  const [tokenIds, setTokenIds] = useState([])
  const [NFTData, setNFTData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(async () => {
    let URIs = [];
    setLoading(true)
    const NFTIds = await walletOfOwner(web3Provider, account);
    if (NFTIds) {
      setTokenIds(NFTIds)
    } else {
      return false;
    }
    await Promise.all(NFTIds.map(async (value, index) => {
      const data = await tokenImage(web3Provider, value)
      return URIs.push(data)
    })).then(() => {
      setNFTData(URIs)
      console.log(URIs)
      setLoading(false)
    }).catch(err => {
      console.log("ERROR")
      setLoading(true)
    });
    return () => {

    }
  }, [])

  const { isLogin, setIsLogin, userData, setUserData, web3Provider, setWeb3Provider, isConnected, setIsConnected, setAccount, account } = useContext(AuthContext)

  return (
    <div className='bids section__padding'>
      <div className="bids-container">
        <div className="bids-container-text">
          <h1>{title}</h1>
        </div>
        <div className="bids-container-card" >
          {!loading ? NFTData.map((value, index) => {
            return (
              <div className="card-column" key={"nft" + index}>
                <div className="bids-card">
                  <div className="bids-card-top">
                    <img src={value.result.image} alt="" />
                    <Link to={`/nft/${value.id}`}>
                      <p className="bids-title">{value.result.name}</p>
                    </Link>
                  </div>
                  <div className="bids-card-bottom">
                    {/* <p>1.25 <span>ETH</span></p> */}
                    {/* <p> <AiFillHeart /> 92</p> */}
                  </div>
                </div>
              </div>
            )
          }) : Array(8).fill('').map((value,index) => <BidsLoader key={"NFTsLoader" + index}/>)}
        </div>
      </div>
      <div className="load-more">
        <button>Load More</button>
      </div>
    </div>
  )
}

export default NFTs
