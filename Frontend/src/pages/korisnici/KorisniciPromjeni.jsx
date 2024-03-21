import { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import KorisnikService from '../../services/KorisnikService';
import { RoutesNames } from '../../constants';

export default function KorisniciPromjeni() {
  const [korisnik, setKorisnik] = useState({});

  const routeParams = useParams();
  const navigate = useNavigate();


  async function dohvatiKorisnik() {

    await KorisnikService
      .getBySifra(routeParams.sifra)
      .then((response) => {
        console.log(response);
        setKorisnik(response.data);
      })
      .catch((err) => alert(err.poruka));

  }

  useEffect(() => {
    dohvatiKorisnik();
  }, []);

  async function promjeniKorisnik(korisnik) {
    const odgovor = await KorisnikService.promjeni(routeParams.sifra, korisnik);

    if (odgovor.ok) {
      navigate(RoutesNames.KORISNICI_PREGLED);
    } else {
      alert(odgovor.poruka);

    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    const podaci = new FormData(e.target);
    promjeniKorisnik({
      korisnckoime: podaci.get('korisnickoime'),
      lozinka: podaci.get('lozinka'),
      email: podaci.get('email'),
      jezik: podaci.get('jezik'),
    });
  }

  return (
    <Container className='mt-4'>
      <Form onSubmit={handleSubmit}>

      <Form.Group className='mb-3' controlId='korisnickoime'>
          <Form.Label>Korisnicko Ime</Form.Label>
          <Form.Control
            type='text'
            name='korisnickoime'
            defaultValue={korisnik.korisnckoimeime}
            maxLength={255}
            required
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='lozinka'>
          <Form.Label>Lozinka</Form.Label>
          <Form.Control
            type='text'
            name='lozinka'
            defaultValue={korisnik.lozinka}
            maxLength={255}
            required
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            name='email'
            defaultValue={korisnik.email}
            maxLength={255}
            required
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='jezik'>
          <Form.Label>Jezik</Form.Label>
          <Form.Control
            type='text'
            name='jezik'
            defaultValue={korisnik.jezik}
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
              Promjeni Korisnika
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
