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
        public List<Serija> Serije { get; }

        public ObradaTrazi()
        {
            Serije = new List<Serija>();
            if (Pomocno.dev)
            {
                TestniPodaci();
            }
        }

        public void PrikaziIzbornik()
        {
            Console.WriteLine("Tražilica");
            Console.WriteLine("1. Traži po nazivu");
            Console.WriteLine("2. Traži po žanru");
            Console.WriteLine("3. Traži po datumu izdavanja");

            switch ()
            {
                case 1:
                    TraziNaziv();
                    PrikaziIzbornik();
                    break;
                case 2:
                    TraziZanr();
                    PrikaziIzbornik();
                    break;
                case 3:
                    TraziDatum();
                    PrikaziIzbornik();
                    break;
            }

            private void TraziNaziv() { }

            private void TraziZanr() { }

            private void TraziDatum() { }
        }
    }
}
