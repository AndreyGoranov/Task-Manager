import { TransferDataService } from './../../services/data-transfer/transfer-data.service';
import { Router } from '@angular/router';
import { TaskManipulationService } from './../../services/tasks-crud-operations/task-manipulation.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Renderer2, Inject, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Task } from 'src/app/interfaces/task-interface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit,  AfterViewInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    dialogType: string,
    cancelText: string,
    confirmText: string,
    message: string,
    title: string
  }, private fb: FormBuilder,
    private taskService: TaskManipulationService,
    private router: Router,
    private transferData: TransferDataService,
    private renderer: Renderer2,
    private mdRef: MatDialogRef<CreateTaskComponent>) { }

  createTask: FormGroup;
  tasks: Observable<Task[]>
  @ViewChild('titleInputRef')
  titleInputRef: ElementRef;
  currentList: string;
  selectedTasks = {};

  ngOnInit(): void {
    this.transferData.currentList.subscribe(value => {
      this.currentList = value;
    });

    if (this.currentList !== "Main List" && this.currentList && this.currentList !== "Completed" && this.currentList !== "To Do") {
      this.tasks = this.taskService.getTasks().pipe(map(tasks => tasks.filter(task => task.list !== this.currentList)));
    }

    this.createTask = this.fb.group({
      title: ['', Validators.required],
      description: ['']
    });
  }

  ngAfterViewInit(): void {
    this.renderer.selectRootElement(this.titleInputRef.nativeElement).focus();
  }

  public cancel(): any {
    this.close(false);
  }
  public close(value): any {
    this.mdRef.close(value);
  }
  public confirm(): any {
    this.close(true);
  }
  @HostListener('keydown.esc')
  public onEsc(): any {
    this.close(false);
  }

  handleSelection(e, task: Task): any {
    console.log(task);
    if (e.checked) {
      this.selectedTasks[task.id] = task;
    } else {
      this.selectedTasks[task.id] = null;
    }
  }

  saveTask(): any {
    const task = this.createTask.value;
    if (!this.createTask.invalid) {
      console.log(task);
      task.list = this.currentList;
      this.taskService.createTask(task).subscribe();
    }
    if (this.currentList !== "Main List") {
      this.handleSelectedTasks();
    }
    this.confirm();
  }

  handleSelectedTasks(): any {
    for (let task in this.selectedTasks) {
      const taskBody: Task = this.selectedTasks[task];
        if (taskBody !== null) {
          taskBody.list = this.currentList;
          this.taskService.editTask(task, taskBody).subscribe();
        }
      }
  }

}
