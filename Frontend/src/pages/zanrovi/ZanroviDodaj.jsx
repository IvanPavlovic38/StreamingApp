import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import ZanrService from "../../services/ZanrService";

export default function SmjeroviDodaj(){
    const navigate = useNavigate();


    async function dodajZanr(zanr){
        const odgovor = await SmjerService.dodajZanr(zanr);
        if(odgovor.ok){
          navigate(RoutesNames.ZANROVI_PREGLED);
        }else{
          console.log(odgovor);
          alert(odgovor.poruka);
        }
    }

    function handleSubmit(e){
        e.preventDefault();
        const podaci = new FormData(e.target);

        const smjer = 
        {
            naziv: podaci.get('naziv'),
          };

          dodajSmjer(smjer);


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

                <Row className="akcije">
                    <Col>
                        <Link 
                        className="btn btn-danger"
                        to={RoutesNames.ZANROVI_PREGLED}>Odustani</Link>
                    </Col>
                    <Col>
                        <Button
                            variant="primary"
                            type="submit"
                        >
                            Dodaj zanr
                        </Button>
                    </Col>
                </Row>
                
           </Form>

        </Container>

    );

}