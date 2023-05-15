import React from 'react'
import { FaShoppingCart, FaUser } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap';
import { Container, Navbar, Nav, NavDropdown} from 'react-bootstrap';
import { logout } from '../features/user/userSlice'
import SearchBox from './SearchBox'

const Header = () => {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.user)
    const logoutHandler = () => {
        dispatch(logout())
    }
    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
            <Container>
                <LinkContainer to='/'>
                    <Navbar.Brand href="/">Proshop</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <SearchBox />
                <Nav className="ms-auto">
                    <LinkContainer to='/cart'>
                            <Nav.Link>
                                <FaShoppingCart /> Cart
                            </Nav.Link>
                    </LinkContainer>
                    { user ? (
                        <NavDropdown title={user.name} id="username">
                            <LinkContainer to='/profile'>
                                <NavDropdown.Item>Profile</NavDropdown.Item>
                            </LinkContainer>
                            <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    ):  <LinkContainer to='/login'>
                            <Nav.Link>
                                <FaUser /> Sign In
                            </Nav.Link>
                        </LinkContainer>
                    }   
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
        </header>
    )
}

export default Header
