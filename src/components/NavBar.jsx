import { useState, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { userContext } from '../context';

export default function NavBar(props) {
    const user = useContext(userContext)
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">Notes App</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link >Notes</Nav.Link>
                    </Nav>
                    <Nav>
                        {
                            user ?
                                <NavDropdown title={user?.user?.email} id="collasible-nav-dropdown">
                                    <Link className='dropdown-item' to="/login">Logout</Link>
                                </NavDropdown>
                                :
                                <NavDropdown title="Account" id="collasible-nav-dropdown">
                                    <Link className='dropdown-item' to="/login">Login</Link>
                                    <Link className='dropdown-item' to="/signup">Signup</Link>
                                </NavDropdown>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}