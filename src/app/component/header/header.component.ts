
import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { LoginService } from 'src/service/function/login.service';
import { ProductService } from 'src/service/function/product.service';
import { Router } from '@angular/router';
import { EventService } from 'src/service/function/event.service';
import { CategoryService } from 'src/service/function/categoty.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() signal:boolean;
  listCategory=[];
  arrList=[];
  user: string = '';
  checkID=false;
  check=false;
  lenghtBag;
  message;
  @Output() headerCheck = new EventEmitter;
 constructor(private categoryservice:CategoryService,private loginservice: LoginService, private productservice:ProductService, private router: Router,private eventservice:EventService) { }

  ngOnInit() {
    this.lenghtBag= window.localStorage.getItem("lengthBag");
    this.user=window.sessionStorage.getItem('user');
    this.checkID= window.sessionStorage.getItem("user")=='admin'?true:false;
    console.log(this.checkID)
    this.check= window.sessionStorage.getItem('user')? true: false;
    this.loginservice.update();
    this.loginservice.watcher.subscribe(data=>{
    this.user=window.sessionStorage.getItem('user');
    this.checkID=window.sessionStorage.getItem("user")=='admin'?true:false;
    this.check= window.sessionStorage.getItem('user')? true: false;
    this.lenghtBag= window.localStorage.getItem("lengthBag");
    })
    this.productservice.currentMessage.subscribe(message => {
      this.message = message;
      this.lenghtBag= window.localStorage.getItem("lengthBag");
      console.log(this.message)
    });
      ////


      let a=[];
    let b=[];
    this.categoryservice.getList().subscribe(res=>{
     b=res.data;
     b.forEach(x=>{
       if(x.action=='1'){
         this.listCategory.push(x);
       }
     })
     // console.log(this.listCategory)
      for (let index = 0; index < this.listCategory.length; index++) {
        if(this.listCategory[index].id_childe==='0'){
          let items={
            parent:[],
            children:[]
          }
          let a=[];
             a.push(this.listCategory[index]);
             items.parent=a;
             this.arrList.push(items);
        }
      }
        this.arrList.forEach( x => {
          this.listCategory.forEach( y => {
             if( x.parent[0].parent_id == y.parent_id && y.id_childe!='0' ){
             x.children.push(y);
            }
          })
         // console.log(this.arrList);
        })
    })

    this.categoryservice.watcher.subscribe(data=>{
      this.categoryservice.getList().subscribe(res=>{
        this.listCategory=res.data;
      })
    })
  }
  openNav(){
    document.getElementById("mySidebar").style.width = "250px";

 }
  closeNav() {
    document.getElementById("mySidebar").style.width = "0";
   // document.getElementById("main").style.marginLeft= "0";
 }
 logout(){
    window.sessionStorage.clear();
    window.localStorage.clear();
    this.loginservice.update();
 }
 go(link){
  //  this.router.navigate[('/Shop/Shop-Gender/'+link)];
  //  this.loginservice.update();
 }
 header(){
  //  this.eventservice.changeMessage(false);
 }
}

