import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import SerijaService from "../../services/SerijeService";

export default function SerijeDodaj(){
    const navigate = useNavigate();


    async function dodajSeriju(serija){
        const odgovor = await SmjerService.dodajSeriju(serija);
        if(odgovor.ok){
          navigate(RoutesNames.SERIJE_PREGLED);
        }else{
          console.log(odgovor);
          alert(odgovor.poruka);
        }
    }

    function handleSubmit(e){
        e.preventDefault();
        const podaci = new FormData(e.target);

        const serija = 
        {
            naziv: podaci.get('naziv'),
            trajanje: podaci.get('opis')
          };

          dodajSeriju(serija);


    }

    return (

        <Container>
           
           <Form onSubmit={handleSubmit}>

                <Form.Group controlId="naziv">
                    <Form.Label>Naziv</Form.Label>
                    <Form.Control 
                        type="text"
                        name="naziv"
                    />
                </Form.Group>

                <Form.Group controlId="opis">
                    <Form.Label>Opis</Form.Label>
                    <Form.Control 
                        type="text"
                        name="opis"
                    />
                </Form.Group>

                <Row className="akcije">
                    <Col>
                        <Link 
                        className="btn btn-danger"
                        to={RoutesNames.SERIJE_PREGLED}>Odustani</Link>
                    </Col>
                    <Col>
                        <Button
                            variant="primary"
                            type="submit"
                        >
                            Dodaj seriju
                        </Button>
                    </Col>
                </Row>
                
           </Form>

        </Container>

    );

}