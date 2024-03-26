import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import { RoutesNames } from '../constants';

import './NavBar.css';

function NavBar() {

    const navigate = useNavigate();

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand 
            className='linkPocetna'
            onClick={()=>navigate(RoutesNames.HOME)}
        >
            Streaming app
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            
            <NavDropdown title="Programi" id="basic-nav-dropdown">
              
              
              <NavDropdown.Item 
              onClick={()=>navigate(RoutesNames.KORISNICI_PREGLED)}
              >
                Korisnici
              </NavDropdown.Item>
              <NavDropdown.Divider />

              <NavDropdown.Item 
              onClick={()=>navigate(RoutesNames.ZANROVI_PREGLED)}
              >
                Zanrovi
              </NavDropdown.Item>
              <NavDropdown.Divider />

              <NavDropdown.Item 
              onClick={()=>navigate(RoutesNames.SEZONE_PREGLED)}
              >
                Sezone
              </NavDropdown.Item>
              <NavDropdown.Divider />

              <NavDropdown.Item 
              onClick={()=>navigate(RoutesNames.EPIZODE_PREGLED)}
              >
                Epizode
              </NavDropdown.Item>
              <NavDropdown.Divider />
              
              
            </NavDropdown>
            
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
        <Nav.Link target="_blank" href="https://ivanpavlovic-001-site1.ltempurl.com/swagger/index.html">API dokumentacija</Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;