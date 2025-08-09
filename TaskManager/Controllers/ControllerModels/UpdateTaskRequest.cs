using TaskManager.Domain.Models.TaskModels;

namespace TaskManager.Controllers.ControllerModels
{
    public class UpdateTaskRequest
    {
        public int Id { get; set; }
        public required string Title { get; set; }
        public string? Description { get; set; }
        public bool IsCompleted { get; set; }
        public DateTime DueDate { get; set; }
        public int? AssignedToId { get; set; }

        public bool IsValid()
        {
            return true;
        }

        public static implicit operator UpdateTaskModel(UpdateTaskRequest request)
        {
            return new UpdateTaskModel
            {
                Id = request.Id,
                Title = request.Title,
                Description = request.Description,
                IsCompleted = request.IsCompleted,
                DueDate = request.DueDate,
                AssignedToId = request.AssignedToId
            };
        }
    }
}
