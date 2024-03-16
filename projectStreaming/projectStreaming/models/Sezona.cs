using System.ComponentModel.DataAnnotations;

namespace projectStreaming.models
{
    public class Sezona : Entitet
    {
        [Required(ErrorMessage = "Naziv obavezno")]
        public string? Naziv { get; set; }
    }
}
