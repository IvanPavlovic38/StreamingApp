using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UcenjeCS.StreamingApp
{
    internal class Prijava
    {
        private void PozdravnaPoruka()
        {
            Console.WriteLine("Dobrodosli u streaming app");
            Console.WriteLine("Upisite korisnicko ime, lozinku i email");
        }

        private void UpisiKorisnickoIme()
        {
            KorisnickoIme = Pomocno.UcitajString("Korisničko ime: ");
        }

        private void UpisiLozinku()
        {
            Lozinka = Pomocno.UcitajString("Lozinka: ");
        }

        private void UpisiEmail()
        {
            Email = Pomocno.UcitajString("Email: ");
        }
    }
}
