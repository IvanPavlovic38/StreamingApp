import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import ZanrService from "../../services/ZanrService";
import { RoutesNames } from "../../constants";

export default function ZanroviPromjeni(){

    const navigate = useNavigate();
    const routeParams = useParams();
    const [zanr,setZanr] = useState({});

    async function dohvatiZanr(){
        await ZanrService.getBySifra(routeParams.sifra)
        .then((res)=>{
            setSmjer(res.data)
        })
        .catch((e)=>{
            alert(e.poruka);
        });
    }

    useEffect(()=>{
        
        dohvatiSmjer();
    },[]);

    async function promjeniZanr(zanr){
        const odgovor = await SmjerService.promjeniSmjer(routeParams.sifra,smjer);
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

          promjeniZanr(zanr);
    }


    return (

        <Container>
           
           <Form onSubmit={handleSubmit}>

                <Form.Group controlId="naziv">
                    <Form.Label>Naziv</Form.Label>
                    <Form.Control 
                        type="text"
                        defaultValue={smjer.naziv}
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
                            Promjeni zanr
                        </Button>
                    </Col>
                </Row>
                
           </Form>

        </Container>

    );

}