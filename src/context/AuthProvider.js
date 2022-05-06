import React, { createContext, useState, useEffect } from 'react';
import api from '../utils/api';

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false);
    const [userData, setUserData] = useState({});
    const [allItems, setAllItems] = useState([]);

    return (
        <AuthContext.Provider value={{
            isLogin,
            setIsLogin,
            userData,
            setUserData,
            allItems,
            setAllItems
        }}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthProvider;
