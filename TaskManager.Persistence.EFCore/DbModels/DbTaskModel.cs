using TaskManager.Domain.Models.TaskModels;

namespace TaskManager.Persistence.EFCore.DbModels
{
    public class DbTaskModel : DbBaseModel
    {
        public int Id { get; set; }
        public required string Title { get; set; }
        public string? Description { get; set; }
        public bool IsCompleted { get; set; } = false;
        public DateTime? DueDate { get; set; }
        public int CreatedById { get; set; }
        public DbUser CreatedBy { get; set; } = null!;
        public int? AssignedToId { get; set; }
        public DbUser? AssignedTo { get; set; } = null!;

        public static implicit operator TaskModel(DbTaskModel dbTaskModel)
        {
            return new TaskModel
            {
                Id = dbTaskModel.Id,
                Title = dbTaskModel.Title,
                Description = dbTaskModel.Description,
                IsCompleted = dbTaskModel.IsCompleted,
                DueDate = dbTaskModel.DueDate,
                CreatedById = dbTaskModel.CreatedById,
                AssignedToId = dbTaskModel.AssignedToId
            };
        }

        public static implicit operator DbTaskModel(TaskModel taskModel)
        {
            return new DbTaskModel
            {
                Id = taskModel.Id,
                Title = taskModel.Title,
                Description = taskModel.Description,
                IsCompleted = taskModel.IsCompleted,
                DueDate = taskModel.DueDate,
                CreatedById = taskModel.CreatedById
            };
        }

        public static implicit operator DbTaskModel(CreateTaskModel createTaskModel)
        {
            return new DbTaskModel
            {
                Title = createTaskModel.Title,
                Description = createTaskModel.Description,
                DueDate = createTaskModel.DueDate,
                CreatedById = createTaskModel.CreatedById,
                AssignedToId = createTaskModel.AssignedToId
            };
        }
    }
}
