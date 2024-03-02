using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace projectStreaming.models
{

    
    public class Serija:Entitet
    {

        [Required(ErrorMessage = "Naziv obavezno")]
        public string? Naziv { get; set; }


        [Required(ErrorMessage = "Opis obavezno")]
        public string? Opis { get; set; }

    }
}