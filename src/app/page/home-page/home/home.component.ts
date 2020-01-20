import { CharityFundService } from './../../../../service/function/charity-fund.service';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/service/function/login.service';
import { EventService } from 'src/service/function/event.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  theme=true;
  thems=true;
  slides=[];
  charity=[];
  allMoney=0;
  constructor(
     private loginservice:LoginService,
     private eventservice:EventService,
     private charityFundService:CharityFundService
    //  private productservice:ProductService
    ) { }

  ngOnInit() {
    this.eventservice.changeMessage(true);

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
    this.charityFundService.getFund().subscribe(x=>{
     if(x!=null){
      this.charity=x.data;
      this.charity.forEach(y=>{
        if(y.Status==1){
          this.allMoney+=parseInt(y.Money);
        }
        else{
          this.allMoney-=parseInt(y.Money);
        }
      })
     }
    })

  }

}
