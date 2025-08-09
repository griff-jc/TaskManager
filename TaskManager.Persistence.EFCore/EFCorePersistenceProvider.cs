using Microsoft.Extensions.Logging;
using TaskManager.Domain.Interfaces;
using TaskManager.Domain.Models.TaskModels;
using TaskManager.Persistence.EFCore.DbModels;

namespace TaskManager.Persistence.EFCore
{
    public class EFCorePersistenceProvider : IPersistenceProvider
    {
        private readonly TaskManagerDbContext _dbContext;
        private readonly ILogger<EFCorePersistenceProvider> _logger;

        public EFCorePersistenceProvider(TaskManagerDbContext dbContext, ILogger<EFCorePersistenceProvider> logger)
        {
            _dbContext = dbContext;
            _logger = logger;
        }

        public async Task<TaskModel?> CreateTaskAsync(CreateTaskModel taskModel)
        {
            try
            {
                var dbTask = (DbTaskModel)taskModel;
                _dbContext.Tasks.Add(dbTask);
                var resultsChanged = await _dbContext.SaveChangesAsync();
                if (resultsChanged > 0)
                {
                    return dbTask;
                }
                else
                {
                    _logger.LogWarning("No changes were made when trying to create the task: {taskTitle}.", taskModel.Title);
                    return null;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while creating the task: {taskTitle}.", taskModel.Title);
                return null;
            }
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
