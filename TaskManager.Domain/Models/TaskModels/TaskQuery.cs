namespace TaskManager.Domain.Models.TaskModels
{
    public record TaskQuery
    {
        public int? Id { get; set; }
        public bool? IsCompleted { get; set; }
        public DateTime? DueDateSearchRangeStart { get; set; }
        public DateTime? DueDateSearchRangeEnd { get; set; }

        public bool SortByTitle { get; set; } = false;
        public bool SortByDueDate { get; set; } = false;

        public int PageSize { get; set; } = 10;
        public int PageNumber { get; set; } = 0;
    }
}
