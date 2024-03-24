import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { IoIosAdd } from "react-icons/io";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ProgressBar from 'react-bootstrap/ProgressBar';
import moment from "moment";

import SezonaService from "../../services/SezonaService";
import { RoutesNames } from "../../constants";


export default function Sezone(){
    const [sezone,setSezone] = useState();
    let navigate = useNavigate(); 

    async function dohvatiSezone(){
        await SezonaService.get()
        .then((res)=>{

            let sezone = res.data;
            sezone.forEach(e => {
                if(e.maksimalnopolaznika==null){
                    e.maksimalnopolaznika=0;
                }

            });
            setSezone(sezone);
        })
        .catch((e)=>{
            alert(e);
        });
    }

    useEffect(()=>{
        dohvatiSezone();
    },[]);



    async function obrisiSezonu(sifra) {
        const odgovor = await SezonaService.obrisi(sifra);
    
        if (odgovor.ok) {
            dohvatiSezone();
        } else {
          alert(odgovor.poruka);
        }
      }

      function progressStatus(entitet){
        return entitet.brojpolaznika + " polaznika od ukupno " +
        entitet.maksimalnopolaznika + " polaznika na grupi.";
      }

      function progressLabel(entitet){
        return entitet.brojpolaznika + "/" +
        entitet.maksimalnopolaznika;
      }

      function progressPostotak(entitet){
        if (entitet.maksimalnopolaznika==0 || entitet.brojpolaznika==0){
            return 0;
        }

        return (entitet.brojpolaznika / entitet.maksimalnopolaznika) * 100;
      }

    return (

        <Container>
            <Link to={RoutesNames.SEZONE_NOVI} className="btn btn-success gumb">
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
                    {sezone && sezone.map((entitet,index)=>(
                        <tr key={index}>
                            <td>{entitet.naziv}</td>
                            
                            <td className="sredina">
                                    <Button
                                        variant='primary'
                                        onClick={()=>{navigate(`/grupe/${entitet.sifra}`)}}
                                    >
                                        <FaEdit 
                                    size={25}
                                    />
                                    </Button>
                               
                                
                                    &nbsp;&nbsp;&nbsp;
                                    <Button
                                        variant='danger'
                                        onClick={() => obrisiSezonu(entitet.sifra)}
                                    >
                                        <FaTrash
                                        size={25}/>
                                    </Button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>

    );

}