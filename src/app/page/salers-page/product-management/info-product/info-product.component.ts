import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/service/function/product.service';

@Component({
  selector: 'app-info-product',
  templateUrl: './info-product.component.html',
  styleUrls: ['./info-product.component.scss']
})
export class InfoProductComponent implements OnInit {
  item={
    Img1:'',
    Name_Product:'',
    Price:0,
    Catefory1:'',
    Sale:0,
    Details:'',
    Point:0,
    Trademark:'',
    Material:'',
    Origin:'',
    Warehose:0,
    Charity:0,
    Display:'show',
  };
  constructor(
        private route: ActivatedRoute,
        private router: Router,
        private productserice:ProductService
    ) { }

  ngOnInit() {
    let id;
    id= this.route.snapshot.paramMap.get('id');
    this.productserice.getItem(JSON.stringify(id)).subscribe(res=>{
      this.item=res.data[0];
      console.log(this.item)
    })

    }

}
