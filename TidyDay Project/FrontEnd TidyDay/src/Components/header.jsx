import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import logo from '../assets/images/logo.png';

function AppHeader() {
  return (
    <>
      <div className='welcome-mode'>
      <Navbar bg="light" expand="lg">
            <Container>
              <img src={logo} alt='' />
              <Navbar.Toggle aria-controls="basic-navbar-nav" className="custom-toggler" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                  <Nav.Link href="/pma/login">Login</Nav.Link>
                  <Nav.Link href="/pma/signup">Register</Nav.Link>
                </Nav>
                <Nav className="me-auto">
                  <Nav.Link href="#home">Home</Nav.Link>
                  <Nav.Link href="#about">About</Nav.Link>
                  <Nav.Link href="#services">Services</Nav.Link>
                  <Nav.Link href="#teams">Teams</Nav.Link>
                  <Nav.Link href="#pricing">Pricing</Nav.Link>
                  <Nav.Link href="#contact">Contact</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
      </div>
    </>
  );
}

export default AppHeader;