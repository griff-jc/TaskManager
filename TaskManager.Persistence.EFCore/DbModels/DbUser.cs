namespace TaskManager.Persistence.EFCore.DbModels
{
    public class DbUser : DbBaseModel
    {
        public int Id { get; set; }
        public ICollection<DbTaskModel> Tasks { get; set; } = [];

    }
}
