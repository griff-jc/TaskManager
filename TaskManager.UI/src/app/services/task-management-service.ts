import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task, TaskCollectionResponse, TaskCreateRequest, TaskQueryRequest, TaskUpdateRequest } from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskManagementService {
  private readonly baseUrl = '/api/tasks';

  constructor(private http: HttpClient) { }

  createTask(request: TaskCreateRequest): Observable<Task> {
    return this.http.post<Task>(`${this.baseUrl}`, request);
  }

  getTasks(request: TaskQueryRequest): Observable<TaskCollectionResponse> {
    const params = this.buildQueryParams(request);
    return this.http.get<TaskCollectionResponse>(this.baseUrl, { params });
  }

  getTaskById(taskId: number): Observable<Task> {
    return this.http.get<Task>(`${this.baseUrl}/${taskId}`);
  }

  updateTask(request: TaskUpdateRequest): Observable<Task> {
    return this.http.put<Task>(`${this.baseUrl}/${request.id}`, request);
  }

  deleteTask(taskId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${taskId}`);
  }

  private buildQueryParams(request: TaskQueryRequest): HttpParams {
    const params: { [key: string]: string } = {};
    
    if (request.id !== undefined) params['id'] = request.id.toString();
    if (request.isCompleted !== undefined) params['isCompleted'] = request.isCompleted.toString();
    if (request.dueDateSearchRangeStart) params['dueDateSearchRangeStart'] = request.dueDateSearchRangeStart;
    if (request.dueDateSearchRangeEnd) params['dueDateSearchRangeEnd'] = request.dueDateSearchRangeEnd;

    params['sortByTitle'] = request.sortByTitle.toString();
    params['sortByDueDate'] = request.sortByDueDate.toString();
    params['pageSize'] = request.pageSize.toString();
    params['pageNumber'] = request.pageNumber.toString();

    return new HttpParams({ fromObject: params });
  }
}
