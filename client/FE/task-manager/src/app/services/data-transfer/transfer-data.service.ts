import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalstorageService } from '../localstorage/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class TransferDataService {

  constructor(private localstorage: LocalstorageService) { }

  id: string;
  lists = this.localstorage.getData('lists') || {1: 'Default list'};
  currentList = new BehaviorSubject('Default list');
  editState = new BehaviorSubject([false, '']);
}
