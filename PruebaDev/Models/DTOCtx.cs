using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PruebaDev.Models
{
    public partial class PruebaDevContext : DbContext
    {
        public virtual DbSet<RespuestaSP> RespuestaSPs { get; set; }
        partial void OnModelCreatingPartial(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<RespuestaSP>(entity => { entity.HasNoKey(); });
        }




    }
}
