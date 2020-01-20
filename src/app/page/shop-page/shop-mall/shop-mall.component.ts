import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/service/function/event.service';
import { ProductService } from 'src/service/function/product.service';
import { Product } from 'src/app/class/product';

@Component({
  selector: 'app-shop-mall',
  templateUrl: './shop-mall.component.html',
  styleUrls: ['./shop-mall.component.scss']
})
export class ShopMallComponent  implements OnInit {
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
    console.log(this.id)
    if (JSON.parse(window.localStorage.getItem("itemsBag")) !== null) {
      this.bag = JSON.parse(window.localStorage.getItem("itemsBag"));
    }
    window.sessionStorage.setItem("lengthBag", this.bag.length.toString());
    this.productService.getProd().subscribe(res=>{
     //this.items=res.data;
     this.items=[];
     console.log(this.items);
     res.data.forEach(x=>{
      if(x.Display=='show'){
        arr.push(x);
      }
    })
    // arr=res.data;
     arr.forEach(x=>{
      x.Price=parseInt(x.Price);
      x.Sale=parseInt(x.Sale);
       /////////////////////////////////
       //menALl
       if(this.id=='menAll'){
         if(x.Gender=='men'){
           this.items.push(x);
           console.log(this.items)
         }
       }
       //womenAll
       if(this.id=='womenAll'){
        if(x.Gender=='women'){
          this.items.push(x);
          console.log(this.items)
        }
      }
      //kidsAll
      if(this.id=='kidsAll'){
        if(x.Gender=='kids'){
          this.items.push(x);
          console.log(this.items)
        }
      }
      ////////////////////////////
        //ClothesMen
       if(this.id=='ClothesMen'){
           if(x.Gender=='men'|| x.Gender=='all'){
             if(x.Catefory1=='Clothes'){
               this.items.push(x);
               console.log(this.items)
             }
           }
       }
        //ClothesWomen
        if(this.id=='ClothesWomen'){
          console.log('ClothesWomen')
         if(x.Gender=='women'|| x.Gender=='all'){
           if(x.Catefory1=='Clothes'){
             this.items.push(x);
             console.log(this.items)
           }
         }
     }
        //ClothesKids
        if(this.id=='ClothesKids'){
          console.log('ClothesKids')
         if(x.Gender=='kids'|| x.Gender=='all'){
           if(x.Catefory1=='Clothes'){
             this.items.push(x);
             console.log(this.items)
           }
         }
     }
     ////////////////////////////////////
       //TrousersMen
       if(this.id=='TrousersMen'){
         if(x.Gender=='men'|| x.Gender=='all'){
          if(x.Catefory1=='Clothes'){
              if(x.Catefory2=='Trousers'){
                this.items.push(x);
                console.log(this.items)
              }
          }
         }
       }
       //TrousersWomen
       if(this.id=='TrousersWomen'){
        if(x.Gender=='men'|| x.Gender=='all'){
          if(x.Catefory1=='Clothes'){
            if(x.Catefory2=='Trousers'){
              this.items.push(x);
              console.log(this.items)
            }
          }
        }
      }
      //TrousersKids
      if(this.id=='TrousersKids'){
        if(x.Gender=='kids'|| x.Gender=='all'){
          if(x.Catefory1=='Clothes'){
            if(x.Catefory2=='Trousers'){
              this.items.push(x);
              console.log(this.items)
            }
          }
        }
      }
      ///////////////////////////////
       //ShirtMen
       if(this.id=='ShirtMen'){
        if(x.Gender=='men'|| x.Gender=='all'){
          if(x.Catefory1=='Clothes'){
            if(x.Catefory2=='Shirt'){
              this.items.push(x);
              console.log(this.items)
            }
          }
         }
       }
        //ShirtWomen
       if(this.id=='ShirtWomen'){
        if(x.Gender=='men'|| x.Gender=='all'){
          if(x.Catefory1=='Clothes'){
            if(x.Catefory2=='Shirt'){
              this.items.push(x);
              console.log(this.items)
            }
          }
         }
       }
       //ShirtKids
       if(this.id=='ShirtKids'){
        if(x.Gender=='kids'|| x.Gender=='all'){
          if(x.Catefory1=='Clothes'){
            if(x.Catefory2=='Shirt'){
              this.items.push(x);
              console.log(this.items)
            }
          }
         }
       }
       ////////////////////////////
       //SetMen
       if(this.id=='SetMen'){
         if(x.Gender=='men'|| x.Gender=='all'){
          if(x.Catefory1=='Clothes'){
            if(x.Catefory2=='Set'){
              this.items.push(x);
              console.log(this.items)
            }
          }
         }
       }
        //SetWomen
        if(this.id=='SetWomen'){
          if(x.Gender=='women'|| x.Gender=='all'){
           if(x.Catefory1=='Clothes'){
             if(x.Catefory2=='Set'){
               this.items.push(x);
               console.log(this.items)
             }
           }
          }
        }
          //SetKids
          if(this.id=='SetKids'){
            if(x.Gender=='kids'|| x.Gender=='all'){
            if(x.Catefory1=='Clothes'){
              if(x.Catefory2=='Set'){
                this.items.push(x);
                console.log(this.items)
              }
            }
            }
          }
        //////////////////////////
        //ShoesMen
       if(this.id=='ShoesMen'){
        if(x.Gender=='men'|| x.Gender=='all'){
          if(x.Catefory1=='Shoes'){
            this.items.push(x);
            console.log(this.items)
          }
        }
      }
      //ShoesWomen
      if(this.id=='ShoesWomen'){
        if(x.Gender=='women'|| x.Gender=='all'){
          if(x.Catefory1=='Shoes'){
            this.items.push(x);
            console.log(this.items)
          }
        }
      }
      //ShoesKids
      if(this.id=='ShoesKids'){
        if(x.Gender=='kids'|| x.Gender=='all'){
          if(x.Catefory1=='Shoes'){
            this.items.push(x);
            console.log(this.items)
          }
        }
      }
      //////////////////////////////////////
      //HatMen
      if(this.id=='HatMen'){
        if(x.Gender=='men'|| x.Gender=='all'){
          if(x.Catefory1=='Hat'){
            this.items.push(x);
            console.log(this.items)
          }
        }
      }
      //HatWomen
      if(this.id=='HatWomen'){
        if(x.Gender=='women'|| x.Gender=='all'){
          if(x.Catefory1=='Hat'){
            this.items.push(x);
            console.log(this.items)
          }
        }
      }
      //HatKids
      if(this.id=='HatKids'){
        if(x.Gender=='kids'|| x.Gender=='all'){
          if(x.Catefory1=='Hat'){
            this.items.push(x);
            console.log(this.items)
          }
        }
      }
      ////////////
       //watchMen
       if(this.id=='watchMen'){
        if(x.Gender=='men'|| x.Gender=='all'){
          if(x.Catefory1=='watch'){
            this.items.push(x);
            console.log(this.items)
          }
        }
      }
      //watchWomen
      if(this.id=='watchWomen'){
        if(x.Gender=='women'|| x.Gender=='all'){
        if(x.Catefory1=='watch'){
          this.items.push(x);
          console.log(this.items)
        }
      }
    }
    //watchKids
    if(this.id=='watchKids'){
      if(x.Gender=='kids'|| x.Gender=='all'){
      if(x.Catefory1=='watch'){
        this.items.push(x);
        console.log(this.items)
      }
    }
  }
  //////////////////////////////
      //BasicWatch
      if(this.id=='BasicWatch'){
        if(x.Catefory1=='watch'){
          if(x.Catefory2=='BasicWatch'){
            this.items.push(x);
            console.log(this.items)
          }
        }
      }
        //SmartWatch
      if(this.id=='SmartWatch'){
        if(x.Catefory1=='watch'){
          if(x.Catefory2=='SmartWatch'){
            this.items.push(x);
            console.log(this.items)
          }
        }
      }
      ////////////////////////////
      //////////////////////////////////////
      //accessoriesMen
      if(this.id=='accessoriesMen'){
        if(x.Gender=='men'|| x.Gender=='all'){
          if(x.Catefory1=='Hat' || x.Catefory1=='watch'){
            this.items.push(x);
            console.log(this.items)
          }
        }
      }
      //accessoriesWomen
      if(this.id=='accessoriesWomen'){
        if(x.Gender=='women'|| x.Gender=='all'){
          if(x.Catefory1=='Hat' || x.Catefory1=='watch'){
            this.items.push(x);
            console.log(this.items)
          }
        }
      }
      //accessoriesKids
      if(this.id=='accessoriesKids'){
        if(x.Gender=='kids'|| x.Gender=='all'|| x.Catefory1=='watch'){
          if(x.Catefory1=='Hat'){
            this.items.push(x);
            console.log(this.items)
          }
        }
      }
      ////////////
        //////////////////
     })
     this.divPage();
    })
    this.productService.watcher.subscribe(res=>{
      if (JSON.parse(window.localStorage.getItem("itemsBag")) !== null) {
        this.bag = JSON.parse(window.localStorage.getItem("itemsBag"));
      }
     window.sessionStorage.setItem("lengthBag", this.bag.length.toString());
      this.productService.getProd().subscribe(res=>{
       //this.items=res.data;
       this.items=[];
       console.log(this.items);
       arr=res.data;
       arr.forEach(x=>{
        x.Price=parseInt(x.Price);
        x.Sale=parseInt(x.Sale);
         /////////////////////////////////
         //menALl
         if(this.id=='menAll'){
           if(x.Gender=='men'){
             this.items.push(x);
             console.log(this.items)
           }
         }
         //womenAll
         if(this.id=='womenAll'){
          if(x.Gender=='women'){
            this.items.push(x);
            console.log(this.items)
          }
        }
        //kidsAll
        if(this.id=='kidsAll'){
          if(x.Gender=='kids'){
            this.items.push(x);
            console.log(this.items)
          }
        }
        ////////////////////////////
          //ClothesMen
         if(this.id=='ClothesMen'){
             if(x.Gender=='men'|| x.Gender=='all'){
               if(x.Catefory1=='Clothes'){
                 this.items.push(x);
                 console.log(this.items)
               }
             }
         }
          //ClothesWomen
          if(this.id=='ClothesWomen'){
            console.log('ClothesWomen')
           if(x.Gender=='women'|| x.Gender=='all'){
             if(x.Catefory1=='Clothes'){
               this.items.push(x);
               console.log(this.items)
             }
           }
       }
          //ClothesKids
          if(this.id=='ClothesKids'){
            console.log('ClothesKids')
           if(x.Gender=='kids'|| x.Gender=='all'){
             if(x.Catefory1=='Clothes'){
               this.items.push(x);
               console.log(this.items)
             }
           }
       }
       ////////////////////////////////////
         //TrousersMen
         if(this.id=='TrousersMen'){
           if(x.Gender=='men'|| x.Gender=='all'){
            if(x.Catefory1=='Clothes'){
                if(x.Catefory2=='Trousers'){
                  this.items.push(x);
                  console.log(this.items)
                }
            }
           }
         }
         //TrousersWomen
         if(this.id=='TrousersWomen'){
          if(x.Gender=='men'|| x.Gender=='all'){
            if(x.Catefory1=='Clothes'){
              if(x.Catefory2=='Trousers'){
                this.items.push(x);
                console.log(this.items)
              }
            }
          }
        }
        //TrousersKids
        if(this.id=='TrousersKids'){
          if(x.Gender=='kids'|| x.Gender=='all'){
            if(x.Catefory1=='Clothes'){
              if(x.Catefory2=='Trousers'){
                this.items.push(x);
                console.log(this.items)
              }
            }
          }
        }
        ///////////////////////////////
         //ShirtMen
         if(this.id=='ShirtMen'){
          if(x.Gender=='men'|| x.Gender=='all'){
            if(x.Catefory1=='Clothes'){
              if(x.Catefory2=='Shirt'){
                this.items.push(x);
                console.log(this.items)
              }
            }
           }
         }
          //ShirtWomen
         if(this.id=='ShirtWomen'){
          if(x.Gender=='men'|| x.Gender=='all'){
            if(x.Catefory1=='Clothes'){
              if(x.Catefory2=='Shirt'){
                this.items.push(x);
                console.log(this.items)
              }
            }
           }
         }
         //ShirtKids
         if(this.id=='ShirtKids'){
          if(x.Gender=='kids'|| x.Gender=='all'){
            if(x.Catefory1=='Clothes'){
              if(x.Catefory2=='Shirt'){
                this.items.push(x);
                console.log(this.items)
              }
            }
           }
         }
         ////////////////////////////
         //SetMen
         if(this.id=='SetMen'){
           if(x.Gender=='men'|| x.Gender=='all'){
            if(x.Catefory1=='Clothes'){
              if(x.Catefory2=='Set'){
                this.items.push(x);
                console.log(this.items)
              }
            }
           }
         }
          //SetWomen
          if(this.id=='SetWomen'){
            if(x.Gender=='women'|| x.Gender=='all'){
             if(x.Catefory1=='Clothes'){
               if(x.Catefory2=='Set'){
                 this.items.push(x);
                 console.log(this.items)
               }
             }
            }
          }
            //SetKids
            if(this.id=='SetKids'){
              if(x.Gender=='kids'|| x.Gender=='all'){
              if(x.Catefory1=='Clothes'){
                if(x.Catefory2=='Set'){
                  this.items.push(x);
                  console.log(this.items)
                }
              }
              }
            }
          //////////////////////////
          //ShoesMen
         if(this.id=='ShoesMen'){
          if(x.Gender=='men'|| x.Gender=='all'){
            if(x.Catefory1=='Shoes'){
              this.items.push(x);
              console.log(this.items)
            }
          }
        }
        //ShoesWomen
        if(this.id=='ShoesWomen'){
          if(x.Gender=='women'|| x.Gender=='all'){
            if(x.Catefory1=='Shoes'){
              this.items.push(x);
              console.log(this.items)
            }
          }
        }
        //ShoesKids
        if(this.id=='ShoesKids'){
          if(x.Gender=='kids'|| x.Gender=='all'){
            if(x.Catefory1=='Shoes'){
              this.items.push(x);
              console.log(this.items)
            }
          }
        }
        //////////////////////////////////////
        //HatMen
        if(this.id=='HatMen'){
          if(x.Gender=='men'|| x.Gender=='all'){
            if(x.Catefory1=='Hat'){
              this.items.push(x);
              console.log(this.items)
            }
          }
        }
        //HatWomen
        if(this.id=='HatWomen'){
          if(x.Gender=='women'|| x.Gender=='all'){
            if(x.Catefory1=='Hat'){
              this.items.push(x);
              console.log(this.items)
            }
          }
        }
        //HatKids
        if(this.id=='HatKids'){
          if(x.Gender=='kids'|| x.Gender=='all'){
            if(x.Catefory1=='Hat'){
              this.items.push(x);
              console.log(this.items)
            }
          }
        }
        ////////////
          //watchMen
       if(this.id=='watchMen'){
        if(x.Gender=='men'|| x.Gender=='all'){
          if(x.Catefory1=='watch'){
            this.items.push(x);
            console.log(this.items)
          }
        }
      }
      //watchWomen
      if(this.id=='watchWomen'){
        if(x.Gender=='women'|| x.Gender=='all'){
        if(x.Catefory1=='watch'){
          this.items.push(x);
          console.log(this.items)
        }
      }
    }
    //watchKids
    if(this.id=='watchKids'){
      if(x.Gender=='kids'|| x.Gender=='all'){
      if(x.Catefory1=='watch'){
        this.items.push(x);
        console.log(this.items)
      }
    }
  }
  //////////////////////
        //BasicWatchMen
        if(this.id=='BasicWatchMen'){
          if(x.Gender=='men'|| x.Gender=='all'){
            if(x.Catefory1=='watch'){
              if(x.Catefory2=='BasicWatch'){
                this.items.push(x);
                console.log(this.items)
              }
            }
          }
        }
         //BasicWatchWomen
         if(this.id=='BasicWatchWomen'){
          if(x.Gender=='women'|| x.Gender=='all'){
            if(x.Catefory1=='watch'){
              if(x.Catefory2=='BasicWatch'){
                this.items.push(x);
                console.log(this.items)
              }
            }
          }
        }
         //BasicWatchKids
         if(this.id=='BasicWatchKids'){
          if(x.Gender=='kids'|| x.Gender=='all'){
            if(x.Catefory1=='watch'){
              if(x.Catefory2=='BasicWatch'){
                this.items.push(x);
                console.log(this.items)
              }
            }
          }
        }
  //////////////////////////
          //SmartWatchMen
        if(this.id=='SmartWatchMen'){
          if(x.Gender=='men'|| x.Gender=='all'){
              if(x.Catefory1=='watch'){
                if(x.Catefory2=='SmartWatch'){
                  this.items.push(x);
                  console.log(this.items)
                }
              }
          }
        }
         //SmartWatchWomen
         if(this.id=='SmartWatchWomen'){
          if(x.Gender=='women'|| x.Gender=='all'){
              if(x.Catefory1=='watch'){
                if(x.Catefory2=='SmartWatch'){
                  this.items.push(x);
                  console.log(this.items)
                }
              }
          }
        }
         //SmartWatchKids
         if(this.id=='SmartWatchKids'){
          if(x.Gender=='kids'|| x.Gender=='all'){
              if(x.Catefory1=='watch'){
                if(x.Catefory2=='SmartWatch'){
                  this.items.push(x);
                  console.log(this.items)
                }
              }
          }
        }
        ////////////////////////////
        //////////////////////////////////////
        //accessoriesMen
        if(this.id=='accessoriesMen'){
          if(x.Gender=='men'|| x.Gender=='all'){
            if(x.Catefory1=='Hat' || x.Catefory1=='watch'){
              this.items.push(x);
              console.log(this.items)
            }
          }
        }
        //accessoriesWomen
        if(this.id=='accessoriesWomen'){
          if(x.Gender=='women'|| x.Gender=='all'){
            if(x.Catefory1=='Hat'|| x.Catefory1=='watch'){
              this.items.push(x);
              console.log(this.items)
            }
          }
        }
        //accessoriesKids
        if(this.id=='accessoriesKids'){
          if(x.Gender=='kids'|| x.Gender=='all'){
            if(x.Catefory1=='Hat'|| x.Catefory1=='watch'){
              this.items.push(x);
              console.log(this.items)
            }
          }
        }
        ////////////
          //////////////////
       })
       this.divPage();
      })
    })
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
