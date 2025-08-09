import { inject } from '@angular/core';
import type { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Task } from '../models';
import { TaskManagementService } from '../services/task-management-service';

export const taskDetailResolver: ResolveFn<Task> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const taskService = inject(TaskManagementService);
  const taskId = route.paramMap.get('id');

  if (taskId) {
    return firstValueFrom(taskService.getTaskById(+taskId));
  } else {
    return Promise.reject('Task ID not provided');
  }
}