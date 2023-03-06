import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Navbar } from 'react-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { BrowserRouter, Routes, Route, NavLink, Link, useNavigate } from "react-router-dom";
import logoGiupchame from "../../assets/logoGiupchame.png"
import "./Header.scss"
import { useDispatch } from 'react-redux';
import { USER_LOGOUT } from '../../redux/actions/userActions';
function Header() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleLogout = () => {
        console.log("ok")
        dispatch({
            type: USER_LOGOUT
        })
    }
    return (
        <Navbar bg="light" expand="lg" className='heading-all' >
            <Container className='d-flex align-items-center'>
                <NavLink to="/" className="nav-link">
                    <div className='logo-header'>
                        <img src={logoGiupchame} className="logo" />
                        <span style={{ fontSize: "22px", fontWeight: "600" }}>PetShop</span>
                    </div>

                </NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to="/" className="nav-link mx-2">Trang chủ</NavLink>
                        <NavLink to="/admin" className="nav-link mx-2">Quản lý</NavLink>

                    </Nav>
                    <div className='mx-2 mt-2'>
                        <NavDropdown title="Cài đặt" >
                            <NavDropdown.Item to="/login">
                                <NavLink to="/" className="nav-link">Thông tin</NavLink>
                            </NavDropdown.Item>
                            <NavDropdown.Item to="/login">
                                <NavLink to="/login" className="nav-link" onClick={() => handleLogout()}>Đăng xuất</NavLink>
                            </NavDropdown.Item>
                        </NavDropdown>


                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;