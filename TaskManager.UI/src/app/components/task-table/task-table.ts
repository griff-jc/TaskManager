import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Task } from '../../models/Task';

@Component({
  selector: 'app-task-table',
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatCardModule, MatPaginatorModule, MatSortModule],
  templateUrl: './task-table.html',
  styleUrl: './task-table.scss'
})
export class TaskTable {
  public displayedColumns: string[] = ['select', 'id', 'title', 'description', 'isCompleted', 'dueDate', 'createdById', 'assignedToId', 'actions'];
  public dataSource = new MatTableDataSource<Task>();
  
  goToTaskDetails(arg0: any) {
    throw new Error('Method not implemented.');
  }
  formatDate(arg0: any) {
    throw new Error('Method not implemented.');
  }
  toggleTaskCompletion(arg0: any) {
    throw new Error('Method not implemented.');
  }
  toggleRowSelection(arg0: any) {
    throw new Error('Method not implemented.');
  }
  isRowSelected(arg0: any) {
    throw new Error('Method not implemented.');
  }
  removeData() {
    throw new Error('Method not implemented.');
  }
  addData() {
    throw new Error('Method not implemented.');
  }

}
