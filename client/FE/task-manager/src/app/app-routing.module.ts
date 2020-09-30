import { CreateListComponent } from './components/lists/create-list/create-list.component';
import { EditTaskComponent } from './components/edit-task/edit-task.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: '', component: TaskListComponent},
  {path: 'create-task', component: CreateTaskComponent},
  {path: 'edit-task', component: EditTaskComponent},
  {path: 'create-list', component: CreateListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
