import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskViewEdit } from './task-view-edit';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Task } from '../../models';

describe('TaskViewEdit', () => {
  let component: TaskViewEdit;
  let fixture: ComponentFixture<TaskViewEdit>;
  const expectedResponse: Task = {
    id: 1,
    title: 'Test Task',
    description: 'Test description',
    isCompleted: false,
    dueDate: '2025-08-08T10:00:00Z',
    createdById: 1,
    assignedToId: 2
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskViewEdit],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: ActivatedRoute, useValue: {
            data: of({
              task: expectedResponse
            })
          }
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TaskViewEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
