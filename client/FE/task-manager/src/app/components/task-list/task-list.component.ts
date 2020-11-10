import { LocalstorageService } from './../../services/localstorage/localstorage.service';
import { filter, map } from 'rxjs/operators';
import { TransformPriorityPipe } from './../../pipes/transform-priority.pipe';
import { ConfirmationDialogService } from './../../services/confirmation-dialog/confirmation-dialog.service';
import { TransferDataService } from './../../services/data-transfer/transfer-data.service';
import { TaskManipulationService } from './../../services/tasks-crud-operations/task-manipulation.service';
import { Component, OnInit, Input, OnDestroy, HostListener } from '@angular/core';
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
              private dialogService: ConfirmationDialogService,
              private localstorage: LocalstorageService) { }

  listTitle = 'Default list';
  tasks: Observable<Task[]>;
  isListEmpty = false;
  update = new BehaviorSubject(false);
  checkedTasks = {};
  completedTasks = {};
  tasksPriority = {};
  editingTask = {};
  currentList = 'Default list';
  listSelectSubscription: Observable<any>;
  

  ngOnInit(): void {
    this.update.next(true);
    this.handleTasksListChange();
    this.handleListSelection();
    this.isTaskBeingEdited();
  }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    console.log(event);
    this.transferData.editState.next([false, '']);
}
  handlePrioritySelection(task: Task, priority: number): any {
    this.tasksPriority[task.id] = priority; 
    console.log(this.tasksPriority);
    task.priority = priority;
    this.taskService.editTask(String(task.id), task).subscribe();
  }

  handleListSelection(): any {
      this.transferData.currentList.subscribe(list => {
        console.log('list changed', list);
        if (list) {
          this.currentList = list;
          this.listTitle = this.currentList ;
          this.update.next(true);
        }
      });
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
    this.editingTask = {}
    this.editingTask[id] = true;
    // this.transferData.editingTaskId.next(id);
    this.transferData.editState.next([true, id]);
    console.log(this.editingTask[id]);
  }

  editList(): any {
    
  }

  deleteTask(id: string): any {
    const options = {
      dialogType: 'confirmation',
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
        this.tasksPriority[task.id] = task.priority;
        if (task.completed) {
          this.checkedTasks[task.id] = true;
          this.completedTasks[task.id] = task.completedAt;
        }
      });
    });
  }

  handleTasksListChange(): any {
    const taskLists = this.transferData.lists;
    this.update.subscribe(update => {
      if (update) {
        //this.transferData.newListInserted.subscribe(list => this.currentList = list);
        console.log('handleTasksListChange fired', taskLists);
        this.tasks = this.taskService.getTasks().pipe(map(tasks => tasks.filter(task =>  taskLists[task.list] === this.currentList)));
        this.handleTasksSubscription();
      }
    });
    
  }

  openCreateTaskModal(): any {
    const options = {
      dialogType: 'create-task',
      title: 'Create Task',
      message: 'Task is ready for saving ?',
      cancelText: 'Cancel',
      confirmText: 'Create'
    };
    this.dialogService.open(options);
    this.dialogService.confirmed().subscribe(confirmed => confirmed ? this.update.next(true) : null);
  }

  isTaskBeingEdited(): any {
    this.transferData.editState.subscribe(state => {
      console.log('is editing', state[0]);
      if(!state[0]) {
        this.editingTask = {};
      }
    });
  }
// Fix
  deleteList(): any {
    const options = {
      dialogType: 'confirmation',
      title: 'Delete List',
      message: 'Are you sure you want to delete this List ?',
      cancelText: 'Cancel',
      confirmText: 'Confirm'
    };
    this.dialogService.open(options);
    this.dialogService.confirmed().subscribe(confirmed => {
      if (confirmed) {
        console.log('deleting');
        let lists = this.transferData.lists;
        console.log(lists, 'lists');
        const listsKeys = Object.keys(lists);
        let removeListId: string;
        let newLists = {};
        console.log(this.currentList, listsKeys.length);
        if (this.currentList !== "Default list" || listsKeys.length > 1) {
          for (let i = 0; i < listsKeys.length; i++) {
            if (lists[listsKeys[i]] === this.currentList) {
              removeListId = listsKeys[i];
              break;
            }
          }
          listsKeys.splice(listsKeys.indexOf(removeListId), 1);
          console.log(removeListId, listsKeys);
          listsKeys.forEach(key => {
            newLists[key] = lists[key]
          });
          console.log(newLists);
          if (JSON.stringify(newLists) === JSON.stringify({})) {
            newLists = { 1: 'Default list' };
          }
          this.localstorage.saveData(newLists);
          this.transferData.lists = newLists;
          console.log(this.transferData.lists, 'lists ot service');
        }

        this.tasks.subscribe(tasks => {
          tasks.forEach(task => {
            this.taskService.deleteTask(String(task.id)).subscribe(res => {
              console.log(res.title + ' deleted');
            });
          });
          this.transferData.currentList.next(newLists[listsKeys[0]] || 'Default list');
          this.update.next(true);
        });
      }
    });

  }

  handleListSwitch(direction: string): any {
    const lists = this.transferData.lists;
    const listsKeys = Object.keys(lists);
    if (listsKeys.length < 2) {
      return;
    }
    let currentKey: number;
    listsKeys.forEach(key => {
      if (lists[key] === this.currentList) {
        currentKey = Number(key);
      }
    })
    // Indexes start from 1 not 0 
    if (direction === 'next') {
      if (currentKey ===  listsKeys.length) {
        this.transferData.currentList.next(lists[1]);
      } else {
        console.log(lists[currentKey + 1]);
        this.transferData.currentList.next(lists[currentKey + 1]);
      }
    } else if (direction === 'back') {
      if (currentKey === 1) {
        this.transferData.currentList.next(lists[listsKeys.length]);
      } else {
        this.transferData.currentList.next(lists[currentKey - 1]);
      } 
    } 
  }

  sortList(byWhat: string): any {
    const lists = this.transferData.lists;
    if (byWhat === 'completed') {
      this.tasks = this.taskService.getTasks().pipe(map(tasks => tasks.filter(task => task.completed === true && lists[task.list] === this.currentList)));
      console.log(this.tasks);
    } else if (byWhat === 'to do') {
      this.tasks = this.taskService.getTasks().pipe(map(tasks => tasks.filter(task => task.completed === false && lists[task.list] === this.currentList)) );
    } else if (byWhat === 'priority') {
      this.tasks = this.taskService.getTasks().pipe(map(tasks => tasks.filter(task => lists[task.list] === this.currentList).sort((a, b) => a.priority - b.priority)));
    }
  }
  

  ngOnDestroy(): void {
    // this.update.unsubscribe();
  }
}