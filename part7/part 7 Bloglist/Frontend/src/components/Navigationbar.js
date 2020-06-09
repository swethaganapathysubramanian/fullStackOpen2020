import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar } from 'react-bootstrap'
import { Nav } from 'react-bootstrap'

//7.16
const Navigationbar = ({ handleLogout }) => {

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <LinkContainer to="/">
        <Navbar.Brand>Blog List</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <LinkContainer to="/">
            <Nav.Link>Blogs</Nav.Link>
          </LinkContainer>

          <LinkContainer to="/users">
            <Nav.Link>Users</Nav.Link>
          </LinkContainer>
        </Nav>
        <Nav>
          <Nav.Link eventKey={2} onClick={handleLogout}>
            Logout
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigationbar