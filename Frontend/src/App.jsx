import { Route, Routes } from "react-router-dom"
import Pocetna from "./pages/Pocetna"
import { RoutesNames } from "./constants"
import NavBar from "./components/NavBar"
import Epizode from "./pages/epizode/Epizode"


import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import EpizodeDodaj from "./pages/Epizode/EpizodeDodaj"
import EpizodePromjeni from "./pages/epizode/EpizodePromjeni"

import Serije from "./pages/serije/Serije"
import SerijeDodaj from "./pages/serije/SerijeDodaj"
import SerijePromjeni from "./pages/serije/SerijePromjeni"


import Korisnici from "./pages/korisnici/Korisnici"
import KorisniciDodaj from "./pages/korisnici/KorisniciDodaj"
import KorisniciPromjeni from "./pages/korisnici/KorisniciPromjeni"
import Zanrovi from "./pages/zanrovi/Zanrovi"
import ZanroviDodaj from "./pages/zanrovi/ZanroviDodaj"

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <>
          <Route path={RoutesNames.HOME} element={<Pocetna />} />

          
          <Route path={RoutesNames.EPIZODE_PREGLED} element={<Epizode />} />
          <Route path={RoutesNames.EPIZODE_NOVI} element={<EpizodeDodaj />} />
          <Route path={RoutesNames.EPIZODE_PROMJENI} element={<EpizodePromjeni />} />


          <Route path={RoutesNames.SERIJE_PREGLED} element={<Serije />} />
          <Route path={RoutesNames.SERIJE_NOVI} element={<SerijeDodaj />} />
          <Route path={RoutesNames.SERIJE_PROMJENI} element={<SerijePromjeni />} />

          <Route path={RoutesNames.KORISNICI_PREGLED} element={<Korisnici />} />
          <Route path={RoutesNames.KORISNICI_NOVI} element={<KorisniciDodaj />} />
          <Route path={RoutesNames.KORISNICI_PROMJENI} element={<KorisniciPromjeni />} />

          <Route path={RoutesNames.ZANROVI_PREGLED} element={<Zanrovi />} />
          <Route path={RoutesNames.ZANROVI_NOVI} element={<ZanroviDodaj />} />
          <Route path={RoutesNames.ZANROVI_PROMJENI} element={<ZanroviPromjeni />} />


          <Route path={RoutesNames.SEZONE_PREGLED} element={<Sezone />} />
          <Route path={RoutesNames.SEZONE_NOVI} element={<SezoneDodaj />} />
          <Route path={RoutesNames.SEZONE_PROMJENI} element={<SezonePromjeni />} />
        </>
      </Routes>
    </>
  )
}

export default App
