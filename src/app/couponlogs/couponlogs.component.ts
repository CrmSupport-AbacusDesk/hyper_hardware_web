import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DatabaseService } from '../_services/DatabaseService';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material';

import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-couponlogs',
  templateUrl: './couponlogs.component.html',
  styleUrls: ['./couponlogs.component.scss']
})
export class CouponlogsComponent implements OnInit {
  coupon_id:any;
  coupon_log:any;
  constructor(private snacker: MatSnackBar, public dialog:DialogComponent, private dialogRef: MatDialogRef<CouponlogsComponent>,public db:DatabaseService,@Inject(MAT_DIALOG_DATA) public params: any) {
         this.coupon_id = this.params.id.id
      console.log('params data=====>',this.params.id.id);
      
  }

  ngOnInit() {
    this.couponLogs()
  }

  couponLogs(){
    this.db.post_rqst( {"id":this.coupon_id},'master/couponLogs')
    .subscribe( d => {
                    
        console.log("kargir",d);
        this.coupon_log = d['log'][0]
        console.log("  this.coupon_log ===>",  this.coupon_log);
        
      
    });
  }

}
