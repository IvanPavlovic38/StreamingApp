import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import EpizodaService from '../../services/EpizodeService';
import { RoutesNames } from '../../constants';


export default function EpizodeDodaj() {
  const navigate = useNavigate();


  async function dodajEpizoda(Epizoda) {
    const odgovor = await EpizodaService.dodaj(Epizoda);
    if (odgovor.ok) {
      navigate(RoutesNames.EPIZODE_PREGLED);
    } else {
      alert(odgovor.poruka.errors);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    const podaci = new FormData(e.target);


    dodajEpizoda({
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
            placeholder='Naziv Epizode'
            maxLength={255}
            required
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='trajanje'>
          <Form.Label>Trajanje</Form.Label>
          <Form.Control
            type='text'
            name='trajanje'
            placeholder='Trajanje Epizode'
            maxLength={255}
            required
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='opis'>
          <Form.Label>Opis</Form.Label>
          <Form.Control
            type='text'
            name='opis'
            placeholder='Opis Epizode'
            maxLength={255}
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            name='email'
            placeholder='Email Predavaca'
            maxLength={255}
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='iban'>
          <Form.Label>IBAN</Form.Label>
          <Form.Control
            type='text'
            name='iban'
            placeholder='IBAN Predavaca'
          />
        </Form.Group>

       

        <Row>
          <Col>
            <Link className='btn btn-danger gumb' to={RoutesNames.PREDAVACI_PREGLED}>
              Odustani
            </Link>
          </Col>
          <Col>
            <Button variant='primary' className='gumb' type='submit'>
              Dodaj Predavača
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
