import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/service/function/categoty.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss']
})
export class AddProductsComponent implements OnInit {
  check=true;
  listCategory;
  nameProduct;
  listChild=[];
  bread1;
  bread2;
 // listChilds=[];
  empty=false;
  constructor(private categoryservice:CategoryService) { }

  ngOnInit() {
    this.categoryservice.getList().subscribe(res=>{
      this.listCategory=res.data;
    })
  }
  add(){
    this.check=!this.check;
    let data= {
      nameProduct: this.nameProduct,
      bread1:this.bread1,
      bread2:this.bread2
    }
    window.sessionStorage.setItem('newItem',JSON.stringify(data));
  }
  getCategoryChild(idDM,i){
    this.bread1= document.getElementById(i).textContent;
    for (let k = 0; k < document.getElementsByClassName("parent")[0].getElementsByTagName('li').length; k++) {
      document.getElementsByClassName("parent")[0].getElementsByTagName('li')[k].style.background="white"
    }
    document.getElementById(i).style.background="aqua";
    this.listChild=[];
    this.listCategory.forEach(el => {
      if(el.parent_id==idDM){
        this.listChild.push(el);
      }
    });
    if(this.listChild.length<=1){
      this.empty=false;
    }
    else{
      this.empty=true;
    }
  }
  getCategoryChild1(idDM,i){
    this.bread2= document.getElementById(i).textContent;
    for (let k = 0; k < document.getElementsByClassName("child")[0].getElementsByTagName('li').length; k++) {
      document.getElementsByClassName("child")[0].getElementsByTagName('li')[k].style.background="white"
    }
    document.getElementById(i).style.background="aqua";
  }
}
