import { Router } from '@angular/router';
import { LocalstorageService } from './../../../services/localstorage/localstorage.service';
import { TransferDataService } from './../../../services/data-transfer/transfer-data.service';
import { Observable } from 'rxjs';
import { TaskManipulationService } from './../../../services/tasks-crud-operations/task-manipulation.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Renderer2, HostListener } from '@angular/core';
import { Task } from 'src/app/interfaces/task-interface';

@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.css']
})
export class CreateListComponent implements OnInit, AfterViewInit {

  constructor(private taskService: TaskManipulationService,
              private dataTransfer: TransferDataService,
              private localstorage: LocalstorageService,
              private router: Router,
              private renderer: Renderer2) { }

  @ViewChild('titleInputRef') titleInputRef: ElementRef;
  tasks: Observable<Task[]>;
  listTitle: string;
  selectedTasks =  {};
    
  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
  }

  ngAfterViewInit(): void {
    this.renderer.selectRootElement(this.titleInputRef.nativeElement).focus();
  }

  @HostListener('keydown.enter')
  public onEnter(): any {
    this.saveList();
  }

  handleSelection(e, task: Task): any {
    console.log(task);
    if (e.checked) {
      this.selectedTasks[task.id] = task;
    } else {
      this.selectedTasks[task.id] = null;
    }
  }

  generateListId(obj): any {
    let keys = Object.keys(obj);
    let freeId = keys.length + 1;
    return freeId;
  }


  saveList(): any {
    if (this.listTitle) {
      let listId = this.generateListId(this.dataTransfer.lists);
      this.dataTransfer.lists[listId] = this.listTitle;
      this.localstorage.saveData(this.dataTransfer.lists);
      this.writeListToTask(listId);
      this.dataTransfer.currentList.next(this.listTitle);
      this.router.navigateByUrl('');
    }
  }

  writeListToTask(listId: string): any {
    for(let id in this.selectedTasks) {
      if (this.selectedTasks.hasOwnProperty(id) && typeof(this.selectedTasks[id] !== 'function')) {
        const body = this.selectedTasks[id];
        if (body !== null) {
          body.list = listId;
          this.taskService.editTask(id, body).subscribe();
        } 
      }
    }
  }

}
