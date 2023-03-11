import App from './App';
import { Routes, Route, Navigate } from "react-router-dom";
import Admin from './components/Admin/Admin';
import Home from './components/Home/Home';
import { ToastContainer, toast } from 'react-toastify';
import Login from './Auth/Login';
import 'react-toastify/dist/ReactToastify.css';
import Signup from './Auth/Signup';
import PrivateRoutes from './routes/PrivateRoutes';
import DetailProduct from './components/Products/DetailProduct';
import Checkout from './components/Checkout/Checkout';
import Profile from './components/Profile/Profile';
import SearchOrder from './components/SearchOrder/SearchOrder';


function Layout(props) {

    return (
        <>
            <Routes>
                <Route path="/" element={<App />} >
                    <Route index element={<Home />} />

                    <Route path="/admin" element={<PrivateRoutes><Admin /></PrivateRoutes>} />
                    <Route path="/product/:id" element={<DetailProduct />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/profile" element={<PrivateRoutes><Profile /></PrivateRoutes>} />
                    <Route path="/search-order/:id" element={<SearchOrder />} />
                    <Route path="/search-order/" element={<SearchOrder />} />

                </Route>

                <Route path='/login' element={<Login />} />

                <Route path='/signup' element={<Signup />} />
            </Routes>


            <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
}

export default Layout;