import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/service/function/product.service';
import { UploadService } from 'src/service/function/upload.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Auction } from 'src/app/class/auction';

@Component({
  selector: 'app-auction-management',
  templateUrl: './auction-management.component.html',
  styleUrls: ['./auction-management.component.scss']
})
export class AuctionManagementComponent  implements OnInit {
  itemAuction:Auction = new Auction();

  form: FormGroup;
  //product: Product= new Product();
  uploadResponse = { status: '', message: '', filePath: '' };
  success;
   success1;
   error1;
  listAuction=[];
  itemUp:Auction= new Auction();
  minutes=10;
   Ms=2629800000; //1 Month= Ms Milisecons;
     Ds=86400000;  // 1 Day = Ds Milis; 60*60*24*1000
     Ys=31557600000;
     hs=3600000; //60*60*1000
     ms=60000; //60*1000
     ss=1000; //60*1000
  constructor( private productservice: ProductService, private upload: UploadService,private fb: FormBuilder,
    private formBuilder: FormBuilder, private toask: ToastrService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      avatar: [""]
    });
    let shop={
      Shop:window.localStorage.getItem('ID')
    }
    this.productservice.getAucrionID(JSON.stringify(shop)).subscribe(data=>{
      this.listAuction=data.data;
    });
    this.productservice.watcher.subscribe(x=>{
      this.productservice.getAucrionID(JSON.stringify(shop)).subscribe(data=>{
        this.listAuction=data.data;
      });
    })
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

  }
  subTime(x,y){
    let mili=(y.Year-x.Year)*31557600000+(y.Month-x.Month)*2629800000
    +(y.Date-x.Date)*86400000+(y.Hours-x.Hours)*3600000
    +(y.Minutes-x.Minutes)*60000+(y.Seconds-x.Seconds)*1000 ;
    return mili;
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
  stringToDate(str:string){
    let date={
      Year:0,
      Month:0,
      Date:0,
      Hours:0,
      Minutes:0,
      Seconds:0,
    }

    date.Year= parseInt(str.slice(0,4));
    date.Month=parseInt(str.slice(5,7));
    date.Date=parseInt(str.slice(8,10));
    date.Hours=parseInt(str.slice(11,13));
    date.Minutes=parseInt(str.slice(14,16));
    date.Seconds=parseInt(str.slice(17,19));
    return date;
  }
  GetTimeLatest(){

    let arr=this.listAuction;
      let a=arr.sort((x,y)=>{
        var x = x.Time_end;
        var y = y.Time_end;
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
      })
      let TimeLetest=a[a.length-1].Time_end;// san pham dau gia cuoi cung hien tai
      return TimeLetest;

  }
  timeNewAuction(x){
       let TimeNewEnd
      let TimeLetest=this.GetTimeLatest();
      let timeNowString=this.datetime1() // thoi gian hien tai
      let timeLetestDate=(this.stringToDate(TimeLetest))// chuyen tu string sang date cua thoi gian san pham dau gia tre nhat
      let timeNowDate=(this.stringToDate(this.datetime1()))// chyen tu string sang date thoi gian hien tai
     // console.log(this.subTime(timeNowDate,timeLetestDate))//hieu khoang cach giua thoi gian san pham dau gia trư nhat den thoi gian hien tai

    if(this.subTime(timeNowDate,timeLetestDate)<=0){
      console.log('time has passed')
    }else{
      console.log('already');
      TimeNewEnd=this.miliseconsToDate((this.DateToMili(this.stringToDate(TimeLetest))+this.ms*x));
      console.log(TimeNewEnd);//63746042400000
    }
    return TimeNewEnd;
  }
  DateToMili(x){
      let a =0;
      a= x.Year*this.Ys+x.Month*this.Ms+x.Date*this.Ds+x.Hours*this.hs+x.Minutes*this.ms+x.Seconds*this.ss;
      return a;
  }
  miliseconsToDate(x){

    let date={
      "Y":0,
      "M":0,
      "D":0,
      "h":0,
      "m":0,
      "s":0
    }
      let miliNow=63714794400000; // year 2019;
     // let mili=63714794400000+5259600000+86400000*12+3600000*25+60000*75+5000;
     let mili=x;
      let mili_left = mili - miliNow;
      let seconds_left=mili_left/1000;
        date.Y=parseInt((2019+(seconds_left/(this.Ys/1000))).toString())
        date.M=parseInt((seconds_left/(this.Ms/1000)).toString())
        seconds_left = seconds_left- date.M*this.Ms/1000;
        date.D=parseInt((seconds_left/(this.Ds/1000)).toString())
        seconds_left = seconds_left-date.D*this.Ds/1000;
        date.h=parseInt((seconds_left/(this.hs/1000)).toString());
        seconds_left = seconds_left-date.h*this.hs/1000;
        date.m=parseInt((seconds_left/(this.ms/1000)).toString());
        seconds_left = seconds_left-date.m*this.ms/1000;
        date.s=parseInt((seconds_left/(this.ss/1000)).toString());
        seconds_left = seconds_left-date.s*this.ss/1000;
      console.log(date);
      console.log(seconds_left);
    return date;
  }
  dateToString(x){
    console.log(x)
    const date1 = x;
    let h=date1.h<10?'0'+date1.h:date1.h;
    let m=date1.m<10?'0'+date1.m:date1.m;
    let s=date1.s<10?'0'+date1.s:date1.s;
    let M=date1.M<10?'0'+date1.M:date1.M;
    let D=date1.D<10?0+date1.D:date1.D;
    let Y=date1.Y;
    const dateSendingToServer1 = Y+'-'+M+'-'+D+' '+h+':'+m+':'+s ;
    console.log(date1);
    return dateSendingToServer1;
  }
  Confirm(item){
    // this.timeNewAuction(40);
     const a = item;
     let b=a;
     b.Status='Waiting';
     b.Time_start=this.GetTimeLatest();
    b.Time_end=this.dateToString(this.timeNewAuction(this.minutes));
    console.log(b);
    this.productservice.upDateAuction(JSON.stringify(b)).subscribe(res=>{
      console.log(res);
      this.toask.success('Confirm auction product done')
      this.productservice.update();
    })
  }
  deleteAuction(id){
    this.productservice.deleteAucT(JSON.stringify(id)).subscribe(res=>{
      console.log(res);
      this.toask.success('Delete auction product success')

      this.productservice.update();
    })
  }
  getItem(item){
    const a= item;
    this.itemUp=a;
    console.log(this.itemUp)
  }
  Update(){
    this.itemUp.Price_end=this.itemUp.Price_start;
    this.itemUp.Status='Unconfimred';
    console.log(this.itemUp);
    this.productservice.upDateAuction(JSON.stringify(this.itemUp)).subscribe(res=>{
      console.log(res);
      this.toask.success('Update auction product success')

    })

  }

   //add
   addAuction(){
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      text+='AT-';
      for (let i = 0; i < 5; i++){text +=possible.charAt(Math.floor(Math.random() * possible.length));}
      console.log(this.itemAuction);
      this.itemAuction.Time_start='2019-01-01 00:00:00';
      this.itemAuction.Time_end='2019-01-01 00:00:00';
      this.itemAuction.Price_end=this.itemAuction.Price_start;
      this.itemAuction.Shop=window.localStorage.getItem('ID');
      this.itemAuction.Rate=0;
    this.itemAuction.ID_auction=text;
     console.log(this.itemAuction)
    this.productservice.createAuction(JSON.stringify(this.itemAuction)).subscribe(res=>{
      console.log(res);
      this.productservice.update();
      this.toask.success('Resgister auction product success')

    })
  }
  processSelectedFiles1(fileInput) {
    if (fileInput.target.files.length > 0) {
      const file = fileInput.target.files[0];
      this.form.get('avatar').setValue(file);
    }
        for (let i = 0; i < fileInput.path[0].files.length; i++) {
          console.log(fileInput.path[0].files[i].name);
          this.itemAuction.Img='http://sanpham.vne/uploads/img-'+fileInput.path[0].files[i].name;

        }

        const formData = new FormData();
     formData.append('user_profile', this.form.get('avatar').value);
     this.upload.upload(formData).subscribe(
       res =>{this.uploadResponse = res;
        if(this.uploadResponse.message=='100'){
          this.success1='Success';
        }
       console.log(this.uploadResponse.message)} ,
       err => {this.error1 = err}
     );
      }
  processSelectedFiles(fileInput) {
        if (fileInput.target.files.length > 0) {
          const file = fileInput.target.files[0];
          this.form.get('avatar').setValue(file);
        }
            for (let i = 0; i < fileInput.path[0].files.length; i++) {
              console.log(fileInput.path[0].files[i].name);
              this.itemAuction.Img1='http://sanpham.vne/uploads/img-'+fileInput.path[0].files[i].name;

            }

            const formData = new FormData();
         formData.append('user_profile', this.form.get('avatar').value);
         this.upload.upload(formData).subscribe(
           res =>{this.uploadResponse = res;
            if(this.uploadResponse.message=='100'){
              this.success='Success';
            }
           console.log(this.uploadResponse.message)} ,
           err => {this.error1 = err}
         );
      }
  processSelectedFiles2(fileInput) {
            if (fileInput.target.files.length > 0) {
              const file = fileInput.target.files[0];
              this.form.get('avatar').setValue(file);
            }
                for (let i = 0; i < fileInput.path[0].files.length; i++) {
                  console.log(fileInput.path[0].files[i].name);
                  this.itemAuction.Img2='http://sanpham.vne/uploads/img-'+fileInput.path[0].files[i].name;

                }

                const formData = new FormData();
             formData.append('user_profile', this.form.get('avatar').value);
             this.upload.upload(formData).subscribe(
               res =>{this.uploadResponse = res;
                if(this.uploadResponse.message=='100'){
                  this.success='Success';
                }
               console.log(this.uploadResponse.message)} ,
               err => {this.error1 = err}
             );
  }
}

