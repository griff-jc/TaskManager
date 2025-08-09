namespace TaskManager.Domain.Models.TaskModels
{
    public class TaskCollectionModel
    {
        public required List<TaskModel> Tasks { get; set; }
        public required int TotalCount { get; set; }
    }
}
