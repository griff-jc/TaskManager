using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManager.Domain.Interfaces;
using TaskManager.Domain.Models.TaskModels;

namespace TaskManager.Domain
{
    public class TaskManagementService : ITaskManagementService
    {
        public Task<TaskModel?> CreateTaskAsync(CreateTaskModel createTaskModel)
        {
            throw new NotImplementedException();
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
