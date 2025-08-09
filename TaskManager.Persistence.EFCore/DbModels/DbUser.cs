namespace TaskManager.Persistence.EFCore.DbModels
{
    internal class DbUser : DbBaseModel
    {
        public int Id { get; set; }
        public ICollection<DbTaskModel> Tasks { get; set; } = [];

    }
}
