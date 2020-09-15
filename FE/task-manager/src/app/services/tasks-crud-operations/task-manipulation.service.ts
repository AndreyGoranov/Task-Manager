import { Task } from './../../interfaces/task-interface';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskManipulationService {

  constructor(private http: HttpClient) { }

  readonly ROOT_URL = 'http://localhost:1337/tasks';

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.ROOT_URL).pipe<any>(
      catchError(this.handleError)
    );
  }

  getSingleTask(id: string): Observable<Task[]> {
    const params = new HttpParams().set('id', id);
    return this.http.get<Task[]>(this.ROOT_URL, {params}).pipe<any>(
      catchError(this.handleError)
    );
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.ROOT_URL, task).pipe<any>(
      catchError(this.handleError)
    );
  }

  editTask(id: string, value: Task): any {
    return this.http.patch(this.ROOT_URL + `/${id}`, value).pipe<any>(
      catchError(this.handleError)
    );
  }

  deleteTask(id: string): Observable<Task> {
    const params = new HttpParams().set('id', id);
    return this.http.delete<Task>(this.ROOT_URL, {params}).pipe<any>(
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse): any {
    return Observable.throw(error.message || 'server error.');
  }

}
