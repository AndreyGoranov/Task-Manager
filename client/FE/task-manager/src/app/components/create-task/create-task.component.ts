import { TransferDataService } from './../../services/data-transfer/transfer-data.service';
import { Router } from '@angular/router';
import { TaskManipulationService } from './../../services/tasks-crud-operations/task-manipulation.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Renderer2, Inject, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Task } from 'src/app/interfaces/task-interface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';



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
  @ViewChild('titleInputRef') titleInputRef: ElementRef;
  currentList: string;
  
  ngOnInit(): void {
    this.transferData.currentList.subscribe(value => {
      this.currentList = value;
    });

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

  saveTask(): any {
    const lists = this.transferData.lists;
    console.log(this.currentList, lists, 'lists pri create');
    const task: Task = this.createTask.value;
    if (!this.createTask.invalid) {
      console.log(task);
      task.list = this.setTaskList(lists);
      this.taskService.createTask(task).subscribe();
      this.close(true);
    }
  }

  setTaskList(lists: object): any {
    let listsKeys = Object.keys(lists);
    for (let i = 0; i < listsKeys.length; i++) {
      let currentKey = listsKeys[i];
      console.log(this.currentList);
      if (lists[currentKey] === this.currentList) {
        return currentKey
      }
    }
  }

}
