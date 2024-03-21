import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import KorisnikService from "../../services/KorisnikService";
import { IoIosAdd } from "react-icons/io";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { RoutesNames } from "../../constants";
import { useNavigate } from "react-router-dom";

export default function Korisnici(){
    const [korisnici,setKorisnici] = useState();
    let navigate = useNavigate(); 

    async function dohvatiKorisnike(){
        await KorisnikService.get()
        .then((res)=>{
            setKorisnici(res.data);
        })
        .catch((e)=>{
            alert(e);
        });
    }

    useEffect(()=>{
        dohvatiKorisnike();
    },[]);



    async function obrisiKorisnik(sifra) {
        const odgovor = await KorisnikService.obrisi(sifra);
    
        if (odgovor.ok) {
            dohvatiKorisnike();
        } else {
          alert(odgovor.poruka);
        }
      }

    return (

        <Container>
            <Link to={RoutesNames.KORISNICI_NOVI} className="btn btn-success gumb">
                <IoIosAdd
                size={25}
                /> Dodaj
            </Link>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Korisničko ime</th>
                        <th>Email</th>
                        <th>Lozinka</th>
                        <th>Jezik</th>
                    </tr>
                </thead>
                <tbody>
                    {korisnici && korisnici.map((entitet,index)=>(
                        <tr key={index}>
                            <td>{entitet.korisnickoime}</td>
                            <td>{entitet.lozinka}</td>
                            <td>{entitet.email}</td>
                            <td>{entitet.jezik}</td>
                            <td className="sredina">
                                    <Button
                                        variant='primary'
                                        onClick={()=>{navigate(`/korisnici/${entitet.sifra}`)}}
                                    >
                                        <FaEdit 
                                    size={25}
                                    />
                                    </Button>
                               
                                
                                    &nbsp;&nbsp;&nbsp;
                                    <Button
                                        variant='danger'
                                        onClick={() => obrisiKorisnik(entitet.sifra)}
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