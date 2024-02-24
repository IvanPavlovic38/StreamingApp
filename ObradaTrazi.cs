using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using UcenjeCS.StreamingApp.Model;

namespace UcenjeCS.StreamingApp
{
    internal class ObradaTrazi
    {
        public void PrikaziIzbornik()
        {
            Console.WriteLine("Tražilica");
            Console.WriteLine("1. Traži seriju");
            Console.WriteLine("2. Povratak na glavni izbornik");
            switch(Pomocno.ucitajBrojRaspon("Odaberite stavku izbornika: ",
                "Odabir mora biti 1 - 2.", 1, 2))
            {
                case 1:
                    TraziSeriju();
                    GledanjeSerije();
                    PrikaziIzbornik();
                    break;
                case 2:
                    Console.WriteLine("Gotov rad s tražilicom");
                    break;
            }
        }

        public void TraziSeriju() 
        {
            Pomocno.UcitajString("Upiši naziv serije", "Serija ne postoji");
        }

        public void GledanjeSerije() 
        {
            Console.WriteLine("1. Sada gledaj seriju");
            Console.WriteLine("2. Kasnije gledaj seriju");
            Console.WriteLine("3. Povratak na glavni izbornik");
            switch (Pomocno.ucitajBrojRaspon("Odaberite stavku izbornika: ",
                "Odabir mora biti 1 - 3.", 1, 3))
            {
                case 1:
                    SadaGledaj();
                    PrikaziIzbornik();
                    break;
                case 2:
                    GledajKasnije();
                    PrikaziIzbornik();
                    break;
                case 3:
                    Console.WriteLine("Gotov rad s gledanjem");
                    break;
            }
        }

        private void SadaGledaj()
        {
            
        }

        private void GledajKasnije()
        {

        }
    }
}
