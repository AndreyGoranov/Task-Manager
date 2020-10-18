import { DatePipe } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { TransferDataService } from 'src/app/services/data-transfer/transfer-data.service';
import { TaskManipulationService } from 'src/app/services/tasks-crud-operations/task-manipulation.service';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  constructor(private fb: FormBuilder, private dataTransfer: TransferDataService, private taskService: TaskManipulationService) { }
  @Input() title: string;
  @Input() description: string;
  @Input() startedAt: number;
  @Input() endDate: number;
  @Input() taskId: number;
  @Input() taskContainer: HTMLDivElement;
  @Input() completed: boolean;

  editForm: FormGroup;
  edit = false;

  ngOnInit(): void {
    this.handleEditStatus();
  }

  handleEditStatus(): any {
      this.dataTransfer.editState.subscribe(state => {
        if (this.taskId === Number(state[1]) && state[0]) {
          this.edit = true;
          this.editForm = this.fb.group({
            title: [this.title],
            description: [this.description],
            startedAt: [new DatePipe(navigator.language).transform(this.startedAt, 'y-MM-dd')]
          });
        } else {
          this.edit = false;
        }
      });
  }

  saveTaskChanges(): any {
    if (this.title !== this.editForm.get('title').value || this.description !== this.editForm.get('description').value) {
      this.title = this.editForm.get('title').value;
      this.description = this.editForm.get('description').value;
      this.startedAt = this.editForm.get('startedAt').value;
      this.edit = false;
      this.dataTransfer.editState.next([false, '']);
      this.taskService.editTask(String(this.taskId), this.editForm.value).subscribe();
    }
  }

  cancelEdit(): any {
    this.edit = false;
    this.dataTransfer.editState.next([false, '']);
  }



}
