using TaskManager.Domain.Models.TaskModels;

namespace TaskManager.Controllers.ControllerModels
{
    public class CreateTaskRequest
    {
        public required string Title { get; set; }
        public string? Description { get; set; }
        public bool IsCompleted { get; set; }
        public DateTime? DueDate { get; set; }
        public required int CreatedById { get; set; }
        public int? AssignedToId { get; set; }

        public static implicit operator CreateTaskModel(CreateTaskRequest request)
        {
            return new CreateTaskModel
            {
                Title = request.Title,
                Description = request.Description,
                IsCompleted = request.IsCompleted,
                DueDate = request.DueDate,
                CreatedById = request.CreatedById,
                AssignedToId = request.AssignedToId
            };
        }
    }
}
