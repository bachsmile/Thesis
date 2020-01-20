import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/service/function/login.service';
import { EventService } from 'src/service/function/event.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit{
  theme=true;
  thems=true;
  slides=[];
  constructor(
     private loginservice:LoginService,
     private eventservice: EventService
    // private productservice:ProductService
    ) { }

  ngOnInit() {
    //this.eventservice.changeMessage(true);
    if(window.localStorage.getItem('theme')==null){
      this.thems=true;
    }else{
      this.thems=window.localStorage.getItem('theme')=='true'?true:false;
    }
    this.loginservice.update();
    this.loginservice.watcher.subscribe(data=>{
      if(window.localStorage.getItem('theme')==null){
        this.thems=true;
      }else{
        this.thems=window.localStorage.getItem('theme')=='true'?true:false;
      }
    })

  }

}

