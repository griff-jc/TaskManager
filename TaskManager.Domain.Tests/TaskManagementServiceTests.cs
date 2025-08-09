using Moq;
using TaskManager.Domain.Interfaces;
using TaskManager.Domain.Models;
using TaskManager.Domain.Models.TaskModels;

namespace TaskManager.Domain.Tests
{
    public class TaskManagementServiceTests
    {

        [Test]
        public async Task CreateTaskAsync_DelegatesToPersistenceProviderFactory_AndThenReturnsCreatedTask()
        {
            var createModel = new CreateTaskModel
            {
                Title = "Test Task",
                Description = "This is a test task",
                IsCompleted = false,
                DueDate = DateTime.Now.AddDays(1),
                CreatedById = 1
            };

            var expectedTask = new TaskModel
            {
                Id = 2,
                Title = createModel.Title,
                Description = createModel.Description,
                IsCompleted = createModel.IsCompleted,
                DueDate = createModel.DueDate,
                CreatedById = createModel.CreatedById,
            };

            var mockPersistenceProvider = new Mock<IPersistenceProvider>();
            mockPersistenceProvider
                .Setup(provider => provider.CreateTaskAsync(It.Is<CreateTaskModel>(m =>
                    m.Title == createModel.Title &&
                    m.Description == createModel.Description &&
                    m.IsCompleted == createModel.IsCompleted &&
                    m.DueDate == createModel.DueDate &&
                    m.CreatedById == createModel.CreatedById
                ))).ReturnsAsync(expectedTask);

            var mockPersistenceProviderFactory = new Mock<IPersistenceProviderFactory>();
            mockPersistenceProviderFactory
                .Setup(factory => factory.CreateProvider(It.Is<PersistenceProviders>(x => x == PersistenceProviders.PostGreSQL)))
                .Returns(mockPersistenceProvider.Object);

            var taskManagementService = new TaskManagementService(mockPersistenceProviderFactory.Object);

            var result = await taskManagementService.CreateTaskAsync(createModel);

            mockPersistenceProviderFactory.Verify(factory => factory.CreateProvider(It.Is<PersistenceProviders>(x => x == PersistenceProviders.PostGreSQL)), Times.Once);
            mockPersistenceProvider.Verify(provider => provider.CreateTaskAsync(It.Is<CreateTaskModel>(m =>
                m.Title == createModel.Title &&
                m.Description == createModel.Description &&
                m.IsCompleted == createModel.IsCompleted &&
                m.DueDate == createModel.DueDate &&
                m.CreatedById == createModel.CreatedById)), Times.Once);

            Assert.Multiple(() =>
            {
                Assert.That(result, Is.Not.EqualTo(null));
                Assert.That(result?.Id, Is.EqualTo(expectedTask.Id));
                Assert.That(result?.Title, Is.EqualTo(expectedTask.Title));
            });
        }
    }
}
