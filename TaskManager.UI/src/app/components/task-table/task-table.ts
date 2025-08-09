import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-task-table',
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatCardModule, MatPaginatorModule, MatSortModule],
  templateUrl: './task-table.html',
  styleUrl: './task-table.scss'
})
export class TaskTable {

}
