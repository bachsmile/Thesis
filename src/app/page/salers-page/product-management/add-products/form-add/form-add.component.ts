import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ProductService } from 'src/service/function/product.service';
import { UploadService } from 'src/service/function/upload.service';
import { Product } from 'src/app/class/product';
import {Router} from '@angular/router';
@Component({
  selector: 'app-form-add',
  templateUrl: './form-add.component.html',
  styleUrls: ['./form-add.component.scss']
})
export class FormAddComponent implements OnInit {
  addForm: FormGroup;
  control= new FormControl();
  form: FormGroup;
  product: Product= new Product();
  uploadResponse = { status: '', message: '', filePath: '' };
  success;
  success1;
  error;
  constructor( private fb: FormBuilder,
                private productservice:ProductService,
                private upload: UploadService, private router:Router
    ) { }

  ngOnInit() {
    this.form = this.fb.group({
      avatar: [""]
    });
      let data= JSON.parse(window.sessionStorage.getItem('newItem'));
      this.modal();
      this.product.Catefory1=data.bread1;
      this.product.Catefory2=data.bread2;
      this.product.Name_Product=data.nameProduct;
  }
  AddNewItem(){
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";


      text+='SP-';
      for (let i = 0; i < 5; i++){text +=possible.charAt(Math.floor(Math.random() * possible.length));}
    this.product.ID_Product=text;
    this.product.ID_Shop=window.localStorage.getItem('ID');
    this.product.Point=0;
    this.product.Charity=this.addForm.value.Charity;
    this.product.Gender=this.addForm.value.Gender;
    this.product.Display='show';
    this.productservice.create(JSON.stringify(this.product)).subscribe(res=>{
      this.productservice.createWarehose(JSON.stringify(this.product)).subscribe(res=>{
        this.router.navigate(['/sale-page/Product-manage'])
      });
    })


  }
  modal() {
    this.addForm = this.fb.group({
      Charity: 5,
      Gender:'all',
    });
  }
  processSelectedFiles1(fileInput) {
    if (fileInput.target.files.length > 0) {
      const file = fileInput.target.files[0];
      this.form.get('avatar').setValue(file);
    }
        for (let i = 0; i < fileInput.path[0].files.length; i++) {
          console.log(fileInput.path[0].files[i].name);
          this.product.Img1='http://sanpham.vne/uploads/img-'+fileInput.path[0].files[i].name;

        }

        const formData = new FormData();
     formData.append('user_profile', this.form.get('avatar').value);
     this.upload.upload(formData).subscribe(
       res =>{this.uploadResponse = res;
        if(this.uploadResponse.message=='100'){
          this.success1='Success';
        }
       console.log(this.uploadResponse.message)} ,
       err => {this.error = err}
     );
      }
      processSelectedFiles(fileInput) {
        if (fileInput.target.files.length > 0) {
          const file = fileInput.target.files[0];
          this.form.get('avatar').setValue(file);
        }
            for (let i = 0; i < fileInput.path[0].files.length; i++) {
              console.log(fileInput.path[0].files[i].name);
              this.product.Img2='http://sanpham.vne/uploads/img-'+fileInput.path[0].files[i].name;

            }

            const formData = new FormData();
         formData.append('user_profile', this.form.get('avatar').value);
         this.upload.upload(formData).subscribe(
           res =>{this.uploadResponse = res;
            if(this.uploadResponse.message=='100'){
              this.success='Success';
            }
           console.log(this.uploadResponse.message)} ,
           err => {this.error = err}
         );
          }
}
