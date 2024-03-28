import { App } from "../constants"
import { httpService } from "./httpService";

async function getSerije(){
    return await httpService.get('/Serija')
    .then((res)=>{
        if(App.DEV) console.table(res.data);

        return res;
    }).catch((e)=>{
        console.log(e);
    });
}

async function obrisiSerije(sifra){
    return await httpService.delete('/Serija/' + sifra)
    .then((res)=>{
        return {ok: true, poruka: res};
    }).catch((e)=>{
        console.log(e);
    });
}

async function dodajSeriju(serija){
    const odgovor = await httpService.post('/Serija',serija)
    .then(()=>{
        return {ok: true, poruka: 'Uspješno dodano'}
    })
    .catch((e)=>{
        console.log(e.response.data.errors);
        return {ok: false, poruka: 'Greška'}
    });
    return odgovor;
}

async function promjeniSeriju(sifra,serija){
    const odgovor = await httpService.put('/Serija/'+sifra,serija)
    .then(()=>{
        return {ok: true, poruka: 'Uspješno promjnjeno'}
    })
    .catch((e)=>{
        console.log(e.response.data.errors);
        return {ok: false, poruka: 'Greška'}
    });
    return odgovor;
}

async function getBySifra(sifra){
    return await httpService.get('/Serija/' + sifra)
    .then((res)=>{
        if(App.DEV) console.table(res.data);

        return res;
    }).catch((e)=>{
        console.log(e);
        return {poruka: e}
    });
}



export default{
    getSerije,
    obrisiSerije,
    dodajSeriju,
    promjeniSeriju,
    getBySifra
};