import { Router } from '@angular/router';
import { TransferDataService } from './../../services/data-transfer/transfer-data.service';
import { TaskManipulationService } from './../../services/tasks-crud-operations/task-manipulation.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private taskService: TaskManipulationService,
              private dataTransfer: TransferDataService,
              private router: Router) { }

  editTask: FormGroup;
  editTaskId: string;

  ngOnInit(): void {
    this.editTaskId = this.dataTransfer.id;
    this.taskService.getSingleTask(this.editTaskId).subscribe(task => {
      this.editTask = this.fb.group({
        title: [task[0].title, [Validators.required, Validators.minLength(1)]],
        description: [task[0].description]
      });
    });
  }

  submitEditedTask(): any {
    const editBody = this.editTask.value;
    if (this.editTask.dirty) {
      this.taskService.editTask(this.editTaskId, editBody).subscribe();
    }
    this.router.navigateByUrl('');
  }

}
