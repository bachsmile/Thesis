import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { LoginService } from 'src/service/function/login.service';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/service/function/product.service';
import { EventService } from 'src/service/function/event.service';
import { ItemOrder } from 'src/app/class/item-order';

@Component({
  selector: 'app-bag-page',
  templateUrl: './bag-page.component.html',
  styleUrls: ['./bag-page.component.scss']
})
export class BagPageComponent implements OnInit {
  BagItem=[];
  bag=[];
  type='cart';
  orderCus=[];
  orderAuc=[];
  code='';
  maCode=false;
  id=0;
  IDColapp;
  itemOrder:ItemOrder= new ItemOrder();
  constructor(private eventservice: EventService,
              private productservice: ProductService,
              private toastr: ToastrService,
              private loginservice:LoginService
    ) { }

  ngOnInit() {
    this.maCode=false;
    const date = new Date();
    const dateSendingToServer = new DatePipe('en-US').transform(date, 'yyyy/MM/dd hh:mm:ss');
    this.BagItem=[];
    this.bag= JSON.parse(window.localStorage.getItem('itemsBag'));
    console.log(this.bag)
   if(this.bag!=null){
    this.bag.forEach(x=>{
      this.productservice.getItem(JSON.stringify(x.ID_Product)).subscribe(res=>{
        console.log(res.data[0]);
        let items={
          "Category":res.data[0].Catefory1,
          'ID_Shop':res.data[0].ID_Shop,
          'ID_Product':res.data[0].ID_Product,
          'MaID':res.data[0].ID_Product,
          'Name_Product':res.data[0].Name_Product,
          'price':res.data[0].Price,
          'Img1':res.data[0].Img1,
          'Img2':res.data[0].Img2,
          'time':dateSendingToServer,
          'Transport':'GHN',
          'Status':1,
          'Sale':res.data[0].Sale,
          'Charity':res.data[0].Charity,
          'Number':x.Amount,
          'ID_Customer':window.localStorage.getItem('ID'),
        }
        this.BagItem.push(items);
      })

    });
   }
    let cus={
      ID_Customer:window.localStorage.getItem('ID'),
    }
    console.log(cus)
    this.productservice.getItemOrderCus(JSON.stringify(cus)).subscribe(res=>{
      let Cus=[];
      Cus=res.data;
      console.log(res)
      Cus.forEach(x=>{
        if(x.ID_Product.slice(0,2)=='SP'){
          this.orderCus.push(x);
        }else{
          if(x.ID_Product.slice(0,2)=='AT'){
            this.orderAuc.push(x);
          }
        }
      })
      // this.orderCus=res.data;
       console.log(this.orderCus)
    })
    this.productservice.watcher.subscribe(res=>{
      this.BagItem=[];
    this.bag= JSON.parse(window.localStorage.getItem('itemsBag'));
    console.log(this.bag)
    this.bag.forEach(x=>{
      this.productservice.getItem(JSON.stringify(x.ID_Product)).subscribe(res=>{
        console.log(res.data[0]);
        let items={
          "Category":res.data[0].Catefory1,
          'ID_Shop':res.data[0].ID_Shop,
          'ID_Product':res.data[0].ID_Product,
          'MaID':res.data[0].ID_Product,
          'Name_Product':res.data[0].Name_Product,
          'price':res.data[0].Price,
          'Img1':res.data[0].Img1,
          'Img2':res.data[0].Img2,
          'time':dateSendingToServer,
          'Transport':'GHN',
          'Status':1,
          'Sale':res.data[0].Sale,
          'Charity':res.data[0].Charity,
          'Number':x.Amount,
          'ID_Customer':window.localStorage.getItem('ID'),
        }
        this.BagItem.push(items);
      })

    })
    this.productservice.getItemOrderCus(JSON.stringify(cus)).subscribe(res=>{
      let Cus=[];
      this.orderCus=[];
      this.orderAuc=[];
      Cus=res.data;
      Cus.forEach(x=>{
        if(x.ID_Product.slice(0,2)=='SP'){
          this.orderCus.push(x);
        }else{
          if(x.ID_Product.slice(0,2)=='AT'){
            this.orderAuc.push(x);
          }
        }
      })
      // this.orderCus=res.data;
       //console.log(this.orderCus)
    })
    })
  }

  in(i,img2){
    console.log(i);
    document.getElementById(i).setAttribute('src',img2)
  }
  out(i,img1){
    document.getElementById(i).setAttribute('src',img1)

  }

  restyle(){
    var choose,k;
    choose= document.getElementsByClassName('checker');
    k=choose.length;
    console.log(k);
    for(let i=0;i<k;i++){
      choose[i].style.background="#343a40";
      //choose[i].style.color="black";
      console.log(choose[i]);
    }
  }
  radioStyle(color,i){
    switch (color) {
      case 'yellow':
        this.restyle();
        document.getElementById(`lbtrigger${i}`).style.background="yellow";
        document.getElementById(`lbtrigger1${i}`).style.color="blue";
        document.getElementById(`lbtrigger2${i}`).style.color="white";
        document.getElementById(`lbtrigger${i}`).style.color="red";
        break;
      case 'blue':
        this.restyle();
        document.getElementById(`lbtrigger1${i}`).style.background="blue";
        document.getElementById(`lbtrigger1${i}`).style.color="white";
        document.getElementById(`lbtrigger${i}`).style.color="yellow";
        document.getElementById(`lbtrigger2${i}`).style.color="white";
        break;
      case 'white':
        this.restyle();
        document.getElementById(`lbtrigger2${i}`).style.background="white";
        document.getElementById(`lbtrigger2${i}`).style.color="red";
        document.getElementById(`lbtrigger1${i}`).style.color="blue";
        document.getElementById(`lbtrigger${i}`).style.color="yellow";
        break;
      default:
        break;
    }

  }
  Order(data,i,price){
    console.log(price)
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      text+='OD-';
      for (let i = 0; i < 5; i++){text +=possible.charAt(Math.floor(Math.random() * possible.length));}
      data.id=text;
    //   console.log(data);
     if(price==1){
      data.price=data.price*data.Number-data.price*data.Number*data.Sale/100+data.price*data.Number*10/100;
     }
     else{
      data.price=data.price*data.Number-data.price*data.Number*data.Sale/100+data.price*data.Number*10/100-data.price*data.Number*15/100;
     }
     console.log(data);

    this.productservice.createOrders(JSON.stringify(data)).subscribe(res=>{
      this.toastr.success('Buy'+data.Name_Product+' success!', 'Buy Success!');
      this.bag.splice(i,1);
      window.localStorage.setItem("itemsBag", JSON.stringify(this.bag));
      window.localStorage.setItem("lengthBag", this.bag.length.toString());
      this.productservice.changeMessage(this.bag.length);
      let shop={
        ID_Shop:data.ID_Shop
      }
      let check=[];
      console.log(shop);
      this.eventservice.getListCustomerID(JSON.stringify(shop)).subscribe(res=>{
        console.log(res);
        if(res==null){
          check=[];
        }
        else{
          res.data.forEach(element => {
            console.log(element.MaCU);
            if(element.MaCU===window.localStorage.getItem('ID')){
              check.push(element);
            }
        });
        }
        if(check.length===0){
            let user={
              'username':window.sessionStorage.getItem('user')
            }
            this.loginservice.getInfoUser(JSON.stringify(user)).subscribe(res=>{
              let cus={
                'MaCU':window.localStorage.getItem('ID'),
               'Username':res.data[0].Username,
                'Point':0,
                'Address':'da nang',
                'Phone':res.data[0].Phone,
                'CustomerType':'basic',
                'ID_Shop':shop.ID_Shop
              }
              this.eventservice.createCUS(JSON.stringify(cus)).subscribe(res=>{
                console.log(res);
              })

            })

        }
      })
      if(this.code!=''){
      let updateDis={
        Status:'Used',
        Discount:this.code
      }
      console.log(updateDis )
      this.eventservice.updateDis(JSON.stringify(updateDis)).subscribe(res=>{
        console.log(res)
      })
     }
      this.formMail(data);
      this.productservice.update();
    },
    err=>{
      this.toastr.error('Buy'+data.Name_Product+' error!', 'Buy error!');
    }
   )
  }
  add(x){
    if(x==1){
      document.getElementById('a').classList.add('element');
      document.getElementById('b').classList.add('element1');
      document.getElementById('a').classList.remove('element1');
      document.getElementById('b').classList.remove('element');
    }
    if(x==2){
      document.getElementById('a').classList.remove('element');
      document.getElementById('a').classList.add('element1');
      document.getElementById('b').classList.remove('element1');
      document.getElementById('b').classList.add('element');
    }
  }
  change(x){
    if(x==1){
      this.type='cart';
    }
    if(x==2){
      this.type='auctions';
    }
    if(x==3){
      this.type='orders';
    }
  }
  delete(x,y){
    let k=[];

      //const element = this.bag;



      for (let i = 0; i < this.bag.length; i++) {
        const element = this.bag[i];
        console.log(this.bag[i])
        if(element.ID_Product==x.ID_Product && element.Amount==x.Number){
              k.push(i);
        }

      }
      if(k.length>1){
        this.bag.splice(k[k.length-1],1);
      }
      if(k.length==1){
        this.bag.splice(k[0],1);
      }
      window.localStorage.setItem('itemsBag',JSON.stringify(this.bag));
      window.localStorage.setItem('lengthBag',this.bag.length.toString());
      this.productservice.changeMessage(this.bag.length);
      this.productservice.update();
  }

  formMail(x){
    let content='<div style="background: darkgray;">'
  +'<h1 style="text-align: center;color: crimson;">Infor order of you</h1>'
  +'<div style=" display: flex">'
      +'<table style="border-collapse: collapse;width: 100%;  background: burlywood;">'
          +'<tr style="background: cornflowerblue; color: cornsilk;">'
            +'<td style="text-align: left;padding: 8px;">ID Order:</td>'
            +`<td style="text-align: left;padding: 8px;">${x.id}</td>`
          +'</tr>'
          +'<tr>'
              +'<td style="text-align: left;padding: 8px;">Name prodct:</td>'
              +`<td style="text-align: left;padding: 8px;">${x.Name_Product}</td>`
          +'</tr>'
          +'<tr style="background: cornflowerblue; color: cornsilk;">'
              +`<td style="text-align: left;padding: 8px;">Price:</td>`
              +`<td style="text-align: left;padding: 8px;">${x.price}</td>`
          +'</tr>'
          +'<tr>'
              +'<td style="text-align: left;padding: 8px;">img:</td>'
             // +`<img src="${{x.Img1}">`
              +`<td style="text-align: left;padding: 8px;"><img style="width: 100px;height: 100px;object-fit: cover;" src="${x.Img1}"></td>`
         + '</tr>'

          +'<tr  style="background: cornflowerblue; color: cornsilk;">'
              +'<td style="text-align: left;padding: 8px;">ID Shop:</td>'
              +`<td style="text-align: left;padding: 8px;">${x.Shop}</td>`
              +`</tr>`
          +`<tr>`
              +`<td style="text-align: left;padding: 8px;">Number:</td>`
              +`<td style="text-align: left;padding: 8px;">${x.Number}</td>`
            +`</tr>`
          + ` <tr  style="background: cornflowerblue; color: cornsilk;">`
                +`<td style="text-align: left;padding: 8px;">Transport:</td>`
               + `<td style="text-align: left;padding: 8px;">${x.Transport}</td>`
            +`</tr>`
            +`<tr>`
                +`<td style="text-align: left;padding: 8px;">Time:</td>`
                +`<td style="text-align: left;padding: 8px;">${x.time}</td>`
              +`</tr>`
              +`<tr style="background: cornflowerblue; color: cornsilk;>`
                +`<td style="text-align: left;padding: 8px;">You charitied:</td>`
                +`<td style="text-align: left;padding: 8px;">${x.Charity}% of price</td>`
              +`</tr>`
       + `</table>`
  +`</div>`
+`</div>`;
    console.log(content);
    let sms={
      To:'bachmatri1@gmail.com',
      Content:content,
      Subject:'Confirm infor orders'
    }
    this.eventservice.createMail(JSON.stringify(sms)).subscribe(res=>{

    })
  }
  codeDIS(id){
    console.log(this.code);
    let code={
      Discount:this.code
    }
    document.getElementById('enterCode'+id).setAttribute('disabled','disabled');
    this.eventservice.getDisID(JSON.stringify(code)).subscribe(res=>{
      console.log(res)
      if(res.data[0].Status=="Not used yet"){
        this.maCode=true;
        console.log(this.maCode);
        this.toastr.success('Add code success','Let`s buy now')
        this.id=id;
      }
      else{
        this.maCode=false;
        this.id=0;
        this.toastr.error('Code used','Please enter code again')
      }
    })
  }
  collap(i){
    this.code='';
    console.log(this.IDColapp);
    if(this.IDColapp!=undefined && this.IDColapp!=i){
      document.getElementById('en'+this.IDColapp).classList.remove('show');
    }

    this.IDColapp=i;
  }
}
