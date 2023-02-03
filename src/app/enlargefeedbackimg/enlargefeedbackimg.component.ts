import { Component, OnInit,Inject} from '@angular/core';
import {DatabaseService} from '../_services/DatabaseService';
import {DialogComponent} from '../dialog/dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';



@Component({
  selector: 'app-enlargefeedbackimg',
  templateUrl: './enlargefeedbackimg.component.html',
  styleUrls: ['./enlargefeedbackimg.component.scss']
})
export class EnlargefeedbackimgComponent implements OnInit {


  constructor(public dialog: DialogComponent,@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<EnlargefeedbackimgComponent>, public db:DatabaseService) {
    console.log(data.img_url);
    
   }

  ngOnInit() {


  }

}
