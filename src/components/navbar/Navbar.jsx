import React, { useContext, useState } from 'react'
import './navbar.css'
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import logo from '../../assets/logo.png'
import { Link } from "react-router-dom";
import { AuthContext } from '../../context/AuthProvider';
import { addressAbbr, getAccount } from '../../utils/web3Helper';
import Web3 from 'web3';
import { ChainUrl } from '../../config';
import { removeStoredAuthToken } from '../../utils/authToken';
import { useNavigate } from 'react-router-dom';

const Menu = () => (
  <>
    <Link to="/explore"><p>Explore</p> </Link>
    <Link to="/my-items"><p>My Items</p> </Link>
    <Link to="/collections"><p>Collections</p> </Link>
  </>
)

const Navbar = () => {
  const { isLogin, setIsLogin, userData, setUserData, web3Provider, setWeb3Provider, isConnected, setIsConnected, setAccount, account } = useContext(AuthContext)
  const [toggleMenu, setToggleMenu] = useState(false)
  const navigate = useNavigate();


  const handleLogout = () => {
    removeStoredAuthToken();
    setIsLogin(false);
    navigate('/');
  }
  const handleLogin = () => {

  }

  const connect = async () => {
    if (window.ethereum == undefined || !window.ethereum.isMetaMask) {
      return false;
    }

    let provider = null;

    if (window.ethereum) {
      provider = window.ethereum;
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
      } catch (error) {
        console.log("User denied account access");
        return false;
      }
    } else if (window.web3) {
      provider = window.web3.currentProvider;
    } else {

      provider = new Web3.providers.HttpProvider(ChainUrl);
    }

    if (!provider) return false;

    setWeb3Provider(provider);
    try {
      const wallet = await getAccount(provider);
      if(!wallet) return false;
      setAccount(wallet);
      console.log(wallet)
    }
    catch (err) {
      return err;
    }
    setIsConnected(true);
  }

  return (
    <div className='navbar'>
      <div className="navbar-links">
        <div className="navbar-links_logo">
          <img src={logo} alt="logo" />
          <Link to="/">
            <h1>CryptoKet</h1>
          </Link>
        </div>
        <div className="navbar-links_container">
          <input type="text" placeholder='Search Item Here' autoFocus={true} />
          <Menu />
          {isLogin && <Link to="/"><p onClick={handleLogout}>Logout</p></Link>}

        </div>
      </div>
      <div className="navbar-sign">
        {isLogin ? (
          <>
            <Link to={`/create`}>
              <button type='button' className='primary-btn' >Create</button>
            </Link>
            <button type='button' className='secondary-btn' onClick={() => connect()}>{isConnected ? addressAbbr(account) : "Connect"}</button>
          </>
        ) : (
          <>
            <Link to="/login">
              <button type='button' className='primary-btn' onClick={handleLogin} >Sign In</button>
            </Link>
            <Link to="/register">
              <button type='button' className='secondary-btn'>Sign Up</button>
            </Link>
          </>
        )}



      </div>
      <div className="navbar-menu">
        {toggleMenu ?
          <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
        {toggleMenu && (
          <div className="navbar-menu_container scale-up-center" >
            <div className="navbar-menu_container-links">
              <Menu />
            </div>
            <div className="navbar-menu_container-links-sign">
              {isLogin ? (
                <>
                  <Link to="/create">
                    <button type='button' className='primary-btn' >Create</button>
                  </Link>
                  <button type='button' className='secondary-btn'>Connect</button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <button type='button' className='primary-btn' onClick={handleLogin} >Sign In</button>
                  </Link>
                  <Link to="/register">
                    <button type='button' className='secondary-btn'>Sign Up</button>
                  </Link>
                </>
              )}

            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar

