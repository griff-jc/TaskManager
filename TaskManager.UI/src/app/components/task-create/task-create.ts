import { Component, inject, signal, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { TaskManagementService } from '../../services/task-management-service';
import { TaskCreateRequest } from '../../models';

@Component({
  selector: 'app-task-create',
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
    MatSnackBarModule
  ],
  templateUrl: './task-create.html',
  styleUrl: './task-create.scss'
})
export class TaskCreate {
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private taskService = inject(TaskManagementService);
  private snackBar = inject(MatSnackBar);
  private readonly currentUserId = 1;
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);
  taskForm: FormGroup;

  constructor() {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: [''],
      dueDate: [null],
      assignedToId: [''],
      isCompleted: [false]
    });
  }

  createTask() { 
    if (this.taskForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    this.isLoading.set(true);
    this.error.set(null);
    const formValue = this.taskForm.value;

    const taskCreateRequest = new TaskCreateRequest(
      formValue.title,
      this.currentUserId, // Default user id
      formValue.dueDate,
      formValue.isCompleted,
      formValue.description,
      formValue.assignedTo,
    );

    this.taskService.createTask(taskCreateRequest).subscribe({
      next: () => {
        this.snackBar.open('Task created successfully', 'Close', { duration: 3000 });
        this.isLoading.set(false);
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.error.set(err.message);
        this.snackBar.open('Failed to create task', 'Close', { duration: 3000 });
        this.isLoading.set(false);
      }
    });
  }

  cancel() {
    if (this.taskForm.dirty) {
      if (confirm('You have unsaved changes. Are you sure you want to cancel?')) {
        this.router.navigate(['/']);
      }
    } else {
      this.router.navigate(['/']);
    }
  }

  goBack() {
    this.cancel();
  }

  resetForm() {
    this.taskForm.reset();
    this.error.set(null);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.taskForm.patchValue({
      isCompleted: false,
      dueDate: tomorrow
    });
  }

  getErrorMessage(controlName: string): string {
    const control = this.taskForm.get(controlName);
    if (!control || !control.errors) return '';

    if (control.errors['required']) return `${controlName} is required`;
    if (control.errors['minlength']) {
      return `${controlName} must be at least ${control.errors['minlength'].requiredLength} characters`;
    }
    if (control.errors['maxlength']) {
      return `${controlName} must be no more than ${control.errors['maxlength'].requiredLength} characters`;
    }

    return 'Invalid input';
  }

  private markFormGroupTouched() {
    Object.keys(this.taskForm.controls).forEach(key => {
      this.taskForm.get(key)?.markAsTouched();
    });
  }
}
