namespace projectStreaming.models
{
    public class Epizoda : Entitet
    {
        public string? Naziv { get; set; }

        public int? Trajanje { get; set; }

        public string? Opis { get; set; }

        public DateTime? DatumIzadavnja { get; set; }
    }
}
