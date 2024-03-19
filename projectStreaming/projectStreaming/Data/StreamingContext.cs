using projectStreaming.models;
using Microsoft.EntityFrameworkCore;


namespace projectStreaming.Data
{
    public class StreamingContext : DbContext
    {

        /// <param name="options"></param>
        public StreamingContext(DbContextOptions<StreamingContext> options)
            : base(options)
        {

        }

        public DbSet<Serija> Serije { get; set; }

        public DbSet<Zanr> Zanrovi { get; set; }

        public DbSet<Sezona> Sezone { get; set; }

        public DbSet<Epizoda> Epizode { get; set; }

        public DbSet<Korisnik> Korisnici { get; set; }
    }
}