import { Router } from '@angular/router';
import { LocalstorageService } from './../../services/localstorage/localstorage.service';
import { TransferDataService } from './../../services/data-transfer/transfer-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-list-navigation',
  templateUrl: './task-list-navigation.component.html',
  styleUrls: ['./task-list-navigation.component.css']
})
export class TaskListNavigationComponent implements OnInit {

  constructor(private dataTransfer: TransferDataService, private localstorage: LocalstorageService, private router: Router) { }

  lists: string[];
 
  ngOnInit(): void {
    this.lists = this.localstorage.getData('lists') || this.dataTransfer.lists;
    this.dataTransfer.newListInserted.subscribe(() => {
      this.lists = this.localstorage.getData('lists');
      
    })
  }

  handleListSelection(list: string): any {
    this.dataTransfer.currentList.next(list);
    this.router.navigateByUrl('');
  }

}
