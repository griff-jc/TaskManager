using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskManager.Persistence.EFCore
{
    public class TaskManagerDbContext(DbContextOptions options) : DbContext(options)
    {
        internal DbSet<DbModels.DbTaskModel> Tasks { get; set; }
        internal DbSet<DbModels.DbUser> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<DbModels.DbTaskModel>()
                .ToTable("Task")
                .HasKey(t => t.Id);
            modelBuilder.Entity<DbModels.DbUser>()
                .ToTable("User")
                .HasMany(e => e.Tasks)
                .WithOne(e => e.AssignedTo)
                .HasForeignKey(e => e.AssignedToId)
                .IsRequired(false);
        }
    }
}
