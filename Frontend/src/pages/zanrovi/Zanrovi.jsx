import { useEffect, useState } from "react";
import {  Button, Container, Table } from "react-bootstrap";
import ZanrService from "../../services/ZanrService";
import { NumericFormat } from "react-number-format";
import { GrValidate } from "react-icons/gr";
import { IoIosAdd } from "react-icons/io";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";


export default function Zanrovi(){
    const [zanrovi,setZanrovi] = useState();
    const navigate = useNavigate();

    async function dohvatiZanrove(){
        await ZanrService.getZanrovi()
        .then((res)=>{
            setZanrovi(res.data);
        })
        .catch((e)=>{
            alert(e);
        });
    }
        useEffect(()=>{
        dohvatiZanrove();
    },[]);

    async function obrisiZanr(sifra){
        const odgovor = await ZanrService.obrisiSmjer(sifra);
        if (odgovor.ok){
            alert(odgovor.poruka.data.poruka);
            dohvatiSmjerove();
        }
        
    }



    return (

        <Container>
            <Link to={RoutesNames.ZANROVI_NOVI} className="btn btn-success gumb">
                <IoIosAdd
                size={25}
                /> Dodaj
            </Link>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Naziv</th>
                    </tr>
                </thead>
                <tbody>
                    {zanrovi && zanrovi.map((zanr,index)=>(
                        <tr key={index}>
                            <td>{zanr.naziv}</td>
                            <td className="sredina">
                                <Button 
                                variant="primary"
                                onClick={()=>{navigate(`/zanrovi/${zanr.sifra}`)}}>
                                    <FaEdit 
                                    size={25}
                                    />
                                </Button>
                                
                                    &nbsp;&nbsp;&nbsp;
                                <Button
                                    variant="danger"
                                    onClick={()=>obrisiZanr(zanr.sifra)}
                                >
                                    <FaTrash  
                                    size={25}
                                    />
                                </Button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>

    );

}