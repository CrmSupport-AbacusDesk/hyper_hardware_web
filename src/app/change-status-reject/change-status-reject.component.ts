import { Component, OnInit,Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DatabaseService} from '../_services/DatabaseService';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogComponent} from '../dialog/dialog.component';

@Component({
  selector: 'app-change-status-reject',
  templateUrl: './change-status-reject.component.html',
  styleUrls: ['./change-status-reject.component.scss']
})
export class ChangeStatusRejectComponent implements OnInit {
  data: any = {};
  loading_list:any = false;
  mode:any;
  savingData = false;
  gift_id;
  offer:any = {};
  user_id:any;
  karigars: any;
  last_page: any;
  current_page: any;
  total_karigars: any;
  karigar_all: any;
  karigar_pending: any;
  karigar_reject: any;
  karigar_suspect: any;
  karigar_verified: any;
  select_all: any;
  filter: any;
  filtering: boolean;
  assign_arr: any[];

  constructor(public db: DatabaseService, private route: ActivatedRoute, private router: Router,  public dialog: DialogComponent,
      @Inject(MAT_DIALOG_DATA) public model_data: any, public dialogRef: MatDialogRef<ChangeStatusRejectComponent>) {
          console.log(model_data);
          this.user_id = db.datauser.id;
          this.data.id = model_data.id; 
          this.data.status = model_data.status; 
          
      }
      ngOnInit() {
          this.route.params.subscribe(params => {
              // this.gift_id = params['gift_id'];
              this.data.status = this.data.status; 
              console.log( this.data );
              
          });
      }
      
      // addoffer(form:any)
      // {
      //     this.savingData = true;
      //     this.db.post_rqst( { 'status' : this.offer ,'id': this.data.id, "login_id":this.user_id  }, 'offer/redeemStatus')
      //     .subscribe( d => {
      //         this.savingData = false;
      //         this.dialog.success( 'Status successfully Change');
      //         this.dialogRef.close(true);
      //         console.log( d );
      //     });
      // }
      
    //   onNoClick(): void{
    //       this.dialogRef.close();
    //   }




karigarsSatus(i)
  {

    this.savingData = true;
      this.db.post_rqst({ 'reason' : this.data.reason,'status' : this.data.status, 'id' : this.data.id, "login_id":this.user_id  }, 'karigar/karigarStatus')
      .subscribe(d => {
        this.savingData = false;
          console.log(d);
          this.router.navigate(['karigar-list/val.id']);
          this.dialog.success('Status Sucessfully Update')
         
          this.getKarigarList();

         
         
      });
      this.dialogRef.close(true);
  }


  onNoClick(): void{
    this.dialogRef.close();
}


//   getKarigarList(arg0: string) {
//       throw new Error('Method not implemented.');
//   }










  getKarigarList() 
  {
      console.log(this.filter);
      this.loading_list = true;
      this.filter.mode = 0;
      
     
      
      
      this.db.post_rqst(  {'filter': this.filter , 'login':this.db.datauser,user_type:"1"}, 'karigar/karigarList?page=' + this.current_page)
      .subscribe( d => {
          this.loading_list = false;
          console.log(d);            
          this.current_page = d.karigars.current_page;
          this.last_page = d.karigars.last_page;
          this.total_karigars =d.karigars.total;
          this.karigars = d.karigars.data;            
          this.karigar_all = d.karigar_all;
         
      });
  }






  }
  