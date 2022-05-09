import React, { useEffect, useState } from 'react'
import './item.css'
import { AiFillHeart } from "react-icons/ai";
import bids2 from '../../assets/bids2.png'
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import { BidsLoader } from '../../utils/loaders';

const Item = () => {

    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(async () => {
        setLoading(true)
        try {
            const latestItems = await api.get('/items/all');
            setItems(latestItems)
            setLoading(false)
            return false;
        } catch (error) {
            console.log(error);
        }
        return () => {

        }
    }, [])

    return (
        <div className="bids-container-card">
            {!loading ? items.map((item, index) => {
                return (
                    <div className="card-column" key={index+"item"}>
                        <div className="bids-card">
                            <div className="bids-card-top">
                                <img src={item.img_url} alt="" />
                                <Link to={`/post/${item.id}`}>
                                    <p className="bids-title">{item.name}</p>
                                </Link>
                            </div>
                            <div className="bids-card-bottom">
                                <p>{item.price} <span>{item.currency.symbol}</span></p>
                                <p> <AiFillHeart /> 92</p>
                            </div>
                        </div>
                    </div>
                )
            }) : Array(8).fill('').map((value,index) => <BidsLoader key={"ItemLoader" + index}/>)}
        </div>
    )
}

export default Item
