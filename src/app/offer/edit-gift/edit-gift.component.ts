import { Component,Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DatabaseService} from '../../_services/DatabaseService';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogComponent} from '../../dialog/dialog.component';

@Component({
  selector: 'app-edit-gift',
  templateUrl: './edit-gift.component.html',
})
export class EditGiftComponent implements OnInit {
  
  data: any = [];
  loading_list:any = false;
  mode:any;
  savingData = false;
  gift_id;
  offer_id;
  total_redeem:any;
  image = new FormData();
  uploadUrl:any=''
  giftList:any = [];
  gift :any = {};
  giftlisting:any=[];
  value:any=[];
  index:any=[];
  newItems:any=[];
  filter:any=[];

  constructor(public db: DatabaseService, private route: ActivatedRoute, private router: Router,  public dialog: DialogComponent,
    @Inject(MAT_DIALOG_DATA) public lead_data: any, public dialogRef: MatDialogRef<EditGiftComponent>) {
      
      this.data.id = lead_data.id;
      this.value = lead_data.value

      console.log("value is print =====>");
      console.log("value is print =====>",this.value);
      console.log("value is print =====>");
      
      
      console.log(this.data.id);
      this.data.total_redeem = lead_data.total_redeem;
      this.offer.offer_id=lead_data.offer_id;
      console.log(this.offer.offer_id);
      this.total_redeem =  this.data.total_redeem;
    }
    ngOnInit() {
      this.uploadUrl = this.db.uploadUrl;
      this.giftDetail();
      this.getGiftList();
    }
    
    offer:any = {};
    giftDetail() {
      if(!this.data.id)return;
      this.loading_list = true;
      this.db.post_rqst(  {'id' : this.data.id } , 'offer/giftEditDetail')
      .subscribe( d => {
        this.loading_list = false;
        console.log( d );
        this.offer = d.gift;


        
      });
    }
    
    numeric_Number(event: any) {
      const pattern = /[0-9\+\-\ ]/;
      let inputChar = String.fromCharCode(event.charCode);
      if (event.keyCode != 8 && !pattern.test(inputChar)) {
        event.preventDefault();
      }
    }
    giftList1:any=[];
    addoffer()
    {
      this.offer.id=this.data.id;
      console.log(this.data.id);
      
      this.offer.created_by=this.db.datauser.id;
      console.log(this.offer.image);
      console.log(this.giftList);
     
      this.savingData = true;
      this.db.post_rqst( { 'offer_id': this.offer.offer_id ,'gift' : this.giftList}, 'offer/giftEdit')
      .subscribe( d => {
        if(this.data.id )
        {
          this.dialog.success('Gift Successfully Update!');
        }
        else
        {
          this.dialog.success('Gift Successfully Added!');
        }
        
        this.offer.id = d['offer_id'];
        console.log(this.offer.id);
        
        // if(this.image)
        // {
        //   this.image.append("offer_id",this.offer.id);
        //   this.db.fileData(this.image,"giftImage")
        //   .subscribe(resp=>{
        //     console.log(resp);
        //   })
        // }
        
        this.savingData = false;
        this.dialogRef.close(true);
        console.log( d );
      });
    }
    
    onNoClick(): void{
      this.dialogRef.close();
    }
    
    tmpimg:any;
    onUploadChange2(data: any) {
      let files = data.target.files[0];
      if (files) 
      {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.tmpimg = e.target.result;
          this.offer.gift_image = e.target.result;
        }
        reader.readAsDataURL(files);
      }
      this.image.append("image",data.target.files[0],data.target.files[0].name);
    }
     
    addgiftList()
    {
      
      for (let i = 0; i < this.giftList.length; i++) {
        if( this.gift.gift_title ===  this.giftList[i].gift_title ){
          this.dialog.success('Part Number Already Exist, Please Delete it first.');
          return;
        }
      }
      console.log(this.gift);
      this.giftList.push( this.gift );
      console.log(this.giftList);
      // this.gift= '';
      
    }
    getGiftList() 
    {

      this.loading_list = true;
     
      this.filter.date = this.filter.date  ? this.db.pickerFormat(this.filter.date) : '';
      this.filter.start_date = this.filter.start_date  ? this.db.pickerFormat(this.filter.start_date) : '';
      this.filter.end_date = this.filter.end_date  ? this.db.pickerFormat(this.filter.end_date) : '';
     
      
      this.db.post_rqst(  {  'filter': this.filter , 'login':this.db.datauser}, 'offer/dropDownGift?page=')
    .subscribe((d)=> {
        this.loading_list = false;
        console.log(d);
        
        // this.current_page = d.gift.current_page;
        // this.last_page = d.gift.last_page;
        this.giftlisting = d['gift']
          this.newItems = [];
          let item = {};
        //  if(this.value.length > 0){
          for(let i = 0; i < this.giftlisting.length; i++) {
            item = this.value.findIndex((row) => row.master_gift_id === this.giftlisting[i].id);
            console.log('item 111',item);
             
            if(item === -1) // Value inside 
            {
              this.newItems.push(this.giftlisting[i]);
            }
          } console.log("new item====>",this.newItems);
      // }
      });
    }
    
    RemoveItem(i)
    {
      console.log(i);
      this.giftList.splice(i,1);
      this.dialog.success('Item has been deleted.');
    }
  }
  