import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Navbar } from 'react-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import logoGiupchame from "../../assets/logoGiupchame.png"
import "./Header.scss"
function Header() {
    return (
        <Navbar bg="light" expand="lg" className='heading-all'>
            <Container className='d-flex align-items-center'>
                <NavLink to="/" className="nav-link">
                    <div className='logo-header'>
                        <img src={logoGiupchame} className="logo" />
                        <span style={{ fontSize: "22px", fontWeight: "600" }}>Giupviec</span>
                    </div>

                </NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to="/" className="nav-link mx-2">Trang chủ</NavLink>
                        <NavLink to="/admin" className="nav-link mx-2">Quản lý</NavLink>

                    </Nav>
                    <div className='d-flex justify-content-end'>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown mx-">
                            <NavDropdown.Item href="#action/3.1" >Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        </NavDropdown>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;