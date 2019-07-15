using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace time_keeper.Models
{
    public class HolderContext : DbContext
    {
        public HolderContext(DbContextOptions<HolderContext> options) : base(options) { }
        public DbSet<Holder> HoldingUser { get; set; }
    }

    public class Holder
    {
        [Key]
        public string holder { get; set; }
        
        public Holder(string holder)
        {
            this.holder = holder;
        }
    }
}
