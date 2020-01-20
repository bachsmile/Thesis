import { CharityFundService } from './../../../../../service/function/charity-fund.service';
import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { ProductService } from 'src/service/function/product.service';
import { EventService } from 'src/service/function/event.service';
import { DatePipe } from '@angular/common';
import { Announce } from 'src/app/class/announce';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.scss']
})
export class AllOrdersComponent implements OnInit {
  searchId;
  type_order;
  listOrder;
  listSearch=[];
  Status1 = [];
  Status2 = [];
  Status2_1=[];
  Status2_2=[];
  Status3 = [];
  Status4 = [];
  Status5 = [];
  Status6 = [];
  Status6_1 = [];
  Status6_2 = [];
  Status6_3 = [];
  announce:Announce;

  @Input() signalReturn;
  now;
  dateStart;
  dateEnd;
  IDshop;
  constructor(private productservice: ProductService,
              private charityFundService:CharityFundService,
              private eventservice:EventService
    ) { }

  ngOnInit() {
    let shop={
      ID_Shop: window.localStorage.getItem('ID')
    }
    this.IDshop=shop;
    if (this.signalReturn) {
        document.getElementById('Return').click();
      }

    const date = new Date();
    const dateSendingToServer = new DatePipe('en-US').transform(date, 'yyyy-MM-dd ');
    this.now = dateSendingToServer;
    this.dateStart=dateSendingToServer;
    this.dateEnd=dateSendingToServer;
    this.productservice.getListOrderID(JSON.stringify(this.IDshop)).subscribe(res => {
      this.listOrder = res.data;
      console.log(this.listOrder)
      res.data.forEach(element => {
        if (element.Status == '1') {
          this.Status1.push(element);
        }
        if (element.Status == '2') {
          this.Status2.push(element);
          this.Status2_1.push(element);
        }
        if (element.Status == '2.1') {
          this.Status2.push(element);
          this.Status2_2.push(element);
        }
        if (element.Status == '3') {
          this.Status3.push(element);
        }
        if (element.Status == '4') {
          this.Status4.push(element);
        }
        if (element.Status == '5') {
          this.Status5.push(element);
        }
        if (element.Status == '6') {
          this.Status6.push(element);
          this.Status6_1.push(element);
        }
        if (element.Status == '6.1') {
          this.Status6.push(element);
          this.Status6_2.push(element);
        }
        if (element.Status == '6.3') {
          this.Status6.push(element);
          this.Status6_3.push(element);
        }
      });
    });
    this.productservice.watcher.subscribe(data => {
        this.Status1 = [];
        this.Status2 = [];
        this.Status2_1=[];
        this.Status2_2=[];
        this.Status3 = [];
        this.Status4 = [];
        this.Status5 = [];
        this.Status6 = [];
        this.Status6_1 = [];
        this.Status6_2 = [];
        this.Status6_3 = [];
        this.productservice.getListOrderID(JSON.stringify(this.IDshop)).subscribe(res => {
        this.listOrder = res.data;
        res.data.forEach(element => {
          if (element.Status == '1') {
            this.Status1.push(element);
          }
          if (element.Status == '2') {
            this.Status2.push(element);
            this.Status2_1.push(element);
          }
          if (element.Status == '2.1') {
            this.Status2.push(element);
            this.Status2_2.push(element);
          }
          if (element.Status == '3') {
            this.Status3.push(element);
          }
          if (element.Status == '4') {
            this.Status4.push(element);
          }
          if (element.Status == '5') {
            this.Status5.push(element);
          }
          if (element.Status == '6') {
            this.Status6.push(element);
            this.Status6_1.push(element);
          }
          if (element.Status == '6.1') {
            this.Status6.push(element);
            this.Status6_2.push(element);
          }
          if (element.Status == '6.3') {
            this.Status6.push(element);
            this.Status6_3.push(element);
          }
        });
      });
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    // Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    // Add '${implements OnChanges}' to the class.

  }
  typeChooses(data) {
    this.type_order = data;
    const a = document.getElementsByClassName('top-card')[0].getElementsByTagName('li');
    for (let i = 0; i < a.length; i++) {
      a[i].classList.remove('border-bottom-red');
    }
    document.getElementById(data).classList.add('border-bottom-red');
    this.productservice.update();
  }

  sent(data) {
    if(data.Status==='4'){
      console.log('success');
      console.log(this.datetime())
    }
    if(data.Status==='3'){
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
    if(data.Status==='1' ||data.Status==='3'){
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
        'Status': (data.Status <4) ? (++data.Status) : data.Status,
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
    if(data.Status==='2'){
      console.log('true')
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
        'Status': '2.1',
        'Transport': data.Transport,
        'Charity':parseInt(data.Charity),
        'ID_Shop':data.ID_Shop,
        'ID_Customer':data.ID_Customer
      };
      console.log(items);
      //this.productservice.update();
      this.productservice.upOrder(JSON.stringify(items)).subscribe(res => {
        console.log(res);
        this.productservice.update();
      });
    }
    if(data.Status==='2.1'){
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
        'Status': '3',
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
    if(data.Status==='6'){
      console.log('true')
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
        'Status': '6.3',
        'Transport': data.Transport,
        'Charity':parseInt(data.Charity),
        'ID_Shop':data.ID_Shop,
        'ID_Customer':data.ID_Customer
      };
      console.log(items);
      //this.productservice.update();
      this.productservice.upOrder(JSON.stringify(items)).subscribe(res => {
        console.log(res);
        this.productservice.update();
      });
    }
  }
  datetime(){
    const date = new Date();
    const dateSendingToServer = new DatePipe('en-US').transform(date, 'yyyy/MM/dd hh:mm:ss');
    return dateSendingToServer;
  }
  deleteOr(id){
      console.log(id);
      this.productservice.deleteOrder(JSON.stringify(id)).subscribe(res => {
        console.log(res);
        this.productservice.update();
      });
  }
  Search(e,data){
    console.log(data)
    if(this.searchId==''){
      this.listSearch=[]
    }
    else{
      if(data=='0'){
        this.productservice.getListOrderID(JSON.stringify(this.IDshop)).subscribe(x=>{
          this.listSearch=x.data;
          for (let i = 0; i < this.listSearch.length; i++) {
            if ((this.listSearch[i].id.toUpperCase().indexOf(this.searchId.toUpperCase()) <= -1)) {
              console.log((this.listSearch[i].Status!=data));
              console.log(this.listSearch[i].Status)
            this.listSearch.splice(i, 1);
              i--;
            }
          }
          console.log(this.listSearch)
        })
      }
      else{
        this.productservice.getListOrderID(JSON.stringify(this.IDshop)).subscribe(x=>{
          this.listSearch=x.data;
          for (let i = 0; i < this.listSearch.length; i++) {
            if ((this.listSearch[i].id.toUpperCase().indexOf(this.searchId.toUpperCase()) <= -1) || (this.listSearch[i].Status!=data)) {
              console.log((this.listSearch[i].Status!=data));
              console.log(this.listSearch[i].Status)
            this.listSearch.splice(i, 1);
              i--;
            }
          }
          console.log(this.listSearch)
        })
      }
    }
  }

  stringToDate(str:string){
    let date={
      Year:0,
      Month:0,
      Date:0,
    }
    date.Year= parseInt(str.slice(0,4));
    date.Month=parseInt(str.slice(5,7));
    date.Date=parseInt(str.slice(8,10));
    return date;
  }
  searchDate(e,data){
    let dateSt=this.stringToDate(this.dateStart);
    let dateEd=this.stringToDate(this.dateEnd);
    console.log(this.dateStart);
    this.productservice.getListOrderID(JSON.stringify(this.IDshop)).subscribe(x=>{
      this.listSearch=x.data;
      for (let i = 0; i < this.listSearch.length; i++) {
        // if (this.listSearch[i].id.toUpperCase().indexOf(this.searchId.toUpperCase()) <= -1) {
        // this.listSearch.splice(i, 1);
        //   i--;
        // }
        let t=this.stringToDate(this.listSearch[i].time);
        if(this.CheckTime(t,dateSt,dateEd)==0){
            this.listSearch.splice(i, 1);
            i--;
        }
        console.log(this.CheckTime(t,dateSt,dateEd));
          console.log(this.listSearch);
      }
    })
  }
  CheckTime(x,y,z){
      if(y.Year<z.Year && y.Month<z.Month && y.Date<z.Date){
        return 0;
      }
      if((x.Year>=y.Year && x.Month>=y.Month && x.Date>=y.Date)&&(x.Year<=z.Year && x.Month<=z.Month && x.Date<=z.Date)){
        return 1;
      }
      else{
        return 0;
      }
  }
}
