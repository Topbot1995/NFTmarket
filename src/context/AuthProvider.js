import React, { createContext, useState, useEffect } from 'react';
import { RES_SUCCESS_CODE } from '../config';
import api from '../utils/api';
import { getStoredAuthToken } from '../utils/authToken';
import jwt_decode from "jwt-decode";

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false);
    const [userData, setUserData] = useState({});
    const [allItems, setAllItems] = useState([]);
    const [web3Provider, setWeb3Provider] = useState("");
    const [isConnected, setIsConnected] = useState(false);
    const [account, setAccount] = useState("");

    // fake

    useEffect(async () => {
        await api.post('/users/refresh-token')
            .then(res => {
                if (res.code == RES_SUCCESS_CODE) {
                    setIsLogin(true);
                    const { userId, email, fullname, nickname } = jwt_decode(getStoredAuthToken());
                    setUserData({ userId, email, fullname, nickname });

                }
            })
        // setUserData({userId : 59, email : "topbot1995@gmail.com ", fullname:"David Roadman", nickname : "topbot" });
        return () => {

        }
    }, [])

    return (
        <AuthContext.Provider value={{
            isLogin,
            setIsLogin,
            userData,
            setUserData,
            allItems,
            setAllItems,
            web3Provider,
            setWeb3Provider,
            isConnected,
            setIsConnected,
            account,
            setAccount
        }}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthProvider;
