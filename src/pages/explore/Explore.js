import React from 'react';
import './explore.css'
import profile_banner from '../../assets/profile_banner.png'
import profile_pic from '../../assets/profile.jpg'
import Bids from '../../components/bids/Bids'

const Explore = () => {
    return (
        <div className='profile section__padding'>
        <div className="profile-top">
          <div className="profile-banner">
            <img src={profile_banner} alt="banner" />
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
          <Bids   title="Item" />
        </div>
      </div>
    )
}
export default Explore;