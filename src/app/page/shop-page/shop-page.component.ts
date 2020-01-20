import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/service/function/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shop-page',
  templateUrl: './shop-page.component.html',
  styleUrls: ['./shop-page.component.scss']
})
export class ShopPageComponent implements OnInit {
  slides=[];

  constructor( private productservice:ProductService, private route: ActivatedRoute,
    ) { }

  ngOnInit() {
    document.documentElement.scrollTop=0
      this.productservice.getProd().subscribe(res=>{
        this.slides=res.data;
    });

  }
  slideConfig = {"dots": true,"infinite": true,"slidesToShow": 5, "slidesToScroll": 1,"autoplay": true,"autoplaySpeed": 2000,"responsive": [
    {
      breakpoint: 768,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 3
      }
    },
    {
      breakpoint: 480,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 1
      }
    }
  ]
};

  addSlide() {
    this.slides.push({img: "http://placehold.it/350x150/777777"})
  }

  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }

  slickInit(e) {
    console.log('slick initialized');
  }

  breakpoint(e) {
    console.log('breakpoint');
  }

  afterChange(e) {
    console.log('afterChange');
  }

  beforeChange(e) {
    console.log('beforeChange');
  }
  Load(){
    this.productservice.update();
  }

}
