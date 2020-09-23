import { ConfirmationDialogService } from './../../services/confirmation-dialog/confirmation-dialog.service';
import { TransferDataService } from './../../services/data-transfer/transfer-data.service';
import { TaskManipulationService } from './../../services/tasks-crud-operations/task-manipulation.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Task } from 'src/app/interfaces/task-interface';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { trigger, transition, useAnimation } from '@angular/animations';
import { slideIn } from 'src/app/utilities/animations/animations';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  animations: [
    trigger('todoList', [
      transition(':enter', [
        useAnimation(slideIn),
      ])
    ])
  ]
})

export class TaskListComponent implements OnInit, OnDestroy {

  constructor(private taskService: TaskManipulationService,
              private transferData: TransferDataService,
              private router: Router,
              private dialogService: ConfirmationDialogService) { }

  listTitle = 'Main List';
  tasks: Observable<Task[]>;
  isListEmpty = false;
  update = new BehaviorSubject(false);
  checkedTasks = {};
  completedTasks = {};
  tasksPriority = {};
  currentList: string;

  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
    this.handleTasksSubscription();
    this.handleTasksListUpdate();
  }

  handleTaskStatus(task: Task): any {
    const taskId = String(task.id);
    if (this.checkedTasks[taskId]) {
      task.completed = true;
      const completionDate = new Date().getTime();
      task.completedAt = completionDate;
      this.completedTasks[taskId] = completionDate;
      this.taskService.editTask(taskId, task).subscribe();
    } else {
      task.completed = false;
      task.completedAt = null;
      this.completedTasks[taskId] = null;
      this.taskService.editTask(taskId, task).subscribe();
    }
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

  handleTasksSubscription(): any {
    this.tasks.subscribe(tasks => {
      tasks.length === 0 ? this.isListEmpty = true : this.isListEmpty = false;
      tasks.forEach(task => {
        if (task.completed) {
          this.checkedTasks[task.id] = true;
          this.completedTasks[task.id] = task.completedAt;
        }
      });
    });
  }


  handleTasksListUpdate(): any {
    this.update.subscribe(update => {
      if (update) {
        this.tasks = this.taskService.getTasks();
        this.handleTasksSubscription();
      }
    });
  }

  ngOnDestroy(): void {
    this.update.unsubscribe();
  }
}
