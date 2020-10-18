import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';
import { CreateTaskComponent } from 'src/app/components/create-task/create-task.component';

@Injectable({
  providedIn: 'root'
})

export class ConfirmationDialogService {

  constructor(private dialog: MatDialog) { }

  dialogRef: MatDialogRef<any>;

  public open(options): any {
    this.dialogRef = this.dialog.open(this.handleModalDialogType(options.dialogType), {
         data: {
           title: options.title,
           message: options.message,
           cancelText: options.cancelText,
           confirmText: options.confirmText
         },
    });
  }
  public confirmed(): Observable<any> {
    return this.dialogRef.afterClosed().pipe(take(1), map(res => {
        return res;
      }
    ));
  }

  handleModalDialogType(type: string): any {
    if (type === 'confirmation') {
      return ConfirmationDialogComponent;
    } else if (type === 'create-task') {
      return CreateTaskComponent;
    }
  }
}
