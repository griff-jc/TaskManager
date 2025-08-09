using TaskManager.Domain.Models;

namespace TaskManager.Domain.Interfaces
{
    public interface IPersistenceProviderFactory
    {
        public IPersistenceProvider CreateProvider(PersistenceProviders persistenceProvider);
    }
}
