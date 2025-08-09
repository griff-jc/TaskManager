
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;
using TaskManager.Domain;
using TaskManager.Domain.Interfaces;
using TaskManager.Infrastructure;
using TaskManager.Persistence.EFCore;

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
    }
}
