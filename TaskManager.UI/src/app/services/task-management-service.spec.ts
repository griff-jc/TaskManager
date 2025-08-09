import { TestBed } from '@angular/core/testing';

import { TaskManagementService } from './task-management-service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Task, TaskCollectionResponse, TaskCreateRequest, TaskQueryRequest, TaskUpdateRequest } from '../models';
import { of } from 'rxjs';

describe('TaskManagementService', () => {
  let service: TaskManagementService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);

    TestBed.configureTestingModule({
      providers: [
        TaskManagementService,
        { provide: HttpClient, useValue: spy }
      ]
    });

    service = TestBed.inject(TaskManagementService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('createTask', () => {
    it('should call http.post with correct parameters', () => {
      // Arrange
      const request = new TaskCreateRequest(
        'Test Task',
        1,
        '2025-08-08T10:00:00Z',
        false,
        'Test description',
        2
      );
      const expectedResponse: Task = {
        id: 1,
        title: 'Test Task',
        description: 'Test description',
        isCompleted: false,
        dueDate: '2025-08-08T10:00:00Z',
        createdById: 1,
        assignedToId: 2
      };

      httpClientSpy.post.and.returnValue(of(expectedResponse));

      // Act
      service.createTask(request).subscribe(response => {
        expect(response).toEqual(expectedResponse);
      });

      // Assert
      expect(httpClientSpy.post).toHaveBeenCalledWith('/api/task', request);
      expect(httpClientSpy.post).toHaveBeenCalledTimes(1);
    });
  });

  describe('getTasks', () => {
    it('should call http.get with correct parameters and query params', () => {
      // Arrange
      const request = new TaskQueryRequest({
        id: 1,
        isCompleted: true,
        sortByTitle: true,
        pageSize: 20,
        pageNumber: 1
      });
      const expectedResponse: TaskCollectionResponse = {
        tasks: [],
        totalCount: 0
      };

      const params: { [key: string]: string } = {};

      params['id'] = request.id!.toString();
      params['isCompleted'] = request.isCompleted!.toString();
      params['sortByTitle'] = request.sortByTitle.toString();
      params['sortByDueDate'] = request.sortByDueDate.toString();
      params['pageSize'] = request.pageSize.toString();
      params['pageNumber'] = request.pageNumber.toString();

      const expectedParams = new HttpParams({ fromObject: params });
      httpClientSpy.get.and.returnValue(of(expectedResponse));

      // Act
      service.getTasks(request).subscribe(response => {
        expect(response).toEqual(expectedResponse);
      });

      // Assert
      expect(httpClientSpy.get).toHaveBeenCalledWith('/api/task', { params: jasmine.any(HttpParams) });
      expect(httpClientSpy.get).toHaveBeenCalledTimes(1);

      // Verify the params were created correctly
      const actualCall = httpClientSpy.get.calls.first();
      const actualParams = actualCall.args[1]?.params as HttpParams;
      expect(actualParams.toString()).toBe(expectedParams.toString());
    });
  });

  describe('getTaskById', () => {
    it('should call http.get with correct URL', () => {
      // Arrange
      const taskId = 123;
      const expectedResponse: Task = {
        id: taskId,
        title: 'Test Task',
        description: 'Test description',
        isCompleted: false,
        dueDate: '2025-08-08T10:00:00Z',
        createdById: 1
      };

      httpClientSpy.get.and.returnValue(of(expectedResponse));

      // Act
      service.getTaskById(taskId).subscribe(response => {
        expect(response).toEqual(expectedResponse);
      });

      // Assert
      expect(httpClientSpy.get).toHaveBeenCalledWith('/api/task/123');
      expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateTask', () => {
    it('should call http.put with correct URL and request body', () => {
      // Arrange
      const request: TaskUpdateRequest = {
        id: 456,
        title: 'Updated Task',
        description: 'Updated description',
        isCompleted: true,
        dueDate: '2025-08-09T10:00:00Z',
        assignedToId: 3
      };

      const expectedResponse: Task = {
        id: 456,
        title: 'Updated Task',
        description: 'Updated description',
        isCompleted: true,
        dueDate: '2025-08-09T10:00:00Z',
        createdById: 1,
        assignedToId: 3
      };

      httpClientSpy.put.and.returnValue(of(expectedResponse));

      // Act
      service.updateTask(request).subscribe(response => {
        expect(response).toEqual(expectedResponse);
      });

      // Assert
      expect(httpClientSpy.put).toHaveBeenCalledWith('/api/task/456', request);
      expect(httpClientSpy.put).toHaveBeenCalledTimes(1);
    });
  });

  describe('deleteTask', () => {
    it('should call http.delete with correct URL', () => {
      // Arrange
      const taskId = 789;
      httpClientSpy.delete.and.returnValue(of(undefined));

      // Act
      service.deleteTask(taskId).subscribe();

      // Assert
      expect(httpClientSpy.delete).toHaveBeenCalledWith('/api/task/789');
      expect(httpClientSpy.delete).toHaveBeenCalledTimes(1);
    });
  });
});
