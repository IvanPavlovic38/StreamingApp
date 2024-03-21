import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import KorisnikService from '../../services/KorisnikService';
import { RoutesNames } from '../../constants';


export default function KorisniciDodaj() {
  const navigate = useNavigate();


  async function dodajKorisnik(Korisnik) {
    const odgovor = await KorisnikService.dodaj(Korisnik);
    if (odgovor.ok) {
      navigate(RoutesNames.KORISNICI_PREGLED);
    } else {
      alert(odgovor.poruka.errors);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    const podaci = new FormData(e.target);


    dodajKorisnik({
      korisnickoime: podaci.get('korisnickoime'),
      lozinka: podaci.get('lozinka'),
      email: podaci.get('email'),
      jezik: podaci.get('jezik'),
    });
  }

  return (
    <Container className='mt-4'>
      <Form onSubmit={handleSubmit}>
        <Form.Group className='mb-3' controlId='korisnickoime'>
          <Form.Label>Korisničko Ime</Form.Label>
          <Form.Control
            type='text'
            name='korisnickoime'
            placeholder='Ime Korisnika'
            maxLength={255}
            required
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='lozinka'>
          <Form.Label>Lozinka</Form.Label>
          <Form.Control
            type='text'
            name='lozinka'
            placeholder='Lozinka Korisnika'
            maxLength={255}
            required
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            name='email'
            placeholder='Email Korisnika'
            maxLength={255}
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='jezik'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='text'
            name='jezik'
            placeholder='Jezik Korisnika'
            maxLength={255}
          />
        </Form.Group>

       

        <Row>
          <Col>
            <Link className='btn btn-danger gumb' to={RoutesNames.KORISNICI_PREGLED}>
              Odustani
            </Link>
          </Col>
          <Col>
            <Button variant='primary' className='gumb' type='submit'>
              Dodaj Polaznika
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
