namespace TaskManager.Persistence.EFCore.DbModels
{
    internal class DbUser
    {
        public int Id { get; set; }
        public ICollection<DbTaskModel> Tasks { get; set; } = [];

    }
}
