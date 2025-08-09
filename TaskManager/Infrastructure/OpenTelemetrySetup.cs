using OpenTelemetry.Logs;
using OpenTelemetry.Metrics;
using OpenTelemetry.Resources;
using OpenTelemetry.Trace;

namespace TaskManager.Infrastructure
{
    internal static class OpenTelemetrySetup
    {
        public static void AddOpenTelemetry(this WebApplicationBuilder builder)
        {
            var resourceBuilder = ResourceBuilder.CreateDefault().AddService("TaskManagementService", serviceVersion: "1.0.0");
            builder.Logging.AddOpenTelemetry(options =>
            {
                options.SetResourceBuilder(resourceBuilder)
                    .AddConsoleExporter();
            });
            builder.Services.AddOpenTelemetry().WithMetrics(metrics =>
            {
                metrics.SetResourceBuilder(resourceBuilder)
                    .AddRuntimeInstrumentation()
                    .AddAspNetCoreInstrumentation()
                    .AddHttpClientInstrumentation()
                    .AddProcessInstrumentation()
                    .AddConsoleExporter();
            })
            .WithTracing(tracing =>
            {
                tracing.SetResourceBuilder(resourceBuilder)
                    .AddAspNetCoreInstrumentation()
                    .AddHttpClientInstrumentation()
                    .AddEntityFrameworkCoreInstrumentation()
                    .AddConsoleExporter();
            });
        }
    }
}
