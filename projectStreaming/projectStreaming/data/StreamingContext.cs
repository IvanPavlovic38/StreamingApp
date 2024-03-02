using projectStreaming.models;
using Microsoft.EntityFrameworkCore;

namespace projectStreaming.data
{
    public class StreamingContext : DbContext
    {

        /// <param name="options"></param>
        public StreamingContext(DbContextOptions<StreamingContext> options)
            : base(options)
        {

        }

        public DbSet<Serija> Serije { get; set; }
    }
}