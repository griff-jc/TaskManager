
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;
using System.Threading.Tasks;
using TaskManager.Domain;
using TaskManager.Domain.Interfaces;
using TaskManager.Infrastructure;
using TaskManager.Persistence.EFCore;
using TaskManager.Persistence.EFCore.DbModels;

namespace TaskManager
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddDbContext<TaskManagerDbContext>(options =>
            {
                options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
                SeedDatabase(options);
            });

            builder.Services.AddTransient<ITaskManagementService, TaskManagementService>();
            builder.Services.AddTransient<IPersistenceProviderFactory, PersistenceProviderFactory>();
            builder.Services.AddTransient<EFCorePersistenceProvider>();

            builder.Services.AddControllers();
            // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
            builder.Services.AddOpenApi();

            if(!builder.Environment.IsDevelopment())
            {
                builder.AddOpenTelemetry();
            }

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.MapOpenApi();
                app.MapScalarApiReference();
                app.UseDeveloperExceptionPage();
                app.UseMigrationsEndPoint();
            }

            // Ensure the database is created and migrations are applied
            using (var scope = app.Services.CreateScope())
            {
                var dbContext = scope.ServiceProvider.GetRequiredService<TaskManagerDbContext>();
                dbContext.Database.Migrate();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }

        private static void SeedDatabase(DbContextOptionsBuilder options)
        {
            options.UseSeeding((context, _) =>
            {
                var defaultUser = context.Set<DbUser>().FirstOrDefault();
                if (defaultUser == null)
                {
                    context.Set<DbUser>().Add(new DbUser());
                    context.SaveChanges();
                }
                defaultUser = context.Set<DbUser>().First();

                var seededTasks = context.Set<DbTaskModel>().Count();
                if (seededTasks < 15)
                {

                    var random = new Random();
                    var titles = new[] { "Write report", "Fix bug", "Design UI", "Plan sprint", "Review PR" };
                    var descriptions = new[] { "Urgent", "Low priority", "Requires discussion", "Backend task", "Frontend task" };

                    for (int i = seededTasks; i < 15; i++)
                    {
                        var title = titles[random.Next(titles.Length)] + $" #{random.Next(1000, 9999)}";
                        var description = descriptions[random.Next(descriptions.Length)] + $" ({Guid.NewGuid().ToString()[..8]})";
                        var dueDate = DateTime.UtcNow.AddDays(random.Next(1, 30));
                        var isCompleted = random.NextDouble() > 0.5;

                        context.Set<DbTaskModel>().Add(new DbTaskModel
                        {
                            Title = title,
                            Description = description,
                            DueDate = dueDate,
                            IsCompleted = isCompleted,
                            CreatedById = defaultUser.Id,
                        });
                    }
                    context.SaveChanges();
                }
            });
        }
    }
}
