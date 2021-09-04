import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  public error(err: any): void {
    let message = '[ERROR] ';

    if (typeof err === 'string') {
      message += err;
    } else if (err instanceof HttpErrorResponse) {
      message += err.error.message;
    } else if (!!err.message) {
      message += err.message;
    } else {
      message += JSON.stringify(err);
    }

    this.snackBar.open(message, 'OK', {
      duration: 3000,
      verticalPosition: 'bottom',
    });
  }
}
