using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TaskManager.Domain.Interfaces;
using TaskManager.Domain.Models.TaskModels;
using TaskManager.Persistence.EFCore.DbModels;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

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

        public async Task<TaskCollectionModel> GetTasksAsync(TaskQuery taskQuery)
        {
            var dbQuery = _dbContext.Tasks.AsQueryable();
            if (taskQuery.Id.HasValue)
            {
                dbQuery = dbQuery.Where(t => t.Id == taskQuery.Id.Value);
            }
            if (taskQuery.IsCompleted.HasValue)
            {
                dbQuery = dbQuery.Where(t => t.IsCompleted == taskQuery.IsCompleted.Value);
            }
            if (taskQuery.DueDateSearchRangeStart.HasValue)
            {
                dbQuery = dbQuery.Where(t => t.DueDate >= taskQuery.DueDateSearchRangeStart.Value);
            }
            if (taskQuery.DueDateSearchRangeEnd.HasValue)
            {
                dbQuery = dbQuery.Where(t => t.DueDate <= taskQuery.DueDateSearchRangeEnd.Value);
            }
            if (taskQuery.SortByTitle)
            {
                dbQuery = dbQuery.OrderBy(t => t.Title);
            }
            if (taskQuery.SortByDueDate)
            {
                dbQuery = dbQuery.OrderBy(t => t.DueDate);
            }

            return new TaskCollectionModel()
            {
                Tasks = await dbQuery
                    .Skip(taskQuery.PageNumber * taskQuery.PageSize)
                    .Take(taskQuery.PageSize)
                    .Select(x => (TaskModel)x).ToListAsync(),
                TotalCount = await _dbContext.Tasks.CountAsync(),
            };
        }

        public Task<TaskModel?> UpdateTaskAsync(UpdateTaskModel taskModel)
        {
            throw new NotImplementedException();
        }
    }
}
