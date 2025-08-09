import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskTable } from './task-table';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('TaskTable', () => {
  let component: TaskTable;
  let fixture: ComponentFixture<TaskTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskTable],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
