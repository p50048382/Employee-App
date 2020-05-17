import { Injectable } from '@angular/core';
import {MatSnackBar,MatSnackBarConfig} from '@angular/material/snack-bar';
import { Action } from 'rxjs/internal/scheduler/Action';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(public snackbar: MatSnackBar) { }
  config: MatSnackBarConfig = {
    duration : 3000,
    horizontalPosition : "center",
    verticalPosition:"bottom"
  }


  success(msg){
    this.config["panelClass"] = ['notification','success']
    this.snackbar.open(msg,'',this.config);
  }

}
