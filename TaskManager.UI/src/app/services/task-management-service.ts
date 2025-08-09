import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskManagementService {
  private readonly baseUrl = '/api/tasks';

  constructor(private http: HttpClient) { }

  createTask() {

  }

  getTasks() { }

  getTaskById(taskId: number) { }

  updateTask() { }

  deleteTask() { }
}
