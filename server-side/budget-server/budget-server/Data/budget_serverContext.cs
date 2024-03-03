using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using budget_server;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace budget_server.Data
{
    public class budget_serverContext : IdentityDbContext<User>
    {
        public budget_serverContext (DbContextOptions<budget_serverContext> options)
            : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

        public DbSet<budget_server.Budget> Budget { get; set; } = default!;
    }
}
