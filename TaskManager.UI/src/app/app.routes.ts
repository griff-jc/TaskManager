import { Routes } from '@angular/router';
import { TaskTable } from './components/task-table/task-table';
import { taskDetailResolver } from './resolvers/taskDetailResolver';
import { TaskViewEdit } from './components/task-view-edit/task-view-edit';
import { TaskCreate } from './components/task-create/task-create';

export const routes: Routes = [
    { path: '', component: TaskTable },
    { path: 'tasks/:id', resolve: { task: taskDetailResolver }, component: TaskViewEdit },
    { path: 'tasks/create', component: TaskCreate }
];
