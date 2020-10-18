import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalstorageService } from '../localstorage/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class TransferDataService {

  constructor(private localstorage: LocalstorageService) { }

  id: string;
  lists = this.localstorage.getData('lists') || ['Main List', 'Completed', 'To Do'];
  currentList = new BehaviorSubject('');
  newListInserted = new BehaviorSubject('');
  editState = new BehaviorSubject([false, '']);

}
