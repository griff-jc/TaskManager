using TaskManager.Domain.Interfaces;
using TaskManager.Domain.Models;
using TaskManager.Persistence.EFCore;

namespace TaskManager.Infrastructure
{
    public class PersistenceProviderFactory : IPersistenceProviderFactory
    {
        private readonly IServiceProvider _serviceProvider;

        public PersistenceProviderFactory(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        public IPersistenceProvider CreateProvider(PersistenceProviders persistenceProvider)
        {
           return persistenceProvider switch
            {
                PersistenceProviders.PostGreSQL => _serviceProvider.GetRequiredService<EFCorePersistenceProvider>(),
                // Add other persistence providers here as needed
                _ => throw new NotSupportedException($"Persistence provider {persistenceProvider} is not supported.")
            };
        }
    }
}
