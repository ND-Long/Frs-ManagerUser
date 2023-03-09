import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Card, Navbar } from 'react-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { BrowserRouter, Routes, Route, NavLink, Link, useNavigate, useSearchParams } from "react-router-dom";
import logoPetShop from "../../assets/logoPetHouse.png"
import "./Header.scss"
import { useDispatch, useSelector } from 'react-redux';
import { USER_LOGOUT } from '../../redux/actions/userActions';
import { useEffect, useState } from 'react';
import { fetchAllUsersRedux, FETCH_ALL_PRODUCTS } from '../../redux/actions/productActions';
import { getAllProducts } from '../services/apiServices';
import { FaShoppingCart, FaUserAlt } from 'react-icons/fa';
import { HiOutlineLogout } from 'react-icons/hi';
import Cart from './Cart';



function Header() {
    const dataAddToCart = useSelector(state => state.product.cartProduct)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [showCart, setShowCart] = useState(false)
    const auth = useSelector(state => state.account.user.auth)
    useEffect(() => {
        fetchAllUsers()
    }, [])

    const fetchAllUsers = async () => {
        dispatch(fetchAllUsersRedux())
    }


    const handleLogout = () => {
        if (auth === true) {
            dispatch({
                type: USER_LOGOUT
            })
            // navigate('/login')
        } else {
            navigate('/login')
        }
    }




    return (
        <Navbar collapseOnSelect expand="lg" bg="white" variant="white" className='nav-bar-black'>
            <Container className='header-container'  >
                <Navbar.Toggle aria-controls="responsive-navbar-nav" className='toggle-header' />
                <div className='link-brand'>
                    <Navbar.Brand  >

                        <Link className={`navs-link-brand `} to="/">
                            <div className='logo-header'>
                                <img className='logo' src={logoPetShop} />
                                <div>
                                    PetShop
                                </div>
                            </div>
                        </Link>
                    </Navbar.Brand>
                </div>
                <div className='cart-header'>

                    <Nav>
                        <Nav.Link >
                            {
                                auth ?
                                    <HiOutlineLogout className='logOut-icon' onClick={handleLogout} /> :
                                    <FaUserAlt className='user-icon' onClick={handleLogout} />
                            }

                            <div className='cart' onClick={() => setShowCart(true)}>
                                <FaShoppingCart className='cart-icon' />
                                <span className='cart-counter'>
                                    {dataAddToCart.length || 0}
                                </span>
                            </div>
                        </Nav.Link>
                    </Nav>
                </div>



                <Navbar.Collapse id="responsive-navbar-nav">

                    <div className="nav-bar-router">
                        <Nav.Link>
                            <NavLink
                                to="/"
                                className={({ isActive }) => (isActive ? "navs-link  activenav nav-home" : "navs-link nav-home")}
                            >
                                Trang chủ
                            </NavLink>
                        </Nav.Link>



                        <Nav.Link>
                            <NavLink
                                to="/products"
                                className={({ isActive }) => (isActive ? "navs-link  activenav " : "navs-link")}
                            >
                                Products
                            </NavLink>
                        </Nav.Link>
                        <NavLink
                            to="/admin"
                            className={({ isActive }) => (isActive ? "navs-link  activenav" : "navs-link")}
                        >
                            Quản lý
                        </NavLink>
                    </div>


                </Navbar.Collapse>


            </Container >
            <Cart
                show={showCart}
                setShow={setShowCart}
            />
        </Navbar >
    );
}

export default Header;  