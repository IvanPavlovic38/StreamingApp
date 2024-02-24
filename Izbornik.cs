using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UcenjeCS.StreamingApp
{
    internal class Izbornik
    {
        private void PozdravnaPoruka()
        {
            Console.WriteLine("***********************************");
            Console.WriteLine("********** Streaming app **********");
            Console.WriteLine("***********************************");
        }

        public Izbornik() 
        {
            Pomocno.dev = false;
            ObradaTrazi = new ObradaTrazi();
            ObradaZanrovi = new ObradaZanrovi();
            ObradaVasaLista = new ObradaVasaLista();
            ObradaPovijest = new ObradaPovijest();
            PozdravnaPoruka();
            PrikaziIzbornik();
        }

        private void PrikaziIzbornik()
        {
            Console.WriteLine("Glavni izbornik");
            Console.WriteLine("1. Traži serije");
            Console.WriteLine("2. Žanrovi");
            Console.WriteLine("3. Vaša lista");
            Console.WriteLine("4. Povijest gledanja");
            Console.WriteLine("5. Izlaz iz programa");

            switch ()
            {
                case 1:
                    ObradaTrazi.PrikaziIzbornik();
                    PrikaziIzbornik();
                    break;
                case 2:
                    ObradaZanrovi.PrikaziIzbornik();
                    PrikaziIzbornik();
                    break;
                case 3:
                    ObradaVasaLista.PrikaziIzbornik();
                    PrikaziIzbornik(); ;
                    break;
                case 4:
                    ObradaPovijest.PrikaziIzbornik();
                    PrikaziIzbornik();
                    break;
                case 5:
                    Console.WriteLine("Hvala na korištenju, doviđenja");
                    break;
            }
        }
    }
}
