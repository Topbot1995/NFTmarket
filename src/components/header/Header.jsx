import React, { useEffect, useState } from 'react'
import './header.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import verify from '../../assets/verify.png'
import coin from '../../assets/coin.png'
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import {HeaderLoader} from '../../utils/loaders';
import { API_URL } from '../../config';
const Header = () => {
  let settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1160,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          swipeToSlide: true,
        }
      },
      {
        breakpoint: 950,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          swipeToSlide: true,
        }
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        }
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 470,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          variableWidth: true,
        }
      }
    ]
  };

  
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(async () => {    
    setLoading(true)
    try {
      const topUsers = await api.get('/users/getTop');      
      setUsers(topUsers)
      setLoading(false)
      return false;
    } catch (error) {
      console.log(error);
    }
    return () => {
      
    }
  }, [])
  return (
    <div className='header section__padding'>      
      <div className="header-content">
        <div>
          <h1>Discover, collect, and sell extraordinary NFTs</h1>
          <img className='shake-vertical' src={coin} alt="" />
        </div>
      </div>
      <div className="header-slider">
        <h1>Top Sellers</h1>
        <Slider {...settings} className='slider'>
          {loading ? Array(5).fill('').map((value, index) => <HeaderLoader key={"HeaderLoader" + index}></HeaderLoader>) : users.map((user, index) => {
            return <div className='slider-card' key = {index}>
              <p className='slider-card-number'>{index+1}</p>
              <div className="slider-img">
                <img src={`${API_URL}${user.users_img_url}`} alt="" />
                <img src={verify} className='verify' alt="" />
              </div>
              <Link to={`/profile/${user.users_id}`}>
                <p className='slider-card-name'>{user.users_fullname}</p>
              </Link>
              <p className='slider-card-price'>{user.totalSale} <span>CRO</span></p>
            </div>
          })}
        </Slider>
      </div>
    </div>
  )
}

export default Header
