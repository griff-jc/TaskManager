namespace TaskManager.Domain.Models.TaskModels
{
    public class CreateTaskModel
    {
        public required string Title { get; set; }
        public string? Description { get; set; }
        public bool IsCompleted { get; set; }
        public DateTime? DueDate { get; set; }
        public required int CreatedById { get; set; }
        public int? AssignedToId { get; set; }
    }
}
