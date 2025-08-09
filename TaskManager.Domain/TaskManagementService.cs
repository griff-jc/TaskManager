using TaskManager.Domain.Interfaces;
using TaskManager.Domain.Models;
using TaskManager.Domain.Models.TaskModels;

namespace TaskManager.Domain
{
    public class TaskManagementService : ITaskManagementService
    {
        private readonly IPersistenceProviderFactory _persistenceProviderFactory;

        public TaskManagementService(IPersistenceProviderFactory persistenceProviderFactory)
        {
            _persistenceProviderFactory = persistenceProviderFactory;
        }

        public async Task<TaskModel?> CreateTaskAsync(CreateTaskModel createTaskModel)
        {
            var persistenceProvider = _persistenceProviderFactory.CreateProvider(PersistenceProviders.PostGreSQL);
            return await persistenceProvider.CreateTaskAsync(createTaskModel);
        }

        public async Task<bool> DeleteTaskAsync(int taskId)
        {
            var persistenceProvider = _persistenceProviderFactory.CreateProvider(PersistenceProviders.PostGreSQL);
            return await persistenceProvider.DeleteTaskAsync(taskId);
        }

        public async Task<TaskCollectionModel> GetTasksAsync(TaskQuery query)
        {
            var persistenceProvider = _persistenceProviderFactory.CreateProvider(PersistenceProviders.PostGreSQL);
            return await persistenceProvider.GetTasksAsync(query);
        }

        public async Task<TaskModel?> UpdateTaskAsync(UpdateTaskModel taskToUpdate)
        {
            var persistenceProvider = _persistenceProviderFactory.CreateProvider(PersistenceProviders.PostGreSQL);
            return await persistenceProvider.UpdateTaskAsync(taskToUpdate);
        }
    }
}
