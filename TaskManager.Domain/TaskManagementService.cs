using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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

        public Task<bool> DeleteTaskAsync(int taskId)
        {
            throw new NotImplementedException();
        }

        public Task<TaskCollectionModel> GetTasksAsync(TaskQuery query)
        {
            throw new NotImplementedException();
        }

        public Task<TaskModel?> UpdateTaskAsync(UpdateTaskModel taskToUpdate)
        {
            throw new NotImplementedException();
        }
    }
}
