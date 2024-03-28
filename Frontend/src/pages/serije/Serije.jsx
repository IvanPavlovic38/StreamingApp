import { useEffect, useState } from "react";
import {  Button, Container, Table } from "react-bootstrap";
import SerijeService from "../../services/SerijeService";
import { NumericFormat } from "react-number-format";
import { GrValidate } from "react-icons/gr";
import { IoIosAdd } from "react-icons/io";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";


export default function Serije(){
    const [serije,setSerije] = useState();
    const navigate = useNavigate();

    async function dohvatiSmjerove(){
        await SmjerService.getSmjerovi()
        .then((res)=>{
            setSerije(res.data);
        })
        .catch((e)=>{
            alert(e);
        });
    }
    
    useEffect(()=>{
        dohvatiSerije();
    },[]);

    async function obrisiSerija(sifra){
        const odgovor = await SerijaService.obrisiSeriju(sifra);
        if (odgovor.ok){
            alert(odgovor.poruka.data.poruka);
            dohvatiSerije();
        }
        
    }



    return (

        <Container>
            <Link to={RoutesNames.SERIJE_NOVI} className="btn btn-success gumb">
                <IoIosAdd
                size={25}
                /> Dodaj
            </Link>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Naziv</th>
                        <th>Opis</th>
                    </tr>
                </thead>
                <tbody>
                    {serije && serije.map((smjer,index)=>(
                        <tr key={index}>
                            <td>{smjer.naziv}</td>
                            <td className="desno">{smjer.trajanje}</td>
                            <td className={smjer.cijena==null ? 'sredina' : 'desno'}>
                                {smjer.cijena==null 
                                ? 'Nije definirano'
                                :
                                    <NumericFormat 
                                    value={smjer.cijena}
                                    displayType={'text'}
                                    thousandSeparator='.'
                                    decimalSeparator=','
                                    prefix={'€'}
                                    decimalScale={2}
                                    fixedDecimalScale
                                    />
                                }
                            </td>
                            <td className={smjer.upisnina==null ? 'sredina' : 'desno'}>
                                {smjer.upisnina==null 
                                ? 'Nije definirano'
                                :
                                    <NumericFormat 
                                    value={smjer.upisnina}
                                    displayType={'text'}
                                    thousandSeparator='.'
                                    decimalSeparator=','
                                    prefix={'€'}
                                    decimalScale={2}
                                    fixedDecimalScale
                                    />
                                }
                            </td>
                            <td className="sredina">
                            <GrValidate 
                            size={30} 
                            color={verificiran(smjer)}
                            title={verificiranTitle(smjer)}
                            />
                            </td>
                            <td className="sredina">
                                <Button 
                                variant="primary"
                                onClick={()=>{navigate(`/serije/${serija.sifra}`)}}>
                                    <FaEdit 
                                    size={25}
                                    />
                                </Button>
                                
                                    &nbsp;&nbsp;&nbsp;
                                <Button
                                    variant="danger"
                                    onClick={()=>obrisiSerije(serija.sifra)}
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