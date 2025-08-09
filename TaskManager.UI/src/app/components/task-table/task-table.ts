import { CommonModule } from '@angular/common';
import { Component, inject, signal, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { Task, TaskQueryRequest } from '../../models';
import { TaskManagementService } from '../../services/task-management-service';

@Component({
  selector: 'app-task-table',
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatCardModule, MatPaginatorModule, MatSortModule],
  templateUrl: './task-table.html',
  styleUrl: './task-table.scss'
})
export class TaskTable {
  public displayedColumns: string[] = ['select', 'id', 'title', 'description', 'isCompleted', 'dueDate', 'createdById', 'assignedToId', 'actions'];
  public dataSource = new MatTableDataSource<Task>();
  public totalEntries = signal<number>(0);
  private router = inject(Router);
  private selectedRows = signal<number[]>([]);
  private taskService = inject(TaskManagementService);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor() {
    this.paginator = new MatPaginator();
  }

  ngOnInit() {
    this.taskService.getTasks(new TaskQueryRequest()).subscribe({
      next: (response) => {
        this.dataSource.data = response.tasks;
        this.totalEntries.set(response.totalCount);
      },
      error: (error) => {
        console.error('Error fetching tasks:', error);
      }
    });

    this.paginator.page.subscribe((pageEvent) => {
      this.taskService.getTasks(new TaskQueryRequest({
        pageSize: pageEvent.pageSize,
        pageNumber: pageEvent.pageIndex
      })).subscribe({
        next: (response) => {
          this.dataSource.data = response.tasks;
        },
        error: (error) => {
          console.error('Error fetching tasks:', error);
        }
      });
    });
  }

  goToTaskDetails(taskId: number) {
    this.router.navigate(['/tasks', taskId]);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  toggleTaskCompletion(taskId: number) {
    throw new Error('Method not implemented.');
  }

  toggleRowSelection(taskId: number) {
    const selected = this.selectedRows();
    if(selected.includes(taskId)) {
      this.selectedRows.set(selected.filter(id => id !== taskId));
    } else {
      this.selectedRows.set([...selected, taskId]);
    }
  }

  isRowSelected(taskId: number): boolean {
    return this.selectedRows().includes(taskId);
  }

  removeData() {
    throw new Error('Method not implemented.');
  }
  addData() {
    this.router.navigate(['/tasks/create'])
  }

}
