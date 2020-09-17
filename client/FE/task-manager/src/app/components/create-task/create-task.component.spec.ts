import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateTaskComponent } from './create-task.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';

describe('CreateTaskComponent', () => {
  let component: CreateTaskComponent;
  let fixture: ComponentFixture<CreateTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        RouterTestingModule
      ],
      declarations: [ CreateTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have focus on title input field', () => {
    const inputEl: HTMLInputElement = fixture.nativeElement.querySelector(':focus');
    expect(inputEl).toBeTruthy();
  });

  it('form should be invalid if no title is entered', () => {
    expect(component.createTask.get('title').invalid).toBeTruthy();
  });

  it('submit button should be disabled if form invalid', () => {
    const submitButton: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(submitButton.textContent).toBe('Submit');
    expect(submitButton.disabled).toBeTruthy();
  });

  it('should redirect to landing page if cancel button clicked', () => {
    const cancelButton: HTMLButtonElement = fixture.nativeElement.querySelector('#cancelButton');
    expect(cancelButton.textContent).toBe('Cancel');
    cancelButton.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(location.pathname).toBe('http://localhost:4200/');
    });
  });
});
