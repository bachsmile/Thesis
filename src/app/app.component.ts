import { WINDOW } from './../service/window.service';
//import { LoginService } from 'src/app/service/login.service';
import { EventEmitter } from '@angular/core';
import { Component, OnInit, Inject, HostListener, Output } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
//import { UploadService } from './service/upload.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { stringify } from 'querystring';
import { EventService } from 'src/service/function/event.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'bap';
  error: string;
  theme=true;
   headerCheck;
  form: FormGroup;
  uploadResponse = { status: '', message: '', filePath: '' };
  name;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(WINDOW) private window: Window,
    private eventservice:EventService,
    private formBuilder: FormBuilder,
    //private upload: UploadService,
    private http: HttpClient,
    //private loginservice:LoginService
  ){}
  ngOnInit(){
    this.headerCheck=true;
      // this.eventservice.currentMessage.subscribe(x=>{
      //   console.log(x);
      //   this.headerCheck=x;
      // })
    this.form = this.formBuilder.group({
      avatar: [""]
    });
    console.log(this.headerCheck)
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.eventservice.currentMessage.subscribe(x=>{
        console.log(x);
        this.headerCheck=x;
      })
    }, 100);

  }
  myFunction(){
    console.log('x');
  }
  @HostListener("window:scroll", [])
  onWindowScroll() {
    const offset = this.window.pageYOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop || 100;
    if(offset<=100){
      console.log('a')
      if(document.getElementById('header')!=null){
        document.getElementById('header').setAttribute('class','fulls w-100');
      }
    }
    else{
      if(document.getElementById('header')!=null){
        document.getElementById('header').setAttribute('class','full w-100');
      }
    }
  }
  design_theme(){
    this.theme=!this.theme;
    this.window.localStorage.setItem('theme',this.theme+'');
    //this.loginservice.update();
  }
  header(e){
    this.headerCheck=false;
  }
}
