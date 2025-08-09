using TaskManager.Domain.Models.TaskModels;

namespace TaskManager.Domain.Interfaces
{
    public interface ITaskManagementService
    {
        public Task<TaskModel?> CreateTaskAsync(CreateTaskModel createTaskModel);
        public Task<TaskCollectionModel> GetTasksAsync(TaskQuery query);
        public Task<TaskModel?> UpdateTaskAsync(UpdateTaskModel taskToUpdate);
        public Task<bool> DeleteTaskAsync(int taskId);
    }
}
