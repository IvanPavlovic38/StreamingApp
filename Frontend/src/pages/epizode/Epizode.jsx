import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import EpizodeService from "../../services/EpizodeService";
import { IoIosAdd } from "react-icons/io";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { RoutesNames } from "../../constants";
import { useNavigate } from "react-router-dom";

export default function Epizode(){
    const [Epizode,setEpizode] = useState();
    let navigate = useNavigate(); 

    async function dohvatiEpizode(){
        await EpizodaService.get()
        .then((res)=>{
            setEpizode(res.data);
        })
        .catch((e)=>{
            alert(e);
        });
    }

    useEffect(()=>{
        dohvatiEpizode();
    },[]);



    async function obrisiEpizoda(sifra) {
        const odgovor = await EpizodaService.obrisi(sifra);
    
        if (odgovor.ok) {
            dohvatiEpizode();
        } else {
          alert(odgovor.poruka);
        }
      }

    return (

        <Container>
            <Link to={RoutesNames.EPIZODE_NOVI} className="btn btn-success gumb">
                <IoIosAdd
                size={25}
                /> Dodaj
            </Link>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Naziv</th>
                        <th>Trajanje</th>
                        <th>Opis</th>
                        <th>DatumIzdavanja</th>
                    </tr>
                </thead>
                <tbody>
                    {Epizode && Epizode.map((epizoda,index)=>(
                        <tr key={index}>
                            <td>{predavac.naziv}</td>
                            <td>{predavac.trajanje}</td>
                            <td>{predavac.opis}</td>
                            <td>{predavac.datumizdavanja}</td>
                            <td className="sredina">
                                    <Button
                                        variant='primary'
                                        onClick={()=>{navigate(`/epizode/${epizode.sifra}`)}}
                                    >
                                        <FaEdit 
                                    size={25}
                                    />
                                    </Button>
                               
                                
                                    &nbsp;&nbsp;&nbsp;
                                    <Button
                                        variant='danger'
                                        onClick={() => obrisEpizoda(epizoda.sifra)}
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