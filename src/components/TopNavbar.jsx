import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
const MyNavbar = () => {
  return (
    <div>
         <Navbar bg="dark" variant="dark" fixed="top">
      <Container>
        <Navbar.Brand as={Link} to="/Home">Capstone Project</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/Home">Home</Nav.Link>
          <Nav.Link as={Link} to="/Login">Login</Nav.Link>
          <Nav.Link as={Link} to="/News">News</Nav.Link>
          <Nav.Link as={Link} to="/AboutUs">AboutUs</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
    </div>
  );
}

export default MyNavbar;