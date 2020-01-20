import { CharityFundService } from './../../../../service/function/charity-fund.service';
import { LoginService } from './../../../../service/function/login.service';
import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/service/function/event.service';
import { ProductService } from 'src/service/function/product.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss']
})
export class DashboardAdminComponent  implements OnInit {
  announce=[];
  order=[];
  listUser=[];
  MoneyInput=[];
  listProducts=[];
  ListPlace=[];
  AllINPut=0;
  MoneyOutput=0;
  info={
    "ID_Shop": "",
    "NameShop": "",
    "Address": "",
    "Introduce": "",
    "Mail": "",
    "Phone": "",
    "Link": ""
  };
  constructor(private announceService: EventService,
              private eventService: EventService,
              private productservice:ProductService,
              private loginservice:LoginService,
              private charityFund:CharityFundService
    ) { }

  ngOnInit() {
    let shop={
      "ID_Shop": window.localStorage.getItem('ID')
    }
    this.loginservice.getListUser().subscribe(data=>{
      this.listUser=data.data;
    });
    this.productservice.getProd().subscribe(data=>{
      this.listProducts=data.data;
    });
    this.eventService.getPlace().subscribe(res=>{
      console.log(res);
      this.ListPlace=res.data;
    })
    this.charityFund.getFund().subscribe(res=>{
      if(res!=null){
        for (let i = 0; i < res.data.length; i++) {
          if(res.data[i].Status==='1'){
            this.MoneyInput.push(res.data[i])
          }
        }
        for (let k = 0; k < this.MoneyInput.length; k++) {
          this.AllINPut+=parseInt(this.MoneyInput[k].Money);
        }
      }

    })
    this.announceService.getAnounceID(JSON.stringify(shop)).subscribe(res=>{
       if(res != null){
        this.announce=res.data;
        console.log(this.announce)
        for (let index = 0; index < this.announce.length; index++) {

              let a={
                "ID_Shop":window.localStorage.getItem('ID'),
                "id":parseInt(this.announce[index].id)
              }
              console.log(a)
              this.productservice.getItemOrder(JSON.stringify(a)).subscribe(res=>{
                this.order.push(res.data[0]);
                console.log(res);
              })
        }
       }
    })

    this.eventService.getInfoID(JSON.stringify(shop)).subscribe(res=>{
       if(res!=null){
        this.info=res.data[0];
        console.log(this.info)
       }
    })
  }

  updateInfo(){
    console.log(this.info);
    this.eventService.updateInFoShop(JSON.stringify(this.info)).subscribe(res=>{
      console.log(res);
    })
}
}
