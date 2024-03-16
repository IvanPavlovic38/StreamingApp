using System.ComponentModel.DataAnnotations;

namespace projectStreaming.models
{
    public class Zanr : Entitet
    {
        [Required(ErrorMessage = "Naziv obavezno")]
        public string? Naziv { get; set; }
    }
}
