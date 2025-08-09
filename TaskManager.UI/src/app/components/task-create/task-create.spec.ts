import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCreate } from './task-create';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('TaskCreate', () => {
  let component: TaskCreate;
  let fixture: ComponentFixture<TaskCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskCreate],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskCreate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
