import React from 'react';
import { Header, Item } from '../../components'

const Home = () => {

  return (
    <div>
      <Header />
      <div className='bids section__padding'>
        <div className="bids-container">
          <div className="bids-container-text">
            <h1>Latest Works</h1>
          </div>
          <Item />
          <div className="load-more">
            <button>Load More</button>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Home;
