import { ConfirmationDialogService } from './../../services/confirmation-dialog/confirmation-dialog.service';
import { TransferDataService } from './../../services/data-transfer/transfer-data.service';
import { TaskManipulationService } from './../../services/tasks-crud-operations/task-manipulation.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Task } from 'src/app/interfaces/task-interface';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit, OnDestroy {

  constructor(private taskService: TaskManipulationService,
              private transferData: TransferDataService,
              private router: Router,
              private dialogService: ConfirmationDialogService) { }

  @Input() listTitle = 'Main List';
  tasks: Observable<Task[]>;
  update = new BehaviorSubject(false);
  isChecked = false;

  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
    this.update.subscribe(update => update === true ? this.tasks = this.taskService.getTasks() : null);
  }

  editTask(id: string): any {
    this.transferData.id = id;
    this.router.navigateByUrl('edit-task');
  }

  deleteTask(id: string): any {
    const options = {
      title: 'Delete Task',
      message: 'Are you sure you want to delete this Task ?',
      cancelText: 'Cancel',
      confirmText: 'Confirm'
    };
    this.dialogService.open(options);
    this.dialogService.confirmed().subscribe(confirmed => {
      if (confirmed) {
        this.taskService.deleteTask(id).subscribe(() => {
          this.update.next(true);
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.update.unsubscribe();
  }
}
