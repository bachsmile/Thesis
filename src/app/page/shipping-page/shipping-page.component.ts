import { ProductService } from './../../../service/function/product.service';
import { EventService } from './../../../service/function/event.service';
import { Component, OnInit } from '@angular/core';
import { CharityFundService } from 'src/service/function/charity-fund.service';
import { Announce } from 'src/app/class/announce';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-shipping-page',
  templateUrl: './shipping-page.component.html',
  styleUrls: ['./shipping-page.component.scss']
})
export class ShippingPageComponent implements OnInit {
  listPro1=[];
  listPro2=[];
  listPro3=[];
  listPro4=[];
  listPro=[];
  title='Received and delivered'
  id=1;
  announce:Announce;
  constructor(private eventservice:EventService, private productservice:ProductService, private charityFundService:CharityFundService,
   ) { }
  ngOnInit() {
    this.eventservice.changeMessage(false);
    this.productservice.getListOrder().subscribe(res=>{
      res.data.forEach(x=>{
        if(x.Status=='3'){
          this.listPro1.push(x);
          this.listPro=this.listPro1
        }else if(x.Status=='4'){
          this.listPro2.push(x)
        } else if(x.Status=='5'){
          this.listPro3.push(x)
        }else if( x.Status=='6.3'){
          this.listPro4.push(x)
        }
      })
    })
    this.productservice.watcher.subscribe(res=>{
      this.listPro1=[];
      this.listPro2=[];
      this.listPro3=[];
      this.listPro4=[];
      this.productservice.getListOrder().subscribe(res=>{
        res.data.forEach(x=>{
          if(x.Status=='3'){
            this.listPro1.push(x);
          }else if(x.Status=='4'){
            this.listPro2.push(x)
          } else if(x.Status=='5'){
            this.listPro3.push(x)
          }else if( x.Status=='6.3'){
            this.listPro4.push(x)
          }
        })
        if(this.id==1){
          this.listPro=this.listPro1;
        }
        if(this.id==2){
          this.listPro=this.listPro2;
        }
        if(this.id==3){
          this.listPro=this.listPro3;
        }
        if(this.id==4){
          this.listPro=this.listPro4;
        }
      })
    })
  }
  type(id){
    this.id=id;
    if(id==1){
      document.getElementById('board').style.backgroundColor="#2196F3";
      this.title='Received and delivered';
      this.productservice.update();
    }else if(id==2){
      document.getElementById('board').style.backgroundColor="#4CAF50";
      this.title='Delivery completed';
      this.productservice.update();

    }else if(id==3){
      document.getElementById('board').style.backgroundColor="#f44336";
      this.title='Delivery canceled';
      this.productservice.update();
    }else{
      document.getElementById('board').style.backgroundColor="#555";
      this.title='Delivery is returned';
      this.productservice.update();
    }
  }

  Completed(data){
    let items = {
      'id':data.id,
      'ID_Product': data.ID_Product,
      'Nameproduct': data.Nameproduct,
      'Img1': data.Img1,
      'Img2': data.Img2,
      'Category': data.Category,
      'price': data.price,
      'Time':data.time,
      'Number': data.Number,
      'Status': '4',
      'Transport': data.Transport,
      'Charity':parseInt(data.Charity),
      'ID_Shop':data.ID_Shop,
      'ID_Customer':data.ID_Customer
    };
    console.log(data);
   // this.productservice.update();
    this.productservice.upOrder(JSON.stringify(items)).subscribe(res => {
      console.log(res);
      this.productservice.update();
    });
    let fundIN={
      "Name": data.Nameproduct,
      "Time": this.datetime(),
      "Money": data.Number*data.price*data.Charity/100,
      "Percent": data.Charity,
      "Status": "1",
      "ID_Shop":data.ID_Shop
}
this.charityFundService.create(JSON.stringify(fundIN)).subscribe(res=>{
});
this.announce={
  Details:'Complete to order Id '+ data.id,
  ID_Shop:data.ID_Shop,
  MaID:data.MaID,
  Time:this.datetime(),
  Title:data.Nameproduct,
  id:data.id,
  ID_Product:data.ID_Product
}
console.log(this.announce)
this.eventservice.createAnnounce(JSON.stringify(this.announce)).subscribe(res=>{
})
  }
  Cancel(data){
    let items = {
      'id':data.id,
      'ID_Product': data.ID_Product,
      'Nameproduct': data.Nameproduct,
      'Img1': data.Img1,
      'Img2': data.Img2,
      'Category': data.Category,
      'price': data.price,
      'Time':data.time,
      'Number': data.Number,
      'Status': '5',
      'Transport': data.Transport,
      'Charity':parseInt(data.Charity),
      'ID_Shop':data.ID_Shop,
      'ID_Customer':data.ID_Customer
    };
    console.log(data);
   // this.productservice.update();
    this.productservice.upOrder(JSON.stringify(items)).subscribe(res => {
      console.log(res);
      this.productservice.update();
    });
  }
  Returned(data){
    let items = {
      'id':data.id,
      'ID_Product': data.ID_Product,
      'Nameproduct': data.Nameproduct,
      'Img1': data.Img1,
      'Img2': data.Img2,
      'Category': data.Category,
      'price': data.price,
      'Time':data.time,
      'Number': data.Number,
      'Status': '6',
      'Transport': data.Transport,
      'Charity':parseInt(data.Charity),
      'ID_Shop':data.ID_Shop,
      'ID_Customer':data.ID_Customer
    };
    console.log(data);
   // this.productservice.update();
    this.productservice.upOrder(JSON.stringify(items)).subscribe(res => {
      console.log(res);
      this.productservice.update();
    });
  }
  Returned_s(data){
    let items = {
      'id':data.id,
      'ID_Product': data.ID_Product,
      'Nameproduct': data.Nameproduct,
      'Img1': data.Img1,
      'Img2': data.Img2,
      'Category': data.Category,
      'price': data.price,
      'Time':data.time,
      'Number': data.Number,
      'Status': '6.1',
      'Transport': data.Transport,
      'Charity':parseInt(data.Charity),
      'ID_Shop':data.ID_Shop,
      'ID_Customer':data.ID_Customer
    };
    console.log(data);
   // this.productservice.update();
    this.productservice.upOrder(JSON.stringify(items)).subscribe(res => {
      console.log(res);
      this.productservice.update();
      this.type(4);
    });
  }
  datetime(){
    const date = new Date();
    const dateSendingToServer = new DatePipe('en-US').transform(date, 'yyyy/MM/dd hh:mm:ss');
    return dateSendingToServer;
  }
}
