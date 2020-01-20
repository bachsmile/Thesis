import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/service/function/event.service';
import { ProductService } from 'src/service/function/product.service';

@Component({
  selector: 'app-dashboard-management',
  templateUrl: './dashboard-management.component.html',
  styleUrls: ['./dashboard-management.component.scss']
})
export class DashboardManagementComponent implements OnInit {
  announce=[];
  order=[];
  listProd=[];
  listOrder=[];
  listAuc=[];
  listCus=[];
  mail={
    'To':'',
    'Content':'',
    'Subject':''
  }
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
              private toask: ToastrService
    ) { }

  ngOnInit() {
    let shop={
      "ID_Shop": window.localStorage.getItem('ID')
    }
    this.announceService.getAnounceID(JSON.stringify(shop)).subscribe(res=>{
       if(res!=null){
        this.announce=res.data;
        console.log(this.announce)
        for (let index = 0; index < this.announce.length; index++) {

              let a={
                "ID_Shop":window.localStorage.getItem('ID'),
                "id":this.announce[index].id
              }
              console.log(a)
              this.productservice.getItemOrder(JSON.stringify(a)).subscribe(res=>{
                this.order.push(res.data[0]);
                console.log(res);
              })
      }
       }
      console.log(res)
    })

    this.eventService.getInfoID(JSON.stringify(shop)).subscribe(res=>{
       if(res!=null){
        this.info=res.data[0];
        console.log(this.info)
       }
    });

    this.productservice.getListOrderID(JSON.stringify(shop)).subscribe(res=>{
        if(res!=null){
          this.listOrder=res.data;
        }
    });
    this.productservice.getProdID(JSON.stringify(shop)).subscribe(res=>{
      if(res!=null){
        this.listProd=res.data
      }
    });
    this.eventService.getListCustomerID(JSON.stringify(shop)).subscribe(res=>{
      if(res!=null){
        this.listCus=res.data;
      }
    });
    let shop1={
      Shop:window.localStorage.getItem('ID')
    }

    this.productservice.getAucrionID(JSON.stringify(shop1)).subscribe(res=>{
      if(res!=null){
        this.listAuc=res.data;
        console.log(this.listAuc)
      }
    })
  }
  updateInfo(){
      console.log(this.info);
      this.eventService.updateInFoShop(JSON.stringify(this.info)).subscribe(res=>{
        console.log(res);
      })
  }
  sentMail(){
    console.log(this.mail);
    this.eventService.createMail(JSON.stringify(this.mail)).subscribe(res=>{
      //console.log(res);
    })
    this.toask.success('Sent mail, please check your mail')
  }
}
