using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UcenjeCS.StreamingApp.Model
{
    internal class Epizoda
    {
        public string Naziv { get; set; }
        public float Trajnje { get; set; }
        public string Opis { get; set; }
        public bool Pogledano { get; set; }
        public float DatumIzdavanja { get; set; }
        public int Sezona { get; set; }
    }
}
