import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskManagementService } from '../../services/task-management-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Task } from '../../models';
import { toSignal } from '@angular/core/rxjs-interop';

enum ViewMode {
  VIEW = 'view',
  EDIT = 'edit'
}

@Component({
  selector: 'app-task-view-edit',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatChipsModule
  ],
  templateUrl: './task-view-edit.html',
  styleUrl: './task-view-edit.scss'
})

export class TaskViewEdit {
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private taskService = inject(TaskManagementService);
  private snackBar = inject(MatSnackBar);
  private route = inject(ActivatedRoute);
  private readonly currentUserId = 1;
  private taskData: any = toSignal(this.route.data);
  public currentMode = signal<ViewMode>(ViewMode.VIEW);
  public isLoading = signal<boolean>(false);
  public error = signal<string | null>(null);
  public taskForm: FormGroup;
  public isEditMode = computed(() => this.currentMode() === ViewMode.EDIT);
  public isViewMode = computed(() => this.currentMode() === ViewMode.VIEW);
  public task = computed(() => this.taskData().task as Task)

  constructor() {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: [''],
      dueDate: [null],
      assignedTo: [''],
      isCompleted: [false]
    });
  }

  cancelEdit() {
    throw new Error('Method not implemented.');
  }
  saveChanges() {
    throw new Error('Method not implemented.');
  }
  getErrorMessage(arg0: string) {
    throw new Error('Method not implemented.');
  }
  formatDate(arg0: any) {
    throw new Error('Method not implemented.');
  }

  enableEditMode() {
    throw new Error('Method not implemented.');
  }

  goBack() {
    throw new Error('Method not implemented.');
  }

}
