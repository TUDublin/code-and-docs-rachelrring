using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using budget_server;

namespace budget_server.Data
{
    public class budget_serverContext : DbContext
    {
        public budget_serverContext (DbContextOptions<budget_serverContext> options)
            : base(options)
        {
        }

        public DbSet<budget_server.Budget> Budget { get; set; } = default!;
    }
}
