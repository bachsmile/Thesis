import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/service/function/product.service';
import { EventService } from 'src/service/function/event.service';
import { Product } from 'src/app/class/product';

@Component({
  selector: 'app-shop-item',
  templateUrl: './shop-item.component.html',
  styleUrls: ['./shop-item.component.scss']
})
export class ShopItemComponent implements OnInit {
  shop={
    ID_Shop:window.localStorage.getItem('ID')
  }
  items: Product[] = [];
  idAdd: string;
  bag=[];
  id;
  Math:Math;
  active=0;
  Pagination=[];
  check1: boolean = true;
  @Output() lenghtBag= new EventEmitter();
  constructor(private productService:ProductService,
              private eventservice:EventService,
              private route: ActivatedRoute
    ) { }

  ngOnInit() {
    document.documentElement.scrollTop=0;
    this.route.paramMap.subscribe(params => {
      this.id= this.route.snapshot.paramMap.get('id');
      this.productService.update();
    });
    this.id= this.route.snapshot.paramMap.get('id');
    let arr=[];

    if (JSON.parse(window.localStorage.getItem("itemsBag")) !== null) {
      this.bag = JSON.parse(window.localStorage.getItem("itemsBag"));
    }
    window.sessionStorage.setItem("lengthBag", this.bag.length.toString());
    this.productService.getProd().subscribe(res=>{
      this.items=[];
      res.data.forEach(x=>{
        if(x.Display=='show'){
          arr.push(x);
          console.log('a')

        }
      })
      //arr=res.data;
      arr.forEach(x=>{
       // console.log(x);
        x.Price=parseInt(x.Price);
        x.Sale=parseInt(x.Sale);
        if(x.Catefory1==this.id){
          this.items.push(x);
        }
        else{
          if(x.Catefory2==this.id){
            this.items.push(x);
          }
        }

      });
      this.divPage();

    //  this.items=res.data;
    })
    this.productService.watcher.subscribe(res=>{
      if (JSON.parse(window.localStorage.getItem("itemsBag")) !== null) {
        this.bag = JSON.parse(window.localStorage.getItem("itemsBag"));
      }
      window.sessionStorage.setItem("lengthBag", this.bag.length.toString());
      this.productService.getProd().subscribe(res=>{
        this.items=[];
        arr=res.data;
        arr.forEach(x=>{
          x.Price=parseInt(x.Price);
        x.Sale=parseInt(x.Sale);
          if(x.Catefory1==this.id){
            this.items.push(x);
          }
          else{
            if(x.Catefory2==this.id){
              this.items.push(x);
            }
          }

        });
        this.divPage();
      //  this.items=res.data;
      })
    });

  }
  in(i,img2){
    console.log(i);
    document.getElementById(i).setAttribute('src',img2)
  }
  out(i,img1){
    document.getElementById(i).setAttribute('src',img1)

  }
  check(item): boolean {
    let value1;
    if (this.bag == null) {
      value1 = 0;
    } else {
      value1 = this.bag.filter(i => {
        return i.ID_Product == item.ID_Product;
      });
    }
    return value1.length > 0 ? true : false;
  }

  addBag(item1) {
    if (this.check(item1)) {
      this.idAdd = item1.ID_Product;
      console.log(this.idAdd);
      this.check1 = false;
    } else {
      this.pushBag(item1);
      this.check1 = true;
      window.localStorage.setItem("itemsBag", JSON.stringify(this.bag));
      window.localStorage.setItem("lengthBag", this.bag.length.toString());
      this.createMessage(this.bag.length);
      this.productService.update();
    }
  }
  pushBag(val) {
    this.bag.push({
      ID_Product: val.ID_Product,
      Amount: 1
    });
  }
  clearBag() {
    window.sessionStorage.removeItem("itemsBag");
  }
  icreaseItem(id) {

    for (const i in this.bag) {

      if(this.bag[i].ID_Product===id){
        this.bag[i].Amount++
        window.localStorage.setItem("itemsBag", JSON.stringify(this.bag));
        break;
      }

     }
  }


  divItem(id) {
    console.log(id)
      this.productService.getItem(JSON.stringify(id)).subscribe(data=>{
        console.log(data.data);
        this.pushBag(data.data[0] );
        this.bag.sort((a,b)=>a.id-b.id);
        console.log(this.bag);
        window.localStorage.setItem("lengthBag", this.bag.length.toString());
        this.createMessage(this.bag.length);
        window.localStorage.setItem("itemsBag", JSON.stringify(this.bag));
        this.productService.update();
      })
  }

  public opened = true;

    public close(status) {
      console.log(`Dialog result: ${status}`);
      this.opened = false;
    }

    public open() {
      this.opened = true;
    }
    createMessage(message) {
      this.productService.changeMessage(message);
    }
    divPage(){
      this.Pagination=[];
      console.log(this.items)
      let a=Math.ceil( this.items.length/8);
      let b=[];
      let c=this.items;
      let i = 0;
      let e=8;
      for (let k = 0; k < a; k++) {
        if(e<=c.length){
          for ( i; i < e; i++) {
            b.push(c[i]);
          }
          this.Pagination.push(b);
          e+=8;
          b=[];
        }else{
          e=c.length;
          for ( i; i < e; i++) {
            b.push(c[i]);
          }
          this.Pagination.push(b);
        }
      }
      console.log(this.Pagination);
    };
    page(i){
      this.active=i;
      document.documentElement.scrollTop=0;
    }
}
