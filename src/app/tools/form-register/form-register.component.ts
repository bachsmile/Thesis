import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { LoginService } from 'src/service/function/login.service';
import { ProductService } from 'src/service/function/product.service';
import { CategoryService } from 'src/service/function/categoty.service';
import { HttpClient } from '@angular/common/http';
import { UploadService } from 'src/service/function/upload.service';
import { Auction } from 'src/app/class/auction';
import { Category } from 'src/app/class/category';
import { Product } from 'src/app/class/product';
import { User } from 'src/app/class/user';
import { EventService } from 'src/service/function/event.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.scss']
})
export class FormRegisterComponent implements OnInit {
  @Output() sent= new EventEmitter();
  @Output() update= new EventEmitter();
  @Input() idParen:string;
  placeNum='';
  display='none'; //default Variable
  itemCategory:Category = new Category();
  itemAuction:Auction = new Auction();
  counter=false;
  category=false;
  profileForm: FormGroup;
  infoUser:FormGroup;
  compares = false;
  alert=false;
  submitted=false;
  user: User= new User();
  prod:Product= new Product();

  product: Product= new Product();
  uploadResponse = { status: '', message: '', filePath: '' };
  success;
  success1;
  error1;
value=[];
//load file
error: string;
userId: number = 1;
form: FormGroup;
  /////
  get infoUserControl(): FormGroup {
    return this.profileForm.get("infoUser") as FormGroup;
  }
  get inforPasswordControl(): FormGroup {
    return this.profileForm.get("infoPassword") as FormGroup;
  }
  get inforUsernameControl(): FormGroup {
    return this.profileForm.get("infoUsername") as FormGroup;
  }
  get firstNameControl(): FormControl {
    return this.infoUserControl.get("firstName") as FormControl;
  }
  get lastNameControl(): FormControl {
    return this.infoUserControl.get("lastName") as FormControl;
  }
  get emailNameControl(): FormControl {
    return this.infoUserControl.get("email") as FormControl;
  }
  get telephoneControl(): FormControl {
    return this.infoUserControl.get("telephone") as FormControl;
  }
  get PlaceNum(): FormControl {
    return this.infoUserControl.get("PlaceNum") as FormControl;
  }
  //infoUsername
  get usernameControl(): FormControl {
    return this.inforUsernameControl.get("username") as FormControl;
  }
  //infoPassword
  get passwordControl(): FormControl {
    return this.inforPasswordControl.get("password") as FormControl;
  }
  get passwordConfirmControl(): FormControl {
    return this.inforPasswordControl.get("passwordConfirm") as FormControl;
  }
  constructor(private fb: FormBuilder, private loginservice:LoginService, private productservice:ProductService,
    private formBuilder: FormBuilder,
    private upload: UploadService,
    private http: HttpClient,
    private categoryservice:CategoryService,
    private eventService: EventService,
    private toastr: ToastrService,
    ) { }

  ngOnInit() {
    this.placeNum='+84';
    this.modal();
    this.form = this.formBuilder.group({
      avatar: [""]
    });
  }
  onSubmit(){
    //uploadimg
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
  onSubmit1(){
    this.submitted = true;
  }
  onSubmit2(){}
  compare(event: KeyboardEvent) {
    this.compares =
      this.passwordConfirmControl.value === this.passwordControl.value
        ? true
        : false;
    console.log(this.compares);
  }
  modal() {
    this.profileForm = this.fb.group({
      infoUser: this.fb.group({
        firstName: ["", [Validators.required]],
        lastName: ["", [Validators.required]],
        email: [
          "",
          [Validators.required, Validators.minLength(8), Validators.email]
        ],
        telephone: ["",
        [Validators.required,Validators.pattern("^[0-9]*$"),
        Validators.minLength(8)]],
        PlaceNum1:"+84",
      }),
      infoPassword: this.fb.group({
        password: ["", [Validators.required, Validators.minLength(8)]],
        passwordConfirm: ["", [Validators.required]]
      }),
      infoUsername: this.fb.group({
        username: ["", [Validators.required, Validators.minLength(8)]],
      }),
      subscribe: "yes",
      accountType:"Customer",
      gender:'Men',

    });
  }
  register1() {
    console.log(JSON.stringify(this.prod));
   this.productservice.create(JSON.stringify(this.prod)).subscribe(res=>{
     console.log(res);
     if(res.message==='Success'){
      alert("Chúc mừng bạn đa đăng kỳ thành công");
      this.toastr.success('Add user Success','Add success')
        this.counter=true;
      this.sent.emit(this.counter);
     }
   })


  }
  register() {

    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    if(this.profileForm.value.accountType==='Customer'){
      text+='CU-';
      for (let i = 0; i < 5; i++){text +=possible.charAt(Math.floor(Math.random() * possible.length));}
    }
   else{
     text+='SE-';
    for (let i = 0; i < 5; i++){text +=possible.charAt(Math.floor(Math.random() * possible.length));}
   }

    console.log(text);
    this.user.firstname=this.profileForm.value.infoUser.firstName;
    this.user.lastname=this.profileForm.value.infoUser.lastName;
    this.user.email=this.profileForm.value.infoUser.email;
    this.user.telephone=this.profileForm.value.infoUser.PlaceNum1+this.profileForm.value.infoUser.telephone;
    this.user.username=this.profileForm.value.infoUsername.username;
    this.user.password=this.profileForm.value.infoPassword.password;
    this.user.Subscribe=this.profileForm.value.subscribe;
    this.user.Authorities=this.profileForm.value.accountType;
    this.user.MaAcount=text;
    this.user.Gender=this.profileForm.value.gender;
    console.log(this.user);
   this.loginservice.create(JSON.stringify(this.user)).subscribe(res=>{
     console.log(res);
     if(res.message==='Success'){
      this.toastr.success('Add user Success','Add success')
      document.getElementById('myModal').style.display="none";
        this.counter=true;
      this.sent.emit(this.counter);
      if(this.user.Authorities=='Seller'){
        let info={
          'ID_Shop':this.user.MaAcount,
          'NameShop':this.user.username,
          'Address':'',
          'Introduce':'',
          'Mail':this.user.email,
          'Phone':this.user.telephone,
          'Link':''
        };
        this.eventService.createInFoShop(JSON.stringify(info)).subscribe(res=>{
          console.log(res);
        })
      }
     }
   })
  }
  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('avatar').setValue(file);
    }
  }
  addCategory(check){
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";


      text+='DM-';
      for (let i = 0; i < 5; i++){text +=possible.charAt(Math.floor(Math.random() * possible.length));}
    if(check==='parent'){
        this.itemCategory.id_childe='0';
        this.itemCategory.parent_id=text;
    }
    if(check==='child'){
      this.itemCategory.parent_id=this.idParen;
      this.itemCategory.id_childe=text;
    }
    console.log(this.itemCategory)
    this.categoryservice.create(JSON.stringify(this.itemCategory)).subscribe(res=>{
      //console.log(res);
     // this.display='none'; //set none css after close dialog
     // console.log(document.getElementsByTagName('body')[0]);
      // document.getElementsByTagName('body')[0].classList.remove('modal-open');
      // document.getElementById('myModal5').style.display='none';
      //this.counter=true;
      //this.sent.emit(this.counter);
       if(res.message=='Success'){
       this.toastr.success('Add categoty Success','Add success')
         this.update.emit('true');
         this.itemCategory.DanhMuc='';
      //   this.sent.emit(this.counter);
        // document.getElementById('modelId').style.display='none';
        // let an = document.getElementsByClassName('modal-backdrop');
        //   an[0].setAttribute('class','');
       }
    })
  }
  addAuction(){
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      text+='AT-';
      for (let i = 0; i < 5; i++){text +=possible.charAt(Math.floor(Math.random() * possible.length));}
      console.log(this.itemAuction);
      this.itemAuction.Time_start='2019-01-01 00:00:00';
      this.itemAuction.Time_end='2019-01-01 00:00:00';
      this.itemAuction.Price_end=this.itemAuction.Price_start;
      this.itemAuction.Shop=window.localStorage.getItem('ID');
      this.itemAuction.Rate=0;
    this.itemAuction.ID_auction=text;
     console.log(this.itemAuction)
    this.productservice.createAuction(JSON.stringify(this.itemAuction)).subscribe(res=>{
      console.log(res);
    })
  }
  processSelectedFiles1(fileInput) {
    if (fileInput.target.files.length > 0) {
      const file = fileInput.target.files[0];
      this.form.get('avatar').setValue(file);
    }
        for (let i = 0; i < fileInput.path[0].files.length; i++) {
          console.log(fileInput.path[0].files[i].name);
          this.itemAuction.Img='http://sanpham.vne/uploads/img-'+fileInput.path[0].files[i].name;

        }

        const formData = new FormData();
     formData.append('user_profile', this.form.get('avatar').value);
     this.upload.upload(formData).subscribe(
       res =>{this.uploadResponse = res;
        if(this.uploadResponse.message=='100'){
          this.success1='Success';
        }
       console.log(this.uploadResponse.message)} ,
       err => {this.error1 = err}
     );
      }
  processSelectedFiles(fileInput) {
        if (fileInput.target.files.length > 0) {
          const file = fileInput.target.files[0];
          this.form.get('avatar').setValue(file);
        }
            for (let i = 0; i < fileInput.path[0].files.length; i++) {
              console.log(fileInput.path[0].files[i].name);
              this.itemAuction.Img1='http://sanpham.vne/uploads/img-'+fileInput.path[0].files[i].name;

            }

            const formData = new FormData();
         formData.append('user_profile', this.form.get('avatar').value);
         this.upload.upload(formData).subscribe(
           res =>{this.uploadResponse = res;
            if(this.uploadResponse.message=='100'){
              this.success='Success';
            }
           console.log(this.uploadResponse.message)} ,
           err => {this.error1 = err}
         );
      }
  processSelectedFiles2(fileInput) {
            if (fileInput.target.files.length > 0) {
              const file = fileInput.target.files[0];
              this.form.get('avatar').setValue(file);
            }
                for (let i = 0; i < fileInput.path[0].files.length; i++) {
                  console.log(fileInput.path[0].files[i].name);
                  this.itemAuction.Img2='http://sanpham.vne/uploads/img-'+fileInput.path[0].files[i].name;

                }

                const formData = new FormData();
             formData.append('user_profile', this.form.get('avatar').value);
             this.upload.upload(formData).subscribe(
               res =>{this.uploadResponse = res;
                if(this.uploadResponse.message=='100'){
                  this.success='Success';
                }
               console.log(this.uploadResponse.message)} ,
               err => {this.error1 = err}
             );
  }
}
