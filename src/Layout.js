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


function Layout(props) {

    return (
        <>
            <Routes>
                <Route path="/" element={<App />} >
                    <Route index element={<Home />} />

                    <Route path="/admin" element={<PrivateRoutes><Admin /></PrivateRoutes>} />
                    <Route path="/product/:id" element={<DetailProduct />} />

                </Route>

                <Route path='/login' element={<Login />} />

                <Route path='/signup' element={<Signup />} />
            </Routes>


            <ToastContainer
                position="top-center"
                autoClose={2000}
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