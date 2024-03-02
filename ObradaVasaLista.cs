using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace UcenjeCS.StreamingApp
{
    internal class ObradaVasaLista
    {
        public void PrikaziIzbornik()
        {
            Console.WriteLine("1. Prikaži listu");
            Console.WriteLine("2. Ukloni seriju");
            Console.WriteLine("3. Povratak na glavni izbornik");

            switch ()
            {
                case 1:
                    PrikaziListu();
                    PrikaziIzbornik();
                    break;
                case 2:
                    UkloniSeriju();
                    PrikaziIzbornik();
                    break;
                case 3:
                    Console.WriteLine("Gotov rad s vašom listom");
                    break;
            }

            public void PrikaziListu()
            {
                Console.WriteLine("------------------------");
                Console.WriteLine("---- Gledaj kasnije ----");
                Console.WriteLine("------------------------");
                int b = 1;
                foreach (Serija serija in Serije)
                {
                    if(serija.GledajKasnije == 1)
                    {
                        Console.WriteLine("{0}. {1}", b++, serija);
                    }
                }
                Console.WriteLine("------------------------");
            }

            private void UkloniSeriju()
            {
                PrikaziListu();
                int index = Pomocno.ucitajBrojRaspon("Odaberi redni broj serije: ", "Nije dobar odabir", 1, Smjerovi.Count());
                var p = Serije[index - 1];
                p.GledajKasnije = 0;
            }
        }
    }
}
