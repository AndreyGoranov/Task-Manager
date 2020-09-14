import { TaskManipulationService } from './../../services/tasks-crud-operations/task-manipulation.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Task } from 'src/app/interfaces/task-interface';


@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  constructor(private fb: FormBuilder, private taskService: TaskManipulationService) { }

  createTask: FormGroup;
  tasks: Task[];

  ngOnInit(): void {
    this.createTask = this.fb.group({
      title: ['', Validators.required],
      description: ['']
    });
  }

  saveTask(): any {
    const task = this.createTask.value;
    this.taskService.createTask(task).subscribe();
  }

}
