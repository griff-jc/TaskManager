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
import { Task, TaskUpdateRequest } from '../../models';
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
      assignedToId: [null],
      isCompleted: [false]
    });
  }

  cancelEdit() {
    const currentTask = this.task();
    if (currentTask) {
      this.populateForm(currentTask);
    }
    this.currentMode.set(ViewMode.VIEW);
  }

  saveChanges() {
    if (this.taskForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    const currentTask = this.task();
    if (!currentTask) {
      this.error.set('No task data available');
      return;
    }

    this.isLoading.set(true);
    const updateTaskRequest = new TaskUpdateRequest(
      currentTask.id,
      this.taskForm.value.title,
      this.taskForm.value.dueDate,
      this.taskForm.value.isCompleted,
      this.taskForm.value.description,
      this.taskForm.value.assignedToId,
    );
    this.taskService.updateTask(updateTaskRequest).subscribe({
      next: () => {
        this.snackBar.open('Task updated successfully', 'Close', { duration: 3000 });
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set(err.message);
        this.isLoading.set(false);
      }
    });
  }

  getErrorMessage(controlName: string) {
    const control = this.taskForm.get(controlName);
    if (!control || !control.errors) return '';

    if (control.errors['required']) return `${controlName} is required`;
    if (control.errors['minlength']) return `${controlName} must be at least ${control.errors['minlength'].requiredLength} characters`;

    return 'Invalid input';
  }

  formatDate(dateString?: string) {
    if (!dateString) return '';

    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  enableEditMode() {
    this.currentMode.set(ViewMode.EDIT);
    this.populateForm(this.task());
  }

  goBack() {
    this.router.navigate(['/']);
  }

  private populateForm(currentTask: Task) {
    this.taskForm.patchValue({
      taskId: currentTask.id,
      title: currentTask.title,
      description: currentTask.description,
      isCompleted: currentTask.isCompleted,
      dueDate: currentTask.dueDate ? new Date(currentTask.dueDate) : null,
      assignedToId: currentTask.assignedToId
    });
  }

  private markFormGroupTouched() {
    Object.keys(this.taskForm.controls).forEach(key => {
      this.taskForm.get(key)?.markAsTouched();
    });
  }
}
