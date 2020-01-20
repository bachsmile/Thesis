import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shop-according-to-gender',
  templateUrl: './shop-according-to-gender.component.html',
  styleUrls: ['./shop-according-to-gender.component.scss']
})
export class ShopAccordingToGenderComponent implements OnInit {
  gender='men';
  data;
  form_brand:{
    link1:string,
    link2:string,
    link3:string,
    img:string,
    lable:string,
    title:string,
    bt1:string,
    bt2:string,
    checkBt:boolean,
    router1:string,
    router2:string
  }
  picture:{
      source1:{
        img1:string,
        img2:string,
        img3:string,
        routerTo:string,
      },
      source2:{
        img1:string,
        img2:string,
        img3:string,
        routerTo:string,
      },
      source3:{
        img1:string,
        img2:string,
        img3:string,
        routerTo:string,
      },
      source4:{
        img1:string,
        img2:string,
        img3:string,
        routerTo:string,
      }
  }
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    let dataMen={
      Brand:'MEN',
      form_brand1:this.form_brand={
       link1:'https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/enUS/Images/running-fw19-ub19-sustain-glp-m-mh-small-runner-d_tcm221-383363.jpg',
       link2:'https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/enUS/Images/running-fw19-ub19-sustain-glp-m-mh-small-runner-t_tcm221-383365.jpg',
       link3:'https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/enUS/Images/running-fw19-ub19-sustain-glp-m-mh-small-runner-m_tcm221-383364.jpg',
       img:'https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/enUS/Images/running-fw19-ub19-sustain-glp-m-mh-small-runner-d_tcm221-383363.jpg',
       lable:'ULTRABOOST 19',
       title:'Comfort, responsiveness, and style. There`s nothing like Ultraboost 19—now in all-new colors.',
       bt1:'SHOP NOW',
       bt2:'LEARN MORE',
       router1:'/Shop/mall/ShoesMen',
       router2:'/Shop/Shop-Gender/men',
       checkBt:false,
      },
      form_brand2:this.form_brand={
       link1:'https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/enUS/Images/football-fw19-hardwired-glp-hp-mh-small-d-combined_tcm221-372882.jpg',
       link2:'https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/enUS/Images/football-fw19-hardwired-glp-hp-mh-small-t-combined_tcm221-372884.png',
       link3:'https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/enUS/Images/football-fw19-hardwired-glp-hp-mh-small-m-combined_tcm221-372883.png',
       img:'https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/enUS/Images/football-fw19-hardwired-glp-hp-mh-small-d-combined_tcm221-372882.jpg',
       lable:'DARE TO CREATE',
       title:'These boots come with some conditions. Take the deal.',
       bt1:'PREVIEW NOW',
       bt2:'EXPLORE',
       router1:'/Shop/mall/ShoesMen',
       router2:'/Shop/Shop-Gender/men',
       checkBt:true,
      },
      form_brand3:this.picture={
          source1:{
            img1:"https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/enUS/Images/4x1_Desktop_Teaser_red_tcm221-379916.jpg",
            img2:"https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/enUS/Images/4x1_M_T_Teaser_red_tcm221-379920.jpg",
            img3:"https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/enUS/Images/4x1_Desktop_Teaser_red_tcm221-379916.jpg",
            routerTo:'/Shop/mall/ShoesMen'
          },
          source2:{
            img1:"https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/enUS/Images/4x1_Desktop_Teaser_blue_tcm221-379914.jpg",
            img2:"https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/enUS/Images/4x1_M_T_Teaser_blue_tcm221-379918.jpg",
            img3:"https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/enUS/Images/4x1_Desktop_Teaser_blue_tcm221-379914.jpg",
            routerTo:'/Shop/mall/ClothesMen'
          },
          source3:{
            img1:'https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/enUS/Images/4x1_Desktop_Teaser_orange_tcm221-379915.jpg',
            img2:'https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/enUS/Images/4x1_M_T_Teaser_orange_tcm221-379919.jpg',
            img3:'https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/enUS/Images/4x1_Desktop_Teaser_orange_tcm221-379915.jpg',
            routerTo:'/Shop/mall/accessoriesMen'
          },
          source4:{
            img1:'https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/enUS/Images/4x1_Desktop_Teaser_yellow_tcm221-379917.jpg',
            img2:'https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/enUS/Images/4x1_M_T_Teaser_yellow_tcm221-379921.jpg',
            img3:"https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/enUS/Images/4x1_Desktop_Teaser_yellow_tcm221-379917.jpg",
            routerTo:'/Shop/mall/menAll'
          }
      }
    };
    let dataWomen={
      Brand:'WOMEN',
    form_brand1:this.form_brand={
     link1:'https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/enUS/Images/running-fw19-ub19-sustain-glp-w-mh-small-runner-d_tcm221-383357.jpg',
     link2:'https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/enUS/Images/running-fw19-ub19-sustain-glp-w-mh-small-runner-t_tcm221-383359.jpg',
     link3:'https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/enUS/Images/running-fw19-ub19-sustain-glp-w-mh-small-runner-m_tcm221-383358.jpg',
     img:'https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/enUS/Images/running-fw19-ub19-sustain-glp-w-mh-small-runner-d_tcm221-383357.jpg',
     lable:'Women Run',
     title:'Comfort, responsiveness, and style. There`s nothing like Ultraboost 19—now in all-new colors.',
     bt1:'SHOP NOW',
     bt2:'LEARN MORE',
     router1:'/Shop/mall/ShoesWomen',
     router2:'/Shop/Shop-Gender/women',
     checkBt:false,
    },
    form_brand2:this.form_brand={
     link1:'https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/enUS/Images/FW19_ADICOLOR_ONSITES_WOMENSGLP_MH-DT_tcm221-365714.jpg',
     link2:'https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/enUS/Images/FW19_ADICOLOR_ONSITES_WOMENSGLP_MH-T_tcm221-365716.jpg',
     link3: 'https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/enUS/Images/FW19_ADICOLOR_ONSITES_WOMENSGLP_MH-M_tcm221-365715.jpg',
     img:'https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/enUS/Images/FW19_ADICOLOR_ONSITES_WOMENSGLP_MH-DT_tcm221-365714.jpg',
     lable:'DARE TO CREATE',
     title:'These boots come with some conditions. Take the deal.',
     bt1:'SHOP NOW',
     bt2:'SHOP ALL ADICOLOR',
     router1:'/Shop/mall/ShoesWomen',
     router2:'/Shop/Shop-Gender/women',
     checkBt:true,
    },
    form_brand3:this.picture={
      source1:{
        img1:"https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/enUS/Images/4x1_teaser_480x480_1_tcm221-378316.jpg",
        img2:"https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/enUS/Images/4x1_teaser_1200x960_1_tcm221-378318.jpg",
        img3:"https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/enUS/Images/4x1_teaser_480x480_1_tcm221-378316.jpg",
        routerTo:'/Shop/mall/ShoesWomen'
      },
      source2:{
        img1:"https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/enUS/Images/4x1_teaser_480x480_2_tcm221-378317.jpg",
        img2:"https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/enUS/Images/4x1_teaser_1200x960_2_tcm221-378319.jpg",
        img3:"https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/enUS/Images/4x1_teaser_480x480_2_tcm221-378317.jpg",
        routerTo:'/Shop/mall/ClothesWomen',
      },
      source3:{
        img1:'https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/enUS/Images/W_GLP_SILHOUETTE_UPDATED_480x480_tcm221-370299.jpg',
        img2:'https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/enUS/Images/W_GLP_SILHOUETTE_UPDATED_480x480_tcm221-370299.jpg',
        img3:'https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/enUS/Images/W_GLP_SILHOUETTE_UPDATED_480x480_tcm221-370299.jpg',
        routerTo:'/Shop/mall/accessoriesWomen'
      },
      source4:{
        img1:'https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/enUS/Images/training-fw19-bras-and-tights-glp-tc-grid-4x1-training2_tcm221-369977.jpg',
        img2:"https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/enUS/Images/training-fw19-bras-and-tights-glp-tc-grid-4x1-training2_tcm221-369977.jpg",
        img3:"https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/enUS/Images/training-fw19-bras-and-tights-glp-tc-grid-4x1-training2_tcm221-369977.jpg",
        routerTo:'/Shop/mall/womenAll'
      }
  }
     };
    let dataKids={
  Brand:'KIDS',
  form_brand1:this.form_brand={
   link1:'https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/enUS/Images/running-fw19-bb-boost-ub19-launch-glp-k-mh-small-1-d_tcm221-383044.jpg',
   link2:'https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/enUS/Images/running-fw19-bb-boost-ub19-launch-glp-k-mh-small-1-t_tcm221-383046.jpg',
   link3:'https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/enUS/Images/running-fw19-bb-boost-ub19-launch-glp-k-mh-small-1-m_tcm221-383045.jpg',
   img:'https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/enUS/Images/running-fw19-bb-boost-ub19-launch-glp-k-mh-small-1-d_tcm221-383044.jpg',
   lable:'ULTRABOOST 19: NEW COLORS',
   title:'Now available: Fresh colors. New energy.',
   bt1:'SHOP NOW',
   bt2:'EXPLORE MORE',
   router1:'/Shop/mall/ShoesKids',
   router2:'/Shop/Shop-Gender/kids',
   checkBt:false,
  },
  form_brand2:this.form_brand={
   link1:'https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/enUS/Images/HP_MH_1920x800_5-2_tcm221-378223.jpg',
   link2: 'https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/enUS/Images/HP_MH_HOC_1200x1000_5_tcm221-377296.jpg',
   link3:'https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/enUS/Images/HP_MH_HOC_800x1000_5_tcm221-377294.jpg',
   img: 'https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/enUS/Images/HP_MH_1920x800_5-2_tcm221-378223.jpg',
   lable:'CLASSICS FOR KIDS',
   title:'Iconic sneakers built for sport, worn for play.',
   bt1:'SHOP GIRLS',
   bt2:'SHOP BOYS',
   router1:'/Shop/mall/ShoesKids',
   router2:'/Shop/Shop-Gender/kids',
   checkBt:true,
  },
  form_brand3:this.picture={
    source1:{
      img1:"https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/enUS/Images/D3_Teaser_3X_DT_tcm221-383151.jpg",
      img2:"https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/enUS/Images/D3_Teaser_3X_T_tcm221-383153.jpg",
      img3:"https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/enUS/Images/D3_Teaser_3X_DT_tcm221-383151.jpg",
      routerTo:'/Shop/mall/ShoesKids'
    },
    source2:{
      img1:"https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/enUS/Images/D5_Teaser_3X_DT_tcm221-383157.jpg",
      img2:"https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/enUS/Images/D5_Teaser_3X_M_tcm221-383158.jpg",
      img3:"https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/enUS/Images/D5_Teaser_3X_DT_tcm221-383157.jpg",
      routerTo:'/Shop/mall/ClothesKids'
    },
    source3:{
      img1:'https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/enUS/Images/D6_Teaser_3X_DT_tcm221-383160.jpg',
      img2:'https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/enUS/Images/D6_Teaser_3X_M_tcm221-383161.jpg',
      img3:'https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/enUS/Images/D6_Teaser_3X_DT_tcm221-383160.jpg',
      routerTo:'/Shop/mall/accessoriesKids'
    },
    source4:{
      img1:"https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/enGB/Images/training-fw19-ya-tc-3-dt_tcm143-380711.jpg",
      img2:"https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/enGB/Images/training-fw19-ya-tc-3-mt_tcm143-380712.jpg",
      img3:"https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/enGB/Images/training-fw19-ya-tc-3-dt_tcm143-380711.jpg",
      routerTo:'/Shop/mall/kidsAll'
    }
  }
    };

    this.route.paramMap.subscribe(params => {
      this.gender= this.route.snapshot.paramMap.get('id');
    console.log(this.gender);
      if(this.gender=='men'){
        this.data=dataMen;
      }
      if(this.gender=='kids'){
        this.data=dataKids;
      }
      if(this.gender=='women'){
        this.data=dataWomen;
      }
    });



    this.gender= this.route.snapshot.paramMap.get('id');
    //console.log(this.gender)
  }

}
