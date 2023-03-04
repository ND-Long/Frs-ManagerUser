import App from './App';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from './components/Admin/Admin';
import Home from './components/Home/Home';
import { ToastContainer, toast } from 'react-toastify';


function Layout(props) {
    return (
        <>
            <Routes>
                <Route path="/" element={<App />} >
                    <Route index element={<Home />} />
                    <Route path="/admin" element={<Admin />} />
                </Route>

            </Routes>
            <ToastContainer
                position="top-right"
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