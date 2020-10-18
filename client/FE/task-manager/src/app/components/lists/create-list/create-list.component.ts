import { Router } from '@angular/router';
import { LocalstorageService } from './../../../services/localstorage/localstorage.service';
import { TransferDataService } from './../../../services/data-transfer/transfer-data.service';
import { Observable } from 'rxjs';
import { TaskManipulationService } from './../../../services/tasks-crud-operations/task-manipulation.service';
import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/interfaces/task-interface';

@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.css']
})
export class CreateListComponent implements OnInit {

  constructor(private taskService: TaskManipulationService,
              private dataTransfer: TransferDataService,
              private localstorage: LocalstorageService,
              private router: Router) { }

  tasks: Observable<Task[]>;
  listTitle: string;
  selectedTasks =  {};
    
  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
  }

  handleSelection(e, task: Task): any {
    console.log(task);
    if (e.checked) {
      this.selectedTasks[task.id] = task;
    } else {
      this.selectedTasks[task.id] = null;
    }
  }

  saveList(): any {
    this.dataTransfer.lists.push(this.listTitle);
    this.localstorage.saveData(this.dataTransfer.lists);
    this.writeListToTask();
    this.dataTransfer.newListInserted.next(this.listTitle);
    this.dataTransfer.currentList.next(this.listTitle);
    this.router.navigateByUrl('');
  }

  writeListToTask(): any {
    for(let id in this.selectedTasks) {
      const body = this.selectedTasks[id];
      if (body !== null) {
        body.list = this.listTitle;
        this.taskService.editTask(id, body).subscribe();
      }  
    }
  }

}
