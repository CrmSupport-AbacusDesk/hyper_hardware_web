import { Component,Inject, OnInit } from '@angular/core';
import {DatabaseService} from '../_services/DatabaseService';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import {DialogComponent} from '../dialog/dialog.component';


@Component({
  selector: 'app-password-modal',
  templateUrl: './password-modal.component.html',
  styleUrls: ['./password-modal.component.scss']
})
export class PasswordModalComponent implements OnInit {
 
  constructor(public db: DatabaseService, @Inject(MAT_DIALOG_DATA) public lead_data: any,private route: ActivatedRoute,public dialog: DialogComponent, public dialogRef: MatDialogRef<PasswordModalComponent>) { }

  ngOnInit() {
    console.log( JSON.parse(localStorage.getItem('users')));
    this.users=JSON.parse(localStorage.getItem('users'));
    this.previous_password=this.users.visible_password;
    console.log(this.previous_password);
    this.id=this.users.id;
    console.log(this.id);
    
  }
  data:any={};
  users:any={};
  previous_password:any;
  id:any;
  Save_password()
  {
    console.log(this.users);
    
    // this.users.push({'final_password':this.data.confirm_password});

    this.db.post_rqst({'final_password':this.data.confirm_password,'id':this.users.id}, 'master/change_password')
    .subscribe( d => {

      if(d.msg=='SUCCESS')
      {
        this.dialog.success('Password Changed Successfully!');
        this.dialogRef.close();
      }
      else
      {
        this.dialog.success('Error! Password not Changed');
      }
    })
  }
}
