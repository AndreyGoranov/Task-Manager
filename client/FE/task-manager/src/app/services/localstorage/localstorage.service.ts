import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  saveData(list: string[]): any {
    localStorage.setItem('lists', JSON.stringify(list));
  }

  getData(key: string): any {
    const data = JSON.parse(localStorage.getItem(key));
    return data;
  }
}
