import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import SerijaService from "../../services/SerijeService";
import { RoutesNames } from "../../constants";

export default function SerijePromjeni(){

    const navigate = useNavigate();
    const routeParams = useParams();
    const [serija,setSerija] = useState({});

    async function dohvatiSeriju(){
        await SerijaService.getBySifra(routeParams.sifra)
        .then((res)=>{
            setSerija(res.data)
        })
        .catch((e)=>{
            alert(e.poruka);
        });
    }

    useEffect(()=>{
        dohvatiSeriju();
    },[]);

    async function promjeniSeriju(serija){
        const odgovor = await SerijaService.promjeniSeriju(routeParams.sifra,serija);
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

        const smjer = 
        {
            naziv: podaci.get('naziv'),
            trajanje: podaci.get('opis')
          };

          promjeniSeriju(serija);
    }


    return (

        <Container>
           
           <Form onSubmit={handleSubmit}>

                <Form.Group controlId="naziv">
                    <Form.Label>Naziv</Form.Label>
                    <Form.Control 
                        type="text"
                        defaultValue={serija.naziv}
                        name="naziv"
                    />
                </Form.Group>

                <Form.Group controlId="opis">
                    <Form.Label>Opis</Form.Label>
                    <Form.Control 
                        type="text"
                        defaultValue={serija.opis}
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
                            Promjeni seriju
                        </Button>
                    </Col>
                </Row>
                
           </Form>

        </Container>

    );

}