using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace budget_server
{
    public class Budget
    {
        [Key]
        public string Email { get; set; }
        public double Income { get; set; }
        public double Expenses { get; set; }
    }
}
