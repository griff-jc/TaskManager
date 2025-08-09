import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskViewEdit } from './task-view-edit';

describe('TaskViewEdit', () => {
  let component: TaskViewEdit;
  let fixture: ComponentFixture<TaskViewEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskViewEdit]
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
