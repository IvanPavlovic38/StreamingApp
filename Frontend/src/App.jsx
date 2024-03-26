import { Route, Routes } from "react-router-dom"
import Pocetna from "./pages/Pocetna"
import { RoutesNames } from "./constants"
import NavBar from "./components/NavBar"



import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';






import Korisnici from "./pages/korisnici/Korisnici"
import KorisniciDodaj from "./pages/korisnici/KorisniciDodaj"
import KorisniciPromjeni from "./pages/korisnici/KorisniciPromjeni"

import Zanrovi from "./pages/zanrovi/Zanrovi"
import ZanroviDodaj from "./pages/zanrovi/ZanroviDodaj"
import ZanroviPromjeni from "./pages/zanrovi/ZanroviPromjeni"


function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <>
          <Route path={RoutesNames.HOME} element={<Pocetna />} />

          
          


          <Route path={RoutesNames.ZANROVI_PREGLED} element={<Zanrovi />} />
          <Route path={RoutesNames.ZANROVI_NOVI} element={<ZanroviDodaj />} />
          <Route path={RoutesNames.ZANROVI_PROMJENI} element={<ZanroviPromjeni />} />

          <Route path={RoutesNames.KORISNICI_PREGLED} element={<Korisnici />} />
          <Route path={RoutesNames.KORISNICI_NOVI} element={<KorisniciDodaj />} />
          <Route path={RoutesNames.KORISNICI_PROMJENI} element={<KorisniciPromjeni />} />

          


          
        </>
      </Routes>
    </>
  )
}

export default App
