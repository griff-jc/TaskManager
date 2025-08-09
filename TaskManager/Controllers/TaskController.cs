using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TaskManager.Controllers.ControllerModels;
using TaskManager.Domain.Interfaces;

namespace TaskManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly ITaskManagementService _taskManagementService;

        public TaskController(ITaskManagementService taskManagementService)
        {
            _taskManagementService = taskManagementService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateTaskAsync([FromBody] CreateTaskRequest createTaskModel)
        {
            if (createTaskModel == null)
            {
                return BadRequest("Task model cannot be null.");
            }
            try
            {
                var createdTask = await _taskManagementService.CreateTaskAsync(createTaskModel);
                if (createdTask == null)
                {
                    return Problem(detail: "Failed to create task", statusCode: 500, title: "An error occurred while creating the task");
                }
                return Created($"api/task/{createdTask.Id}", createdTask);
            } catch (Exception ex)
            {
                return Problem(detail: ex.Message, statusCode: 500, title: "An error occurred while creating the task");
            }
    }
}
