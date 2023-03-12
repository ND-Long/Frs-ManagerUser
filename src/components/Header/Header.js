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
import { MdShoppingCart } from 'react-icons/md';
import { TiUser } from 'react-icons/ti';
import Cart from './Cart';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


function Header() {
    const isAuthenticated = useSelector(state => state.account.user.auth)
    const dataAddToCart = useSelector(state => state.product.cartProduct)
    const isAdmin = useSelector(state => state.account.user)
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
        if (!isAuthenticated) {
            navigate('/login')
        } else {
            navigate("/profile")
        }
    }




    return (
        <Navbar bg="white" expand="lg" className='header-container p-2'>
            <Container fluid >
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Nav.Link >
                    <NavLink to="/" className='nav-logo-header'>
                        <div className='logo-header' >
                            <img src={logoPetShop} className='logo' />
                        </div>
                    </NavLink>
                </Nav.Link>

                {/* <Navbar.Brand href="#" style={{ margin: "auto auto" }}>PetHouse</Navbar.Brand> */}
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="nav-router">
                        <Nav.Link >
                            <Link to="/" className='link-router'>
                                Trang chủ
                            </Link>
                        </Nav.Link>
                        {
                            isAdmin.role === "admin" ?
                                <Nav.Link >
                                    <Link to="/admin" className='link-router'>
                                        Quản lý
                                    </Link>
                                </Nav.Link>
                                :
                                <></>
                        }
                        <Nav.Link >
                            <Link to="#" className='link-router'>
                                Danh mục sản phẩm
                            </Link>
                        </Nav.Link>
                        <Nav.Link >
                            <Link to="/search-order" className='link-router'>
                                Tìm kiếm đơn hàng
                            </Link>
                        </Nav.Link>
                    </Nav>


                </Navbar.Collapse>
                <Nav.Link className='cart-header'>
                    <TiUser className='user-icon' onClick={handleProfile} />
                    <div className='cart' onClick={() => setShowCart(true)}>
                        <MdShoppingCart className='cart-icon' />
                        <span className='cart-counter'>
                            {dataAddToCart.length || 0}
                        </span>
                    </div>
                </Nav.Link>
                <Nav.Link className='cart-header2'>

                </Nav.Link>
            </Container>
            <Cart
                show={showCart}
                setShow={setShowCart}
            />
        </Navbar >
    );
}

export default Header;  