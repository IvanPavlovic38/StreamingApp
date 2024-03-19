namespace projectStreaming.models
{
    public class Korisnik : Entitet
    {
        public string? KorisnickoIme { get; set; }

        public string? Lozinka { get; set; }

        public string? Email { get; set; }

        public string? Jezik { get; set; }
    }
}
