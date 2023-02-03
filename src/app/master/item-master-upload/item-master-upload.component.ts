import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { DatabaseService } from 'src/app/_services/DatabaseService';

@Component({
  selector: 'app-item-master-upload',
  templateUrl: './item-master-upload.component.html'
})
export class ItemMasterUploadComponent implements OnInit {
  filter:any={};
  offer_list:any=[];
  loading:boolean = false;
  formData = new FormData();
  exist_coupon:any=[];
  offer_data:any={};
  coupon_ex:any = '';
  file:any = {};
  constructor(public db: DatabaseService,public dialog: DialogComponent, public alrt:MatDialog,public dialogRef: MatDialogRef<ItemMasterUploadComponent>) { }
  ngOnInit()
  {  
      
  }

  onUploadChange1(evt: any,f) 
  {
      console.log(f);
      
      this.file = evt.target.files[0];
      f.resetForm();
      console.log(this.file);
      
      
  }
  
  uploadCoupon()
  {
      console.log(this.offer_data.offer_id);
      this.dialogRef.disableClose = true;
      this.loading = true; 
      this.formData.append('import_product', this.file, this.file.name);
      // this.formData.append('offer_id', this.offer_data.offer_id);
      
      // this.db.fileData( this.formData, 'app_master/couponExcel')
      this.db.fileData( this.formData, 'master/importProducts')
      .subscribe(d => {  
          this.loading = false;
          this.formData = new FormData();
          if(d['status'] == 'BLANK'){
              this.dialog.success('File is Blank');
              return;
          }
          
          if(d['status'] == 'INCORRECT FILE'){
              this.dialog.success('File Data is incorrect');
              return;
          }
          
          if(d['status'] == 'INCORRECT FORMAT'){
              this.dialog.success('File Format is incorrect! only CSV Support');
              return;
          }
          
          if(d['status'] == 'SIZE SHORT'){
              this.dialog.success('CSV File To Sort ');
              return;
          }

          if(d['status'] == 'SIZE LARGE'){
              this.dialog.success('File Size Too Lagre');
              return;
          }
          
          // if(d['status'] == 'UPLOAD' )
          // {
          //     if( d['exist_coupon'].length > 0 )
          //     {
          //         const dialogRef = this.alrt.open(ImportStatusModelComponent,{
          //             width: '650px',
          //             height:'500px',
          //             data: {
          //                 'exist_coupon' : d['exist_coupon'],
          //             }
          //         });
          //         dialogRef.afterClosed().subscribe(result => {   
          //             console.log(`Dialog result: ${result}`);
          //         });
                  
          //         if(d['upload_count'] > 0)
          //         {}
          //         else
          //         {
          //             this.dialog.success(d['exist_coupon'].length+' Coupon Already Exist!');
          //             this.dialogRef.close();
          //         }
          //     }
          //     if(d['upload_count'] > 0)
          //     {
          //         this.dialog.success(d['upload_count']+' Coupon Upload Successfully!');
          //         this.dialogRef.close();
          //     }
          // }
      },err => {console.log(err);  this.formData = new FormData(); this.loading = false; });
  }

}
