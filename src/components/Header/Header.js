import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Card, Navbar } from 'react-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { BrowserRouter, Routes, Route, NavLink, Link, useNavigate, useSearchParams } from "react-router-dom";
import logoPetShop from "../../assets/logoPetHouse.png"
import "./Header.scss"
import { useDispatch, useSelector } from 'react-redux';
import { deleteListOrderUser, getAllListOrder, USER_LOGOUT } from '../../redux/actions/userActions';
import { useEffect, useState } from 'react';
import { countCartRedux, fetchAllProductsRedux, FETCH_ALL_PRODUCTS } from '../../redux/actions/productActions';
import { getAllProducts } from '../services/apiServices';
import { MdShoppingCart } from 'react-icons/md';
import { TiUser } from 'react-icons/ti';
import Cart from './Cart';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


function Header({ clickContent }) {
    const isAuthenticated = useSelector(state => state.account.user.auth)
    const dataAddToCart = useSelector(state => state.product.cartProduct)
    const countCart = useSelector(state => state.product.countCart)
    const dataUser = useSelector(state => state.account.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [showCart, setShowCart] = useState(false)
    const auth = useSelector(state => state.account.user.auth)
    const [navExpanded, setVavExpanded] = useState(clickContent)
    let count = 0
    useEffect(() => {
        fetchAllProducts()
    }, [])


    useEffect(() => {
        dataAddToCart.map((item) => {
            count += item.quantity
        })
        dispatch(countCartRedux(count))
    }, [dataAddToCart])


    useEffect(() => {
        setVavExpanded(false)
    }, [clickContent])







    const fetchAllProducts = async () => {
        dispatch(fetchAllProductsRedux())
    }


    const handleProfile = () => {
        if (!isAuthenticated) {
            navigate('/login')
        } else {
            navigate("/profile")
        }
    }

    return (
        <Navbar bg="white" expand="lg" className='header-container p-2' onToggle={() => setVavExpanded(!navExpanded)} expanded={navExpanded}>
            <Container fluid  >
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Nav.Link onClick={() => {
                    window.scrollTo(0, 0)
                    setVavExpanded(false)
                }} >
                    <NavLink to="/" className='nav-logo-header' >
                        <div className='logo-header'  >
                            <img src={logoPetShop} className='logo' />
                        </div>
                    </NavLink>
                </Nav.Link>

                {/* <Navbar.Brand href="#" style={{ margin: "auto auto" }}>PetHouse</Navbar.Brand> */}
                <Navbar.Collapse id="navbarScroll" onClick={() => setVavExpanded(false)}>
                    <Nav className="nav-router">
                        <Nav.Link >
                            <Link to="/" className='link-router'>
                                Trang chủ
                            </Link>
                        </Nav.Link>
                        {
                            dataUser.role === "admin" ?
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
                <Nav.Link className='cart-header' onClick={() => setVavExpanded(false)}>
                    <TiUser className='user-icon' onClick={handleProfile} />
                    <div className='cart' onClick={() => setShowCart(true)}>
                        <MdShoppingCart className='cart-icon' />
                        <span className='cart-counter'>
                            {countCart || 0}
                        </span>
                    </div>
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