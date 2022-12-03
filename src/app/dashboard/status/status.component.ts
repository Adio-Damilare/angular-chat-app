import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MaterialComponent } from 'src/app/module/material/material.component';

// @Component({
//   selector: 'app-status',
//   templateUrl: './status.component.html',
//   styleUrls: ['./status.component.css']
// })
// export class StatusComponent implements OnInit {

//   constructor(private matdialog:MatDialog) { }

//   ngOnInit(): void {
//   }
//    name="";
//    animal="";

//   openDialog(){
//     this.matdialog.open(MaterialComponent);
//     alert("work dfjd")
    
//   }

// }





export interface DialogData {
  animal: string;
  name: string;
}

/**
 * @title Dialog Overview
 */
@Component({
  selector: 'dialog-overview-example',
  templateUrl: './status.component.html',
})
export class StatusComponent  {
  animal: string="";
  name: string="";

  constructor(public dialog: MatDialog,public snackBar:MatSnackBar) {}
  openSnackbar(){
    this.snackBar.open("welcome to my page")

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}



@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './Modal.html',
})

export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './Snackbar.html',
})

export class SnackBar {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
