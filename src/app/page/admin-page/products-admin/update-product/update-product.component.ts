import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ProductService } from 'src/service/function/product.service';
import { UploadService } from 'src/service/function/upload.service';
import { Product } from 'src/app/class/product';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {
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
                private upload: UploadService,
                private route: ActivatedRoute,
                private toast:ToastrService,
                private router:Router
    ) { }

  ngOnInit() {
    let id;
    this.route.paramMap.subscribe(params => {
      id= this.route.snapshot.paramMap.get('id');
    });
    this.productservice.getItem(JSON.stringify(id)).subscribe(res=>{
      this.product=res.data[0];
      console.log(this.product);
    })
    this.form = this.fb.group({
      avatar: [""]
    });
      let data= JSON.parse(window.sessionStorage.getItem('newItem'));
      this.modal();
      // console.log(data.bread1)
      // this.product.Catefory1=data.bread1;
      // this.product.Catefory2=data.bread2;
      // this.product.Name_Product=data.nameProduct;
  }
  // AddNewItem(){
  //   let text = "";
  //   let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";


  //     text+='SP-';
  //     for (let i = 0; i < 5; i++){text +=possible.charAt(Math.floor(Math.random() * possible.length));}
  //   this.product.ID_Product=text;
  //   this.product.ID_Shop=window.localStorage.getItem('ID');
  //   this.product.Point=0;
  //   this.product.Charity=this.addForm.value.Charity;
  //   this.product.Display='show';
  //   this.productservice.create(JSON.stringify(this.product)).subscribe(res=>{
  //     console.log(res);
  //   })
  //   console.log(this.product);
  //   this.productservice.createWarehose(JSON.stringify(this.product)).subscribe(res=>{
  //     console.log(res)
  //   })
  // }
  modal() {
    this.addForm = this.fb.group({
      Charity: 5,
    });
  }

      processSelectedFiles(fileInput) {
        console.log(fileInput.target.files)
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
            console.log(res)
           console.log(this.uploadResponse.message)} ,
           err => {this.error = err}
         );
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
               console.log(res)} ,
               err => {this.error = err}
             );
              }
    Update(){
      this.product.Charity=this.addForm.value.Charity;
      console.log(this.product);
      this.productservice.updateIF(JSON.stringify(this.product)).subscribe(res=>{
        console.log(res.data[0].Update=="success");
          if(res.data[0].Update=="success"){
              this.toast.success('Update Product ',' Update success!');
              this.router.navigate(['/admin/Product-manage'])
          }
      })
    }
}

