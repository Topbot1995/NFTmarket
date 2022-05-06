import { useContext, useEffect } from "react";
import { Home, Profile, Item, Create, Login, Register, MyItems, Sell, Explore } from './pages'
import { AuthContext } from "./context/AuthProvider";
import { Routes, Route,  useNavigate, useLocation} from 'react-router-dom';
import { PUBLICROUTES } from "./config";

const ProtectedRoute = ({ isPrivate = false, element: Element, ...rest }) => {
    const { isLogin } = useContext(AuthContext);
    const navigate = useNavigate();
    const {pathname} = useLocation();
    console.log(pathname);
    
    useEffect(() => {
        if(!isLogin && !PUBLICROUTES.includes(pathname)) {            
            navigate('/login');
        }
        return () => {
        }
    }, [navigate]);

    return (
        <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/explore" exact element={<Explore />} />
            <Route path="/register" element={<Register />} />            
            <Route path=":item/:id" element={<Item />} />
            <Route path="/create" element={<Create />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/my-items" element={<MyItems />} />
            <Route path="/sell" element={<Sell />} />
        </Routes>
    )
};

export default ProtectedRoute;