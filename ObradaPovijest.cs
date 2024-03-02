using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UcenjeCS.StreamingApp
{
    internal class ObradaPovijest
    {
        public void PrikaziIzbornik()
        {
            Console.WriteLine("Izbornik za rad s poviješču");
            Console.WriteLine("1. Prikaži povijest");
            Console.WriteLine("2. Obriši epizodu");
            Console.WriteLine("3. Povratak na glavni izbornik");
            switch (Pomocno.ucitajBrojRaspon("Odaberite stavku izbornika povijesti: ",
                "Odabir mora biti 1-3", 1, 3))
            {
                case 1:
                    PregledPovijesti();
                    PrikaziIzbornik();
                    break;
                case 2:
                    BrisanjeEpizode();
                    PrikaziIzbornik();
                    break;
                case 3:
                    Console.WriteLine("Gotov rad s poviješču");
                    break;
            }
        }

        private void PregledPovijesti()
        {
            Console.WriteLine("------------------");
            Console.WriteLine("---- Povijest ----");
            Console.WriteLine("------------------");
            int b = 1;
            foreach (Epizoda epizoda in Epizode)
            {
                if (epizoda.Pogledano == 1)
                {
                    Console.WriteLine("{0}. {1}", b++, epizoda);
                }

            }
            Console.WriteLine("------------------");
        }

        private void BrisanjeEpizode()
        {
            PregledPovijesti();
            int index = Pomocno.ucitajBrojRaspon("Odaberi redni broj epizode: ", "Nije dobar odabir", 1, Epizode.Count());
            var p = Epizode[index - 1];
            p.Pogledano = 0;
        }
    }
}
