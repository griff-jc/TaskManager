using TaskManager.Domain.Models.TaskModels;

namespace TaskManager.Controllers.ControllerModels
{
    public class TaskQueryRequest
    {
        public int? Id { get; set; }
        public bool? IsCompleted { get; set; }
        public DateTime? DueDateSearchRangeStart { get; set; }
        public DateTime? DueDateSearchRangeEnd { get; set; }

        public bool SortByTitle { get; set; } = false;
        public bool SortByDueDate { get; set; } = false;

        public int PageSize { get; set; } = 10;
        public int PageNumber { get; set; } = 0;

        public static implicit operator TaskQuery(TaskQueryRequest request)
        {
            return new TaskQuery
            {
                Id = request.Id,
                IsCompleted = request.IsCompleted,
                DueDateSearchRangeStart = request.DueDateSearchRangeStart,
                DueDateSearchRangeEnd = request.DueDateSearchRangeEnd,
                SortByTitle = request.SortByTitle,
                SortByDueDate = request.SortByDueDate,
                PageSize = request.PageSize,
                PageNumber = request.PageNumber
            };
        }
    }
}
