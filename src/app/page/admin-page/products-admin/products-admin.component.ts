import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/service/function/product.service';
@Component({
  selector: 'app-products-admin',
  templateUrl: './products-admin.component.html',
  styleUrls: ['./products-admin.component.scss']
})
export class ProductsAdminComponent implements OnInit {
  product=[];
  prod=[];
  constructor(private productservice:ProductService) { }

  ngOnInit() {
    document.onmousemove=e => {
      var x = e.clientX;
      var y = e.clientY;
      var windowWidth = window.innerWidth;
      var windowHeight = window.innerHeight;
      var mouseXpercentage = Math.round(e.pageX / windowWidth * 100);
      var mouseYpercentage = Math.round(e.pageY / windowHeight * 100);
      // document.getElementById('radial-gradient3').setAttribute("style",`background: radial-gradient(at ${mouseXpercentage}%  ${mouseYpercentage}%, red ,#1793b5)`);
   }
   document.getElementById('load3').style.display='block';
   document.getElementById('admin3').style.display='none';
   setTimeout(function(){
     document.getElementById('load3').style.display='none';
     document.getElementById('admin3').style.display='block';
   }, 1000);
    this.productservice.getProd().subscribe(data=>{
      this.product=data.data;
    });

    this.productservice.watcher.subscribe(data=>{
      this.productservice.getProd().subscribe(data=>{
        this.product=data.data;
      })
    })
  }
  deleteProd(id){
    this.productservice.delete(JSON.stringify(id)).subscribe(res=>{
      this.productservice.update();
    });
  }
  sentIdUpdate(i,k){
    this.prod[0]=this.product[i];
    console.log(k)
  }
  addItem(){

  }
  updateDB(){
    this.productservice.update();
  }
  show(value){
    this.product=[];
    this.product=value;
  }
}
