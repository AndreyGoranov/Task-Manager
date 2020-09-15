import { Router } from '@angular/router';
import { TaskManipulationService } from './../../services/tasks-crud-operations/task-manipulation.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Task } from 'src/app/interfaces/task-interface';


@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit,  AfterViewInit {

  constructor(private fb: FormBuilder,
              private taskService: TaskManipulationService,
              private router: Router,
              private renderer: Renderer2) { }

  createTask: FormGroup;
  tasks: Task[];
  @ViewChild('titleInputRef')
  titleInputRef: ElementRef;

  ngOnInit(): void {
    this.createTask = this.fb.group({
      title: ['', Validators.required],
      description: ['']
    });
  }

  ngAfterViewInit(): void {
    this.renderer.selectRootElement(this.titleInputRef.nativeElement).focus();
  }

  saveTask(): any {
    const task = this.createTask.value;
    this.taskService.createTask(task).subscribe();
    this.router.navigateByUrl('');
  }

}
