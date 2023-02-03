import {Component,OnInit,Inject} from '@angular/core';
import {DatabaseService} from '../_services/DatabaseService';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogComponent} from '../dialog/dialog.component';

import {SessionStorage} from '../_services/SessionService';
import { ImportStatusModelComponent } from '../offer/import-status-model/import-status-model.component';
import {MatDialog, MatDialogRef,MAT_DIALOG_DATA} from '@angular/material';
// import { NgxEditorModule } from 'ngx-editor';



@Component({
  selector: 'app-addgift',
  templateUrl: './addgift.component.html',
})
export class AddgiftComponent implements OnInit {
  
  formData = new FormData();
  loading_list = false;
  addOffer: any = {};
  addArea: any = {};
  addGift: any = {};
  savingData = false;
  states: any = [];
  districts: any = [];
  cities: any = [];
  pincodes: any = [];
  offer_id: any = 0;
  mindate:any = new Date();
  selected_image:any=[];
  img_url:string;
  uploadurl:any="";
  gift:any={};
  mode:any;
  id:any;
  image1:any;
  gift_id:any;
  gift_array:any;
  array_list:any;
  imagearray:any;
  imgData:any =[]

  constructor(public db: DatabaseService, @Inject(MAT_DIALOG_DATA) public params: any,private route: ActivatedRoute, private router: Router, public ses: SessionStorage,
    public dialog: DialogComponent, public alrt:MatDialog, public dialogRef: MatDialogRef<AddgiftComponent>) { 
      this.mode = this.params.mode
      if( this.mode == 'edit'){
      

        this.id = this.params.id
        console.log("id====>",this.id );
        this.gift = this.id
        this.karigerGiftList();
     
      }
     
      
    }
    
    ngOnInit() {
      this.img_url = this.db.myurl + this.db.img_url + this.db.prod_img_url 
      this.uploadurl = this.db.uploadUrl;
      

    }
    
    deleteProductImage(index)
    {
        this.selected_image.splice(index,1)
    }
    numeric_Number(event: any) {
      const pattern = /[0-9\+\-\ ]/;
      let inputChar = String.fromCharCode(event.charCode);
      if (event.keyCode != 8 && !pattern.test(inputChar)) {
        event.preventDefault();
      }
    }
    
    onUploadChange2(evt: any) {
      // const file = evt.target.files[0];
      // if (file) {
      //   const reader = new FileReader();
      //   reader.onload = this.handleReaderLoaded2.bind(this);
      //   reader.readAsBinaryString(file);
      // }
      
      for(let i=0;i<evt.target.files.length;i++)
      {
          const file = evt.target.files[i];
          if (file) {
              const reader = new FileReader();
              reader.onload = this.handleReaderLoaded2.bind(this);
              reader.readAsBinaryString(file);
          }
      }
    }
    fileName = '';
    image = new FormData();

    onUploadChange(data: any)
    {            
        console.log(data);
        
        for(let i=0;i<data.target.files.length;i++)
        {
            console.log(data.target.files[i]);
            let files = data.target.files[i];
            let filesName = data.target.files[i].name;
            console.log(filesName);
            
            if (files) 
            {
                this.fileName = data.target.files[i].name;
                console.log(filesName);
                let reader = new FileReader();
                reader.onload = (e: any) => {
                    console.log(e);
                    this.selected_image.push({"image":e.target.result});
                    console.log(e.target.result);
                    
                    console.log(this.selected_image);
                    console.log(this.selected_image.length);
                    // if(this.selected_image.length==0){
                    //     this.hideAddImage=false;
                    // }
                    // else{
                    //     this.hideAddImage=true;
                    // }
                }
                reader.readAsDataURL(files);
            }
            // let imageIndex;
            // if(this.selected_image.length==0){
            //      imageIndex=i;
            // }
            // else{
            //      imageIndex = this.selected_image.length;
            // }
            // this.image.append("image_"+imageIndex,data.target.files[i],data.target.files[i].name);
            this.image.append("image_"+i,data.target.files[i],data.target.files[i].name);

            console.log(this.image);
            
        }
    }
    
    handleReaderLoaded2(e) {
      this.selected_image = '' + btoa(e.target.result) ;
      console.log(this.selected_image);
    }
    
    
    giftList:any = [];
    
    addgiftList()
    {
      if( !this.gift.gift_title ){
        this.dialog.warning('Please Enter Title!');
        return;
      }
      if(!this.gift.coupon_points){
        this.dialog.warning('Please Enter Coupon Points!');
        return;
      }
      if( !this.gift.gift_specification ){
        this.dialog.warning('Please Enter Gift Specification!');
        return;
      }
     
      if( this.selected_image.length=='0' ){
        this.dialog.warning('Please Choose at least one Image ');
        return;
      }
      for (let i = 0; i < this.giftList.length; i++) {
        if( this.gift.gift_title ===  this.giftList[i].gift_title ){
          this.dialog.success('Part Number Already Exist, Please Delete it first.');
          return;
        }
      }
      this.giftList.push( this.gift );
      this.savingData = true;
      
      this.db.insert_rqst( { 'gift' : this.gift, 'login_id' :this.db.datauser.id ,'images':this.selected_image}, 'offer/masterGiftAdd')
      .subscribe( d => {  
        this.savingData = false;
        console.log( d );
        this.router.navigate(['gifts']);
        if(d['status'] == 'EXIST' ){
          this.dialog.error( 'Offer Code Already exists');
          return;
        }
        this.dialogRef.close(true);
      });
    }
    
    RemoveItem(i)
    {
      console.log(i); 
      this.giftList.splice(i,1);
      this.dialog.success('Item has been deleted.');
    }
    
    saveOffer(form:any) {
      // if( !this.addOffer.offer_banner ){
      //   this.dialog.warning('Please Upload Offer Banner Image');
      //   return;
      // }
      this.savingData = true;
      this.db.insert_rqst( { 'gift' : this.giftList , 'login_id' :this.db.datauser.id }, 'offer/masterGiftAdd')
      .subscribe( d => {
        this.savingData = false;
        console.log( d );
        if(d['status'] == 'EXIST' ){
          this.dialog.error( 'Offer Code Already exists');
          return;
        }
       
      });
    }

    karigerGiftList(){
      console.log("id ==== >",this.gift_id);
      this.db.post_rqst(  {'id': this.id}, 'master/getMasterGiftImages')
      .subscribe((d)=> {
        this.loading_list = false;
        console.log("gift_LIst",d);
        this.gift = d['gift']
        this.selected_image = d['gift']['image']

          console.log(this.selected_image);
        
        console.log("array_list",this.imgData);
        for (let i = 0; i < this.imgData.length; i++) {
          
            this.imagearray = this.imgData[i];
          console.log("element ====>", this.gift );
         }

    });
    }

    giftEdit(){
      this.loading_list = true;
      console.log("id ==== >",this.gift_id);
      this.db.post_rqst(  {'gift': this.gift}, 'master/masterGiftEdit')
      .subscribe((d)=> {
        this.loading_list = false;
        this.savingData = false;
        console.log( d );
        this.router.navigate(['gifts']);
        if(d['status'] == 'SUCCESS' ){
          this.dialog.success( 'Gift Updated Successfully');
          this.dialogRef.close(true);
          return;
        }
        
    });
    }
    
  }
  