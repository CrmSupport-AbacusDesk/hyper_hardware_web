import { Component, OnInit, Inject } from "@angular/core";
import { DatabaseService } from "../../_services/DatabaseService";
import { ActivatedRoute, Router } from "@angular/router";
import { DialogComponent } from "../../dialog/dialog.component";
import { SessionStorage } from "../../_services/SessionService";
import { ProductImageModuleComponent } from "../product-image-module/product-image-module.component";
import { MatDialog } from "@angular/material";
import { ProductcategoryDescModuleComponent } from "../productcategory-desc-module/productcategory-desc-module.component";
import { HttpClient } from "@angular/common/http";
import { async } from "@angular/core/testing";

@Component({
  selector: "app-productcategory-list",
  templateUrl: "./productcategory-list.component.html",
})
export class ProductcategoryListComponent implements OnInit {
  savingData = false;
  category: any = {};
  loading_list = false;
  total_categories: any = 0;
  categories: any = [];
  image = new FormData();
  pdf = new FormData();
  
  uploadurl: any = "";
  hideAddImage = false;
  fileName = "";
  
  constructor(
    public db: DatabaseService,
    private route: ActivatedRoute,
    private router: Router,
    public ses: SessionStorage,
    public dialog: DialogComponent,
    public alrt: MatDialog,
    private http: HttpClient
    ) {}
    
    ngOnInit() {
      this.getCategoryList("");
      this.category.image = [];
      this.uploadurl = this.db.uploadUrl;
    }
    
    last_page: number;
    current_page = 1;
    search: any = "";
    source: any = "";
    searchData = true;
    isInvoiceDataExist = false;
    filter: any = {};
    filtering: any = false;
    categoryImage: string = "";
    pdfImage: string = "";
    
    redirect_previous() {
      this.current_page--;
      this.getCategoryList("");
    }
    redirect_next() {
      if (this.current_page < this.last_page) {
        this.current_page++;
      } else {
        this.current_page = 1;
      }
      this.getCategoryList("");
    }
    toggle: any;
    editCategory(id, index) {
      console.log(id);
      console.log(index);
      this.category = this.categories.filter((x) => x.id == id)[0];
      this.category.profile_selected = 0;
      this.productimg.image = this.uploadurl + this.category.image_name;
      
      // this.selected_image = [];
      // for (let i = 0; i < this.category.image.length; i++) {
      //   if (parseInt(this.category.image[i].profile) == 1) {
      //     this.category.profile_selected = i;
      //   }
      //   this.selected_image.push({
      //     image: this.category.image[i].image_name,
      //     id: this.category.image[i].id,
      //   });
      // }
      console.log(this.selected_image);
      console.log(this.category);
    }
    
    
    
    savecategory(form: any) {
      this.loading_list = true;
      this.savingData = true;
      if (this.category.id) {
        this.category.edit_cat_id = this.category.id;
      }
      this.category.created_by = this.db.datauser.id;
      // this.category.image = this.selected_image ? this.selected_image : [];
      this.category.image = this.productimg.image;
      
      
      this.db
      .insert_rqst(
        { category: this.category, created_by: this.db.datauser.id },
        "master/addCategory"
        )
        .subscribe((d) => {
          this.savingData = false;
          this.loading_list = false;
          
          console.log(d);
          if (d["status"] == "EXIST") {
            this.dialog.error("This Catalogue Already exists");
            return;
          }
          
          // if (this.image) {
          //   this.image.append("created_by", this.db.datauser.id);
          //   this.image.append("category_id", d.id);
          //   let callImage_Api = 0;
          //   this.db.fileData(this.image, "category_image").subscribe((resp) => {
          //     this.image = new FormData();
          //   });
          // }
          this.toggle = "false";
          this.getCategoryList("");
          console.log("first time route");
        });
      }
      
      addCategory() {
        this.category = {};
        this.productimg.image ={}
        console.log("dscds");
      }
      
      catdata: any = "";
      
      getData: any = {};
      getCategoryList(action) {
        console.log(this.db.datauser);
        
        this.loading_list = true;
        this.filter.mode = 0;
        if (this.filter.date || this.filter.location_id) this.filtering = true;
        
        if (action == "refresh") {
          this.filter = {};
        }
        
        this.db
        .post_rqst(
          { filter: this.filter },
          "master/categoryList?page=" + this.current_page
          )
          .subscribe((d) => {
            console.log(d);
            this.loading_list = false;
            console.log(this.loading_list);
            this.current_page = d.categories.current_page;
            this.last_page = d.categories.last_page;
            this.total_categories = d.categories.total;
            this.categories = d.categories.data;
            this.categoryImage = this.categories[0].image[0].image_name;
            this.pdfImage = this.categories[0].image[0].image_name;
            console.log(this.categories);
            console.log(this.categories[0].category_name);
          });
        }
        
        // selected_image: any = [];
        selected_image:any ={}
        
        
        
        
        // onUploadChange(data: any) {
        //   for (let i = 0; i < data.target.files.length; i++) {
        //     console.log(data.target.files[i]);
        //     let files = data.target.files[i];
        //     let filesName = data.target.files[i].name;
        //     console.log(filesName);
        
        //     if (files) {
        //       this.fileName = data.target.files[i].name;
        //       console.log(filesName);
        //       let reader = new FileReader();
        //       reader.onload = (e: any) => {
        //         console.log(e);
        //         this.selected_image.push({ image: e.target.result });
        //         console.log(e.target.result);
        
        //         console.log(this.selected_image);
        //         console.log(this.selected_image.length);
        //         if (this.selected_image.length == 0) {
        //           this.hideAddImage = false;
        //         } else {
        //           this.hideAddImage = true;
        //         }
        //       };
        //       reader.readAsDataURL(files);
        //     }
        //     // let imageIndex;
        //     // if(this.selected_image.length==0){
        //     //      imageIndex=i;
        //     // }
        //     // else{
        //     //      imageIndex = this.selected_image.length;
        //     // }
        //     // this.image.append("image_"+imageIndex,data.target.files[i],data.target.files[i].name);
        //     this.image.append(
        //       "image_" + i,
        //       data.target.files[i],
        //       data.target.files[i].name
        //       );
        
        //       console.log(this.image);
        //     }
        //   const file = data.target.files[0];
        
        //   if (file) {
        //     const reader = new FileReader();
        //     reader.onload = this.handleReaderLoaded1.bind(this);
        //     reader.readAsBinaryString(file);
        //     console.log(reader);
        //     console.log('in if')
        //   }
        
        // }
        productimg :any ={};
        onUploadChange(evt: any) {
          console.log(evt);
          const file = evt.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = this.handleReaderLoaded1.bind(this);
            reader.readAsBinaryString(file);
            console.log(reader);
            console.log('in if')
          }
        }
        
        handleReaderLoaded1(e) {
          this.productimg.image = 'data:image/png;base64,' + btoa(e.target.result) ;
          console.log(this.selected_image)
        }
        // selected_pdf: any = [];
        // onUploadChange1(data: any) {
        //   console.log(data);
        
        //   for (let i = 0; i < data.target.files.length; i++) {
        //     console.log(data.target.files[i]);
        //     console.log(data.target.files[i].size);
        
        //     if (data.target.files[i].size >= 5000000) {
        //       this.dialog.error(
        //         "PDF file size is too large, maximum file size is 5 MB."
        //       );
        //       return;
        //     }
        //     let files = data.target.files[i];
        //     let filesName = data.target.files[i].name;
        //     console.log(filesName);
        
        //     if (files) {
        //       this.fileName = data.target.files[i].name;
        //       console.log(filesName);
        //       let reader = new FileReader();
        //       reader.onload = (e: any) => {
        //         console.log(e);
        //         this.selected_pdf.push({ image: e.target.result });
        //         console.log(e.target.result);
        
        //         console.log(this.selected_pdf);
        //         console.log(this.selected_pdf.length);
        //         if (this.selected_pdf.length == 0) {
        //           this.hideAddImage = false;
        //         } else {
        //           this.hideAddImage = true;
        //         }
        //       };
        //       // reader.readAsDataURL(files);
        //     }
        //     // let imageIndex;
        //     // if(this.selected_image.length==0){
        //     //      imageIndex=i;
        //     // }
        //     // else{
        //     //      imageIndex = this.selected_image.length;
        //     // }
        //     // this.image.append("image_"+imageIndex,data.target.files[i],data.target.files[i].name);
        //     this.pdf.append(
        //       "image_" + i,
        //       data.target.files[i],
        //       data.target.files[i].name
        //     );
        
        //     console.log(this.image);
        //   }
        // }
        
        
        deleteProduct(id) {
          this.dialog.delete("Category").then((result) => {
            if (result) {
              this.db
              .post_rqst({ category_id: id }, "master/categoryDelete")
              .subscribe((d) => {
                console.log(d);
                this.getCategoryList("");
                this.dialog.successfully();
              });
            }
          });
        }
        
        deleteProductImage(index, data) {
          console.log(index);
          console.log(data.id);
          if (data.id) {
            console.log("if");
            this.db
            .post_rqst({ data: data }, "master/delete_cat_image")
            .subscribe((resp) => {
              console.log(resp);
              this.selected_image.splice(index, 1);
            });
          } else {
            console.log("else");
            this.selected_image.splice(index, 1);
            if (this.selected_image.length == 0) {
              this.hideAddImage = false;
              console.log("false");
            } else {
              this.hideAddImage = true;
            }
          }
        }
        active: any = "";
        ProductProfile(index, img_id) {
          this.active = index;
          this.category.profile_selected = img_id;
        }
        openDialog(id, string) {
          const dialogRef = this.alrt.open(ProductImageModuleComponent, {
            data: {
              id: id,
              mode: string,
            },
          });
          
          dialogRef.afterClosed().subscribe((result) => {
            console.log(`Dialog result: ${result}`);
          });
        }
        clearData() {
          console.log("close");
          this.selected_image = [];
          this.hideAddImage = false;
          this.getCategoryList("refresh");
        }
        
        openDial(id, string) {
          const dialogRef = this.alrt.open(ProductcategoryDescModuleComponent, {
            width: "768px",
            data: {
              id: id,
              mode: string,
            },
          });
          
          dialogRef.afterClosed().subscribe((result) => {
            console.log(`Dialog result: ${result}`);
          });
        }
        
        exportproductCategory() {
          this.filter.mode = 1;
          this.db
          .post_rqst(
            { filter: this.filter, login: this.db.datauser },
            "master/exportproductCategory"
            )
            .subscribe((d) => {
              this.loading_list = false;
              document.location.href =
              this.db.myurl + "app/uploads/exports/productCategoryList.csv";
              console.log(d);
            });
          }
        }
        