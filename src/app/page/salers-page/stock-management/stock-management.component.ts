import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/service/function/product.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-stock-management',
  templateUrl: './stock-management.component.html',
  styleUrls: ['./stock-management.component.scss']
})
export class StockManagementComponent  implements OnInit {
  shop={
    ID_Shop:window.localStorage.getItem('ID')
  };
  in;
  out;
  listProd=[];
  constructor(private productservice:ProductService,
             private toastr: ToastrService) { }

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
    this.productservice.getWarehoseID(JSON.stringify(this.shop)).subscribe(res1=>{
      this.listProd=res1.data;
    });
    this.productservice.watcher.subscribe(data=>{
      this.productservice.getWarehoseID(JSON.stringify(this.shop)).subscribe(res=>{
        this.listProd=res.data;
      })
    })
  }
  updateWH(data,data1,x,y){
    if(data1==='edit'){
      let item1={
        Input:this.in,
        Output:this.out,
        Warehose:this.in- this.out,
        ID_Product:data.ID_Product,
        ID_Shop:data.ID_Shop
      }
      this.productservice.upWarehoseID(JSON.stringify(item1)).subscribe(res=>{
        this.toastr.success('Edited the warehouse!', 'Edit Success!');
        this.productservice.update();
        this.productservice.getItem(JSON.stringify(data.ID_Product)).subscribe(x=>{
          // x.Warehose=item2.Warehose;
          let a=x.data[0];
          a.Warehose=item1.Warehose;
           console.log(a)
           this.productservice.updateIF(JSON.stringify(a)).subscribe(y=>{
             console.log(y)
           })
         })
      },
      error=>{
        this.toastr.error('Error correction', 'Edit ERROR!');
      }
      )
      console.log(item1)
    }
    if(data1==='add'){
      let item2={
        Input:parseInt(x)+this.in,
        Output:parseInt(y),
        Warehose:parseInt(x)+this.in- parseInt(y),
        ID_Product:data.ID_Product,
        ID_Shop:data.ID_Shop
      }

      this.productservice.upWarehoseID(JSON.stringify(item2)).subscribe(res=>{
        this.toastr.success('Added the quantity of products in warehose!', 'Added Success!');
        this.productservice.update();
        this.in=0;
        this.productservice.getItem(JSON.stringify(data.ID_Product)).subscribe(x=>{
         // x.Warehose=item2.Warehose;
         let a=x.data[0];
         a.Warehose=item2.Warehose;
          console.log(a)
          this.productservice.updateIF(JSON.stringify(a)).subscribe(y=>{
            console.log(y)
          })
        })
      },
      error=>{
        this.toastr.error('Error correction', 'Add ERROR!');
      }
     )
      console.log(item2)
    }
    if(data1==='sub'){
      let item3={
        Input:parseInt(x),
        Output:parseInt(y)+this.out,
        Warehose:parseInt(x)-(parseInt(y)+this.out),
        ID_Product:data.ID_Product,
        ID_Shop:data.ID_Shop
      }
      this.productservice.upWarehoseID(JSON.stringify(item3)).subscribe(res=>{
        this.toastr.success('Export 1 quantity of product out of the warehose!', 'Exported Success!');
        this.productservice.update();
        this.out=0;
        this.productservice.getItem(JSON.stringify(data.ID_Product)).subscribe(x=>{
          // x.Warehose=item2.Warehose;
          let a=x.data[0];
          a.Warehose=item3.Warehose;
           console.log(a)
           this.productservice.updateIF(JSON.stringify(a)).subscribe(y=>{
             console.log(y)
           })
         })
      },
      error=>{
        this.toastr.error('Error correction', 'Sub ERROR!');
      }
      )
      console.log(item3)
    }

  }
  delete(item){
    console.log(item.ID_Product)
    this.productservice.deleteWH(JSON.stringify(item.ID_Product)).subscribe(res=>{
      this.toastr.success('Deleted product in warehose!', 'Delete Suscess!');
      this.productservice.update();
      console.log(res)
    },
    err=>{
      this.toastr.error('Failed to delete product in stock !', 'Delete error!');
    });
    this.productservice.delete(JSON.stringify(item.ID_Product)).subscribe(res=>{
      this.toastr.success('Deleted product in List Product', 'Toastr fun!');
      this.productservice.update();
      console.log(res)
    },
    err=>{
      this.toastr.error('Failed to delete product in list product!', 'Delete error!');
    })
  }
}
