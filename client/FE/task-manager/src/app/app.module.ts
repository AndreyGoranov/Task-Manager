import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskComponent } from './components/task/task.component';
import { EditTaskComponent } from './components/edit-task/edit-task.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TaskListNavigationComponent } from './components/task-list-navigation/task-list-navigation.component';
import { CreateListComponent } from './components/lists/create-list/create-list.component';
import { MatMenuModule } from '@angular/material/menu';
import { TransformPriorityPipe } from './pipes/transform-priority.pipe';
import { HandleColorDirective } from './directives/handle-color.directive';
import { DatePipe } from '@angular/common';
import { InputFieldSizeDirective } from './directives/input-field-size.directive';

@NgModule({
  declarations: [
    AppComponent,
    CreateTaskComponent,
    TaskListComponent,
    TaskComponent,
    EditTaskComponent,
    ConfirmationDialogComponent,
    TaskListNavigationComponent,
    CreateListComponent,
    TransformPriorityPipe,
    HandleColorDirective,
    InputFieldSizeDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatCheckboxModule,
    MatMenuModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
