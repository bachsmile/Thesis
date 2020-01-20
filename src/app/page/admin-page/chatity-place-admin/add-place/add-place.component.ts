import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UploadService } from 'src/service/function/upload.service';
import { Place } from 'src/app/class/place';
import { EventService } from 'src/service/function/event.service';

@Component({
  selector: 'app-add-place',
  templateUrl: './add-place.component.html',
  styleUrls: ['./add-place.component.scss']
})
export class AddPlaceComponent implements OnInit {
  form: FormGroup;
  //product: Product= new Product();
  uploadResponse = { status: '', message: '', filePath: '' };
  success;
   success1;
   error1;
   itemPlace: Place= new Place();
  constructor( private upload: UploadService,private fb: FormBuilder, private eventService:EventService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      avatar: [""]
    });
  }
  processSelectedFiles(fileInput) {
    if (fileInput.target.files.length > 0) {
      const file = fileInput.target.files[0];
      this.form.get('avatar').setValue(file);
    }
        for (let i = 0; i < fileInput.path[0].files.length; i++) {
          console.log(fileInput.path[0].files[i].name);
          this.itemPlace.Img='http://sanpham.vne/uploads/img-'+fileInput.path[0].files[i].name;

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
  add(){
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      text+='CP-';
      for (let i = 0; i < 5; i++){text +=possible.charAt(Math.floor(Math.random() * possible.length));}
    this.itemPlace.ID_Place=text;
    console.log(this.itemPlace);
    this.eventService.createPlace(JSON.stringify(this.itemPlace)).subscribe(res=>{
      console.log(res);
    })
  }
}
