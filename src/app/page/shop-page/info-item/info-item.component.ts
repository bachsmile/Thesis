import { EventService } from 'src/service/function/event.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/service/function/product.service';
import { Comment } from 'src/app/class/comment';
@Component({
  selector: 'app-info-item',
  templateUrl: './info-item.component.html',
  styleUrls: ['./info-item.component.scss']
})
export class InfoItemComponent  implements OnInit {
  item={
    Img1:'',
    Img2:'',
    Name_Product:'',
    Price:0,
    Catefory1:'',
    Catefory2:'',
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
  idAdd: string;
  bag=[];
  content='';
  content1='';
  listComment=[];
  idNowShow;
  lengtComment=0;
  check1: boolean = true;
  comment: Comment = new Comment();
  constructor(
        private route: ActivatedRoute,
        private router: Router,
        private productserice:ProductService,
        private eventservice:EventService
    ) { }

  ngOnInit() {
    let id;
    id= this.route.snapshot.paramMap.get('id');
    document.documentElement.scrollTop=0;
    let pd={
      ID_Product:id
    }
    this.lengtComment=0;
    this.eventservice.getListComent(JSON.stringify(pd)).subscribe(res=>{
      // this.listComment=res.data;
      let arr=res.data;
       this.listComment=arr.sort((x,y)=>{
        var x = x.ID_ComParent;
        var y = y.ID_ComParent;
        if (x < y) {return 1;}
        if (x > y) {return -1;}
        return 0;
      })

      console.log(this.listComment);
      this.listComment.forEach(x=>{
        if(x.ID_ComChild=='0'){
          this.lengtComment++;
        }
      })
    })

    if (JSON.parse(window.localStorage.getItem("itemsBag")) !== null) {
      this.bag = JSON.parse(window.localStorage.getItem("itemsBag"));
    }
    window.sessionStorage.setItem("lengthBag", this.bag.length.toString());
    this.productserice.getItem(JSON.stringify(id)).subscribe(res=>{
      this.item=res.data[0];
      console.log(this.item)
    });
      this.productserice.watcher.subscribe(x=>{
        if (JSON.parse(window.localStorage.getItem("itemsBag")) !== null) {
          this.bag = JSON.parse(window.localStorage.getItem("itemsBag"));
        }
        window.sessionStorage.setItem("lengthBag", this.bag.length.toString());
        this.lengtComment=0;

        this.eventservice.getListComent(JSON.stringify(pd)).subscribe(res=>{
         // this.listComment=res.data;

          let arr=res.data;
          this.listComment=arr.sort((x,y)=>{
           var x = x.ID_ComParent;
           var y = y.ID_ComParent;
           if (x < y) {return 1;}
           if (x > y) {return -1;}
           return 0;
         })
          console.log(this.listComment);
          this.listComment.forEach(x=>{
            if(x.ID_ComChild=='0'){
              this.lengtComment++;
            }
          })
        })
      })
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
        this.productserice.update();
      }
    }
    pushBag(val) {
      this.bag.push({
        ID_Product: val.ID_Product,
        Amount: 1
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
      this.productserice.changeMessage(message);
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
        this.productserice.getItem(JSON.stringify(id)).subscribe(data=>{
          console.log(data.data);
          this.pushBag(data.data[0] );
          this.bag.sort((a,b)=>a.id-b.id);
          console.log(this.bag);
          window.localStorage.setItem("lengthBag", this.bag.length.toString());
          this.createMessage(this.bag.length);
          window.localStorage.setItem("itemsBag", JSON.stringify(this.bag));
          this.productserice.update();
        })
    }
    datetime1(){
      const date = new Date();
      let h=date.getHours()<10?'0'+date.getHours():date.getHours();
      let m=date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes();
      let s=date.getSeconds()<10?'0'+date.getSeconds():date.getSeconds();
      let mon=date.getMonth()+1;
      let M=mon<10?'0'+mon:mon;
      let D=date.getDate()<10?0+date.getDate():date.getDate()
      const dateSendingToServer = date.getFullYear()+'-'+M+'-'+D+' '+h+':'+m+':'+s ;
      return dateSendingToServer;
    }
    sent_commentPar(item){
      if(this.content1!=''){
        console.log(item);
      this.comment.Content= this.content1;
      this.comment.ID_ComParent= this.lengtComment+1;
     this.comment.ID_ComChild=0;
     this.comment.ID_Product=item.ID_Product;
     this.comment.ID_User= window.localStorage.getItem('ID');
     this.comment.Time=this.datetime1();
     console.log(this.comment);
     this.eventservice.createComment(JSON.stringify(this.comment)).subscribe(res=>{
       console.log(res);
       if(res.message=="Success"){
        this.productserice.update();
        this.content1='';
       }
     })
      }
    }
    sent_comment(item){
     if(this.content!=''){
      let lengt=0;

      console.log(item);
      this.comment.Content= this.content;
      this.comment.ID_ComParent= item.ID_ComParent;
      this.listComment.forEach(x=>{
        if(x.ID_ComParent==item.ID_ComParent){
          lengt++;
        }
      });
     this.comment.ID_ComChild=lengt;
     this.comment.ID_Product=item.ID_Product;
     this.comment.ID_User= window.localStorage.getItem('ID');
     this.comment.Time=this.datetime1();
     console.log(this.comment);
     this.eventservice.createComment(JSON.stringify(this.comment)).subscribe(res=>{
       console.log(res);
       if(res.message=="Success"){
        this.productserice.update();
       }
     })
     }

    }
    resetRepply(i){
      this.content='';
      if( this.idNowShow!=null){
        document.getElementById('reply'+this.idNowShow).classList.remove('show');
      }
      this.idNowShow=i;
     console.log('reply'+ this.idNowShow+i)
    }
}
