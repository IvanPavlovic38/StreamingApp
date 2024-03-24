import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Service from '../../services/SezonaService';
import { RoutesNames } from '../../constants';


export default function SezoneDodaj() {
  const navigate = useNavigate();


  async function dodaj(e) {
    const odgovor = await Service.dodaj(e);
    if (odgovor.ok) {
      navigate(RoutesNames.SEZONE_PREGLED);
    } else {
      alert(odgovor.poruka.errors);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    const podaci = new FormData(e.target);


    dodajSezona({
      naziv: podaci.get('naziv')
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
            placeholder='Naziv sezone'
            maxLength={255}
            required
          />
        </Form.Group>

       

        <Row>
          <Col>
            <Link className='btn btn-danger gumb' to={RoutesNames.SEZONE_PREGLED}>
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
