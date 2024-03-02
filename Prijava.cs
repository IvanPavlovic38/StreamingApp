using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UcenjeCS.StreamingApp
{
    internal class Prijava
    {
        public void PrikaziIzbornik()
        {
            Console.WriteLine("Izbornik za prijavu");
            Console.WriteLine("1. Unos korisničkog imena, lozinke i emaila");
            Console.WriteLine("2. Povratak na glavni izbornik");
            switch(Pomocno.ucitajBrojRaspon("Odaberite stavku izbornika: ",
                "Odabir mora biti 1 - 2.", 1, 2))
            {
                case 1:
                    Unos();
                    PrikaziIzbornik();
                    break;
                case 2:
                    Console.WriteLine("Gotov rad s prijavom");
                    break;
            }
        }

        private void Unos()
        {
            var g = new Korisnik();
            g.KorisnickoIme = Pomocno.UcitajString("Unesi korisničko ime", "Ime obavezno");
            g.Lozinka = Pomocno.UcitajString("Unesi lozinku", "Lozinka obavezna");
            g.Email = Pomocno.UcitajString("Unesi email", "Email obavezan");
            Korisnici.Add(g);
        }
    }
}
