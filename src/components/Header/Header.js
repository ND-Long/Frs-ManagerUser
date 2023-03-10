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


    const handleProfile = () => {
        navigate("/profile")
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

                            <FaUserAlt className='user-icon' onClick={handleProfile} />


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
                                className={({ isActive }) => (isActive ? "navs-link  activenav " : "navs-link")}
                            >
                                Trang chủ
                                <div className={"under-line"}></div>
                            </NavLink>
                        </Nav.Link>


                        <Nav.Link>
                            <NavLink
                                to="/checkout"
                                className={({ isActive }) => (isActive ? "navs-link  activenav " : "navs-link")}
                            >
                                Giỏ hàng
                                <div className={"under-line"}></div>
                            </NavLink>
                        </Nav.Link>

                        <Nav.Link>
                            <NavLink
                                to="/admin"
                                className={({ isActive }) => (isActive ? "navs-link  activenav " : "navs-link")}
                            >
                                Quản lý
                                <div className={"under-line"}></div>
                            </NavLink>
                        </Nav.Link>
                        <Nav.Link>
                            <NavLink
                                to="/search-order"
                                className={({ isActive }) => (isActive ? "navs-link  activenav " : "navs-link")}
                            >
                                Kiểm tra đơn hàng
                                <div className={"under-line"}></div>
                            </NavLink>
                        </Nav.Link>
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