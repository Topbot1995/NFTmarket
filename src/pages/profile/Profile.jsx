import React, { useContext, useEffect, useState } from 'react';
import './profile.css'
import profile_banner from '../../assets/profile_banner.png'
import profile_pic from '../../assets/profile.jpg'
import Bids from '../../components/bids/Bids'
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthProvider';
import api from '../../utils/api';
import { API_URL } from '../../config';

const Profile = () => {

  let { id } = useParams();

  const { isLogin, userData, setUserData } = useContext(AuthContext)

  const notify = (message, flag = false) => flag ? toast.success(message) : toast.error(message);

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(true)

  useEffect(async () => {

    const user = await api.get(`/users/${id}`)
      .then(res => {
        console.log(res)
        setUser(res)
        setLoading(false)
      })
      .catch(err => {
        console.log(err);
        return err
      });    
    return () => {

    }
  }, [])

  return ( !loading && 
    <div className='profile section__padding'>
      <div className="profile-top">
        <div className="profile-banner">
          <img src={profile_banner} alt="banner" />
        </div>
        <div className="profile-pic">
          <img src={`${API_URL}${user.img_url}`} alt="profile" />
          <h3>{user.fullname}</h3>
        </div>
      </div>
      <div className="profile-bottom">
        <div className="profile-bottom-input">
          <input type="text" placeholder='Search Item here' />
          <select>
            <option>Recently Listed</option>
            <option>Popular</option>
            <option>Low to High</option>
            <option>High to Low</option>
          </select>
        </div>
        <Bids title="Item" api="getUser" id = {id}/>
      </div>
    </div>
  );
};

export default Profile;
