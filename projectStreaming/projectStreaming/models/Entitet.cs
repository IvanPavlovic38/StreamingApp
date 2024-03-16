using System.ComponentModel.DataAnnotations;

namespace projectStreaming.models
{
 
    public abstract class Entitet
    {
       
        [Key]
        public int Sifra { get; set; }
    }
}