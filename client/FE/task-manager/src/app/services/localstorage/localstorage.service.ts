import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  saveData(list: any): any {
    localStorage.setItem('lists', JSON.stringify(list));
  }

  getData(key: string): any {
    let data;
    try {
      data = JSON.parse(localStorage.getItem(key));
    }
    catch(err) {
      return false;
    }

    return data;
  }
}
