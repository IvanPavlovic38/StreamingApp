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
            Console.WriteLine("Vaša lista");
            Console.WriteLine("1. Pregled liste");
            Console.WriteLine("2. Dodaj novu seriju");
            Console.WriteLine("3. Ukloni seriju");
            Console.WriteLine("4. Povratak na glavni izbornik");

            switch ()
            {
                case 1:
                    PregledListe();
                    PrikaziIzbornik(); 
                    break;
                case 2:
                    DodajSeriju();
                    PrikaziIzbornik();
                    break;
                case 3:
                    UkloniSeriju();
                    PrikaziIzbornik();
                    break;
                case 4:
                    Console.WriteLine("Gotov rad s vašom listom");
                    break;
            }

            private void PregledListe()
            {
                
            }

            private void DodajSeriju()
            {
                
            }

            private void UkloniSeriju()
            {
                
            }
        }
    }
}
