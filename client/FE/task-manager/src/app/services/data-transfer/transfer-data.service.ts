import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransferDataService {

  constructor() { }

  id: string;
  currentList = new BehaviorSubject('');
}
