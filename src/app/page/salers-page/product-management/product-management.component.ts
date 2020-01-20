import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/service/function/product.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss']
})
export class ProductManagementComponent implements OnInit {
  type_order: string;

  listPro=[];
  listPros=[];
  listInStock=[];
  listSoldOut=[];
  lishHide=[];
  dataSearch;
  categorySearch;
  priceStart=0;
  priceEnd=this.priceStart;
  wareHoseStart;
  wareHoseEnd=this.wareHoseStart;
  product= new FormControl('');
  shop={
    ID_Shop:window.localStorage.getItem('ID')
  }
  constructor(private productservice:ProductService) { }

  ngOnInit() {
    document.onmousemove=e => {

      let x = e.clientX;
      let y = e.clientY;

      let windowWidth = window.innerWidth;
      let windowHeight = window.innerHeight;
      let mouseXpercentage = Math.round(e.pageX / windowWidth * 100);
      let mouseYpercentage = Math.round(e.pageY / windowHeight * 100);

  }
  document.getElementById('load1').style.display='block';
  document.getElementById('admin1').style.display='none';
  setTimeout(function(){
    document.getElementById('load1').style.display='none';
    document.getElementById('admin1').style.display='block';
  }, 1000);

    this.productservice.getProdID(JSON.stringify(this.shop)).subscribe(res=>{
      this.listPro=res.data;
      this.listPros= this.listPro;
      for (let i = 0; i < this.listPros.length; i++) {
            if( this.listPros[i].Display==='hide'){
              this.lishHide.push(this.listPros[i]);
            }
            if(this.listPros[i].Warehose>0){
              this.listInStock.push(this.listPros[i]);
            }
            else{
              this.listSoldOut.push(this.listPros[i]);
            }
        }
    })
    this.productservice.watcher.subscribe(data=>{

      this.listInStock=[];
      this.listSoldOut=[];
      this.lishHide=[];
      this.productservice.getProdID(JSON.stringify(this.shop)).subscribe(res=>{
        this.listPro=res.data;
        this.listPros= this.listPro;
        for (let i = 0; i < this.listPros.length; i++) {
              if( this.listPros[i].Display==='hide'){
                this.lishHide.push(this.listPros[i]);
              }
              if(this.listPros[i].Warehose>0){
                this.listInStock.push(this.listPros[i]);
              }
              else{
                this.listSoldOut.push(this.listPros[i]);
              }
          }
      })
    })

  }
  typeChooses(data){
    this.type_order = data;
    let a=document.getElementsByClassName("top-card")[0].getElementsByTagName('li');
    for (let i = 0; i < a.length; i++) {
      a[i].classList.remove('border-bottom-red');
    }
    document.getElementById(data).classList.add('border-bottom-red');
  }
  chagePrice(){
    if(this.priceStart>this.priceEnd){
      this.priceEnd=this.priceStart;
    }
  }
  chageWareHose(){
   console.log(this.wareHoseEnd)
    if(this.wareHoseStart>this.wareHoseEnd || (this.wareHoseStart>=0 && this.wareHoseEnd===undefined)||(this.wareHoseStart===undefined && this.wareHoseEnd>=0)){
      this.wareHoseEnd=this.wareHoseStart;
    }
  }
  Retype(){
      this.dataSearch='';
      this.wareHoseStart=null;
      this.wareHoseEnd=this.wareHoseStart;
      this.priceStart=0;
      this.priceEnd=0;
  }
  find(data){
    this.listPros= this.listPro;
    this.productservice.update();
    setTimeout(() => {
      //nếu thẻ tìm bằng text khác rỗng
      if(this.dataSearch!=undefined){
        for (let i = 0; i < this.listPros.length; i++) {
          if (this.listPros[i].Name_Product.toUpperCase().indexOf(this.dataSearch.toUpperCase()) <= -1) {
            this.listPros.splice(i, 1);
            i--;
          }
        }
      }
      //nếu thẻ find bằng text = rỗng
      if(this.dataSearch==''){
        this.listPros=this.listPro;
      }
      //nếu thẻ tìm bằng seclect có value bằng rỗng hay chưa được chọn
      if(this.product.value !=''){
        for (let i = 0; i < this.listPros.length; i++) {
          if (this.listPros[i].Catefory1.toUpperCase().indexOf(this.product.value.toUpperCase()) <= -1) {
            this.listPros.splice(i, 1);
            i--;
          }
        }
      }
      //nếu ta giá khác 0
      if(this.priceStart>0){
        for (let i = 0; i < this.listPros.length; i++) {
          if (this.listPros[i].Price<this.priceStart  || this.listPros[i].Price>this.priceEnd  ) {
            this.listPros.splice(i, 1);
            i--;
          }
        }
      }
      //newu warehose start >=0
      if(this.wareHoseStart>=0){
        for (let i = 0; i < this.listPros.length; i++) {
          if (this.listPros[i].Warehose<this.wareHoseStart  || this.listPros[i].Warehose>this.wareHoseEnd  ) {
            this.listPros.splice(i, 1);
            i--;
          }
        }
      }
      //mỗi lần find thì tag đó sẽ reset mảng
      if(data==='hide'){
        this.lishHide=[];

      }
      if(data==='stock'){
        this.listInStock=[];

      }
      if(data==='sold'){
        this.listSoldOut=[];

      }
      //Ở tag nào thì find tag đó
      for (let k = 0; k < this.listPros.length; k++) {

          if(data==='hide' && this.listPros[k].Display==='hide'){
            this.lishHide.push(this.listPros[k]);
          }
          if(data==='stock' && this.listPros[k].Warehose>0){
            this.listInStock.push(this.listPros[k]);
          }
          if(data==='sold' && this.listPros[k].Warehose==0){
              this.listSoldOut.push(this.listPros[k]);
            }
         }
    }, 100);
    this.productservice.update();
  }
  display(item,display){
    item.Display=display;
    this.productservice.updateIF(JSON.stringify(item)).subscribe(res=>{
      this.productservice.update();
    })
  }
  deleteItem(id){
    this.productservice.delete(id).subscribe(res=>{
      this.productservice.update();
    })
  }
}
