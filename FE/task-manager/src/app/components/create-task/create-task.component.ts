import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  createTask: FormGroup;

  ngOnInit(): void {
    this.createTask = this.fb.group({
      title: ['', Validators.required],
      description: ['']
    });
  }

  saveTask(): void {
    console.log(this.createTask);
    // TODO: save task with the use of service.
  }
}
