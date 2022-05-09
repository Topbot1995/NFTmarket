import React from 'react';
import './explore.css'
import profile_banner from '../../assets/profile_banner.png'
import profile_pic from '../../assets/profile.jpg'
import Bids from '../../components/bids/Bids'

const Explore = () => {
    return (
        <div className='profile section__padding'>
        <div className="profile-bottom" style={{marginTop:'150px'}}>
          <div className="profile-bottom-input">
            <input type="text" placeholder='Search Item here' />
            <select>
              <option>Recently Listed</option>
              <option>Popular</option>
              <option>Low to High</option>
              <option>High to Low</option>
            </select>
          </div>
          <Bids   title="All Items" />
        </div>
      </div>
    )
}
export default Explore;