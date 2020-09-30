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

  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
  }

  handleSelection(e, task): any {
    if (e.checked) {
      task.list = this.listTitle;
      this.taskService.editTask(task.id, task).subscribe();
    } else {
      task.list = 'Main List';
      this.taskService.editTask(task.id, task).subscribe();
    }
  }

  saveList(): any {
    const lists = this.localstorage.getData('lists');
    lists.push(this.listTitle);
    this.localstorage.saveData(lists);
    this.dataTransfer.currentList.next(this.listTitle);
    this.router.navigateByUrl('');
  }

}
