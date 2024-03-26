import { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import EpizodaService from '../../services/EpizodeService';
import { RoutesNames } from '../../constants';

export default function EpizodePromjeni() {
  const [epizoda, setEpizoda] = useState({});

  const routeParams = useParams();
  const navigate = useNavigate();


  async function dohvatiEpizoda() {

    await EpizodaService
      .getBySifra(routeParams.sifra)
      .then((response) => {
        console.log(response);
        setEpizoda(response.data);
      })
      .catch((err) => alert(err.poruka));

  }

  useEffect(() => {
    dohvatiEpizoda();
  }, []);

  async function promjeniEpizoda(epizoda) {
    const odgovor = await EpizodaService.promjeni(routeParams.sifra, epizoda);

    if (odgovor.ok) {
      navigate(RoutesNames.EPIZODE_PREGLED);
    } else {
      alert(odgovor.poruka);

    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    const podaci = new FormData(e.target);
    promjeniEpizoda({
      naziv: podaci.get('naziv'),
      trajanje: podaci.get('trajanje'),
      opis: podaci.get('opis'),
      datumizdavanja: podaci.get('datumizdavanja'),
    });
  }

  return (
    <Container className='mt-4'>
      <Form onSubmit={handleSubmit}>

      <Form.Group className='mb-3' controlId='naziv'>
          <Form.Label>Naziv</Form.Label>
          <Form.Control
            type='text'
            name='naziv'
            defaultValue={epizoda.naziv}
            maxLength={255}
            required
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='trajanje'>
          <Form.Label>Trajanje</Form.Label>
          <Form.Control
            type='text'
            name='trajanje'
            defaultValue={epizoda.trajanje}
            maxLength={255}
            required
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='opis'>
          <Form.Label>Opis</Form.Label>
          <Form.Control
            type='text'
            name='opis'
            defaultValue={epizoda.opis}
            maxLength={255}
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='datumizdavanja'>
          <Form.Label>Datum Izdavanja</Form.Label>
          <Form.Control
            type='email'
            name='datumizdavanja'
            defaultValue={epizoda.datumizdavanja}
            maxLength={255}
          />
        </Form.Group>

        <Row>
          <Col>
            <Link className='btn btn-danger gumb' to={RoutesNames.EPIZODE_PREGLED}>
              Odustani
            </Link>
          </Col>
          <Col>
            <Button variant='primary' className='gumb' type='submit'>
              Promjeni epizodu
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
