using TaskManager.Domain.Interfaces;
using TaskManager.Domain.Models.TaskModels;

namespace TaskManager.Persistence.EFCore
{
    public class EFCorePersistenceProvider : IPersistenceProvider
    {
        public Task<TaskModel?> CreateTaskAsync(CreateTaskModel taskModel)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeleteTaskAsync(int taskId)
        {
            throw new NotImplementedException();
        }

        public Task<TaskCollectionModel> GetTasksAsync(TaskQuery taskQuery)
        {
            throw new NotImplementedException();
        }

        public Task<TaskModel?> UpdateTaskAsync(UpdateTaskModel taskModel)
        {
            throw new NotImplementedException();
        }
    }
}
