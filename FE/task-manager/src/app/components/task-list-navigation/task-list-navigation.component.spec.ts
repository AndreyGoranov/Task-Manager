import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListNavigationComponent } from './task-list-navigation.component';

describe('TaskListNavigationComponent', () => {
  let component: TaskListNavigationComponent;
  let fixture: ComponentFixture<TaskListNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskListNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
