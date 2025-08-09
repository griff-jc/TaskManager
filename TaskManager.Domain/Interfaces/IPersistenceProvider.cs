using TaskManager.Domain.Models.TaskModels;

namespace TaskManager.Domain.Interfaces
{
    public interface IPersistenceProvider
    {
        public Task<TaskModel?> CreateTaskAsync(CreateTaskModel taskModel);
        public Task<TaskCollectionModel> GetTasksAsync(TaskQuery taskQuery);
        public Task<TaskModel?> UpdateTaskAsync(UpdateTaskModel taskModel);
        public Task<bool> DeleteTaskAsync(int taskId);
    }
}
