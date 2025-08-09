using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TaskManager.Controllers.ControllerModels;
using TaskManager.Domain.Interfaces;
using TaskManager.Domain.Models.TaskModels;

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

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTask(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid task ID.");
            }
            try
            {
                var task = await _taskManagementService.GetTasksAsync(new TaskQuery() { Id = id });
                if (task.Tasks.Count == 0)
                {
                    return NotFound($"Task with ID {id} not found.");
                }
                return Ok(task.Tasks.First());
            }
            catch (Exception ex)
            {
                return Problem(detail: ex.Message, statusCode: 500, title: "An error occurred while retrieving the task");
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetTasks([FromQuery] TaskQueryRequest taskQuery)
        {
            try
            {
                var tasks = await _taskManagementService.GetTasksAsync(taskQuery);
                if (tasks.Tasks.Count == 0)
                {
                    return NotFound("No tasks found.");
                }
                return Ok(tasks);
            }
            catch (Exception ex)
            {
                return Problem(detail: ex.Message, statusCode: 500, title: "An error occurred while retrieving tasks");
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateTask([FromBody] CreateTaskRequest createTaskModel)
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
            }
            catch (Exception ex)
            {
                return Problem(detail: ex.Message, statusCode: 500, title: "An error occurred while creating the task");
            }
        }
    }
}
