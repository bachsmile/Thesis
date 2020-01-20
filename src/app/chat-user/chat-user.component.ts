import { ItemOrder } from './../class/item-order';
import { Product } from './../class/product';
import { Component, OnInit } from "@angular/core";
import { WebSocketService } from 'src/service/web-socket.service';
import { ChatService } from './service/chat.service';
import { ProductService } from 'src/service/function/product.service';
import { DatePipe } from '@angular/common';
import { EventService } from 'src/service/function/event.service';
@Component({
  selector: "app-chat-user",
  templateUrl: "./chat-user.component.html",
  styleUrls: ["./chat-user.component.scss"]
})
export class ChatUserComponent implements OnInit {
  checkToggle = false;
  checkBoxChat = false;
  checkA=false;
  days:string;
  interval_obj;
  a;
  hours;
  minutes;
  seconds;
  timeDown;
  shop=[];
  listUserAuction=[
        {
          ID_Auction: "0",
          ID_Customer: "0",
          Price_Auction: "0",
          Time: "0",
          id: "0",
      },
      {
        ID_Auction: "0",
        ID_Customer: "0",
        Price_Auction: "0",
        Time: "0",
        id: "0",
    },
    {
      ID_Auction: "0",
      ID_Customer: "0",
      Price_Auction: "0",
      Time: "0",
      id: "0",}
  ];
  ListAction=[];
  AuctionNow=[];
  room = [];
  sms = "";
  ip = window.localStorage.getItem('ID');
  listPeople;
  ListChat = [];
  UpPrice;
  AuctionOrder;
  constructor(private chatService: ChatService, private as: WebSocketService, private productService:ProductService, private eventService: EventService) {
    chatService.message.subscribe(msg => {
      console.log("Response from Websocket server " + JSON.stringify(msg));
      let obj = msg;
      if (obj.message != null) {
        this.printMsg(obj.message, obj.ip, obj.name);
      }
      if (obj.people != null) {
        this.printPeople(obj.people, obj.ip);
      }
      if (obj.updateAction != null) {
        this.updateInfoAction(obj);
      }
    });
  }
  ngOnInit() {
    var countdown = document.getElementById("tiles"); // get tag element
    // getCountdown();
    document.documentElement.scrollTop=0;
    this.setIp();
      this.AuctionNow[0]={'ID_auction':'Designed by Xuan Bach',
      'Name_auction':'Please! Wait for the next auction product!',
      'Price_start':0,
      'Price_end':0,
      'charity_percent':0,
      'Time_start':"",
      'Time_end':"",
      'Detail':'Please! Wait for the next auction product!',
      'Shop':'Please! Wait for the next auction product!',
      'Title':'Please! Wait for the next auction product!',
      'Rate':0,
      'Img':'/assets/img/backgrounds/photo1.png','Img1':'/assets/img/backgrounds/photo1.png','Img2':'/assets/img/backgrounds/photo1.png'}
      this.productService.getAucrion().subscribe(res=>{
        if(res!=null){

        this.ListAction=res.data;
        this.getAuctionItem();console.log('ada')
        this.ListAction.forEach(x=>{
          if(x.Time_start<= this.datetime1() && x.Time_end >this.datetime1()){
            console.log(x)
            let idShop={
              'ID_Shop':x.Shop
            }
            this.eventService.getInfoID(JSON.stringify(idShop)).subscribe(res=>{
              this.shop=res.data;
              console.log(this.shop)
            })
            let start=x.Time_start;
            let end=x.Time_end;
            //console.log('ip')
              this.checkA=true;
            this.timeDown=this.subTime(this.stringToDate(this.datetime1()),this.stringToDate(end))
            this.AuctionNow[0]=x;
            // this.slides=[
            //   {
            //     img:x.img
            //   }
            // ]
           // console.log(this.AuctionNow);
            //this.timeDown=12000
            this.downClock(this.timeDown,x.ID_auction)
          }

        })
        }
      })
      this.productService.watcher.subscribe(x=>{
        //console.log('x')
        this.productService.getAucrion().subscribe(res=>{
        //  console.log('x')
          this.ListAction=res.data;
        })
      })

  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    clearInterval(this.interval_obj);
    clearInterval(this.a);
  }
  //{"message":1,"content":"' + msg + '","ip":"' + ip + '","name":"' + name + '"
  private message = {
    content: "elliot forbes",
    message: 1,
    name: "bach",
    ip: "xuan"
  };
  // in in nhắn trong box chat
  printMsg(message, ip, name) {
    let l;
    let user = {
      ip: ip,
      name: name
    };

    if (this.room == null) {
      l = 0;
    } else {
      l = this.room.filter(x => {
        return x.ip == ip;
      });
    }
    if (l <= 0) {
      this.room.push(user);
    }
    this.checkBoxChat = true;
    //console.log(this.room);
    let smsA = {
      type: 0,
      sms: message,
      from: ip,
      to: this.ip
    };
    this.ListChat.push(smsA);

    //console.log(this.ListChat);
  }
  // gui tin nhan
  sendMsg() {
    //console.log("New Message sent from client");
    this.chatService.message.next(this.message);
  }
  //dong mo box chat
  toggle() {
    this.checkToggle = !this.checkToggle;
    if (this.checkToggle === true) {
      document.getElementById("people").style.display = "block";
    } else {
      document.getElementById("people").style.display = "none";
    }
  }
  // dong mo list chat
  msgHead() {
    this.checkBoxChat = !this.checkBoxChat;
    if (this.checkBoxChat === true) {
      document.getElementById("content").style.display = "block";
    } else {
      document.getElementById("content").style.display = "none";
    }
    //console.log(this.checkBoxChat);
  }
  //gui tin nhan
  onSubmit(ips,  k) {
    var span = document.createElement("span");
    var msg = document.getElementById(ips)["value"];
    //document.getElementById(ips)['value']=null;
    var ip = ips;
    let name = "Client" + this.ip;
    //console.log(document.getElementById(ips));

    // console.log(k);
    // console.log(this.sms);
    for (
      let index = 0;
      index < document.getElementsByTagName("input").length;
      index++
    ) {
      document.getElementsByTagName("input")[index].value = null;
    }
    let smsB = {
      type: 1,
      sms: msg,
      from: this.ip,
      to: ip
    };
    this.ListChat.push(smsB);
    //console.log(this.ListChat);
    document.getElementsByClassName("msg_body")[0].scrollHeight;
    var json =
      '{"message":1,"content":"' +
      msg +
      '","ipFrom":"' +
      this.ip +
      '","ipTo":"' +
      ip +
      '","name":"' +
      name +
      '"}';
    //console.log(json);
    this.chatService.message.next(JSON.parse(json));
  }
  printPeople(items, ip) {
   // console.log(items);
    this.listPeople = items;
    //console.log(this.listPeople);
  }
  // mở box chat của user
  msg(ip, name) {
    let l;
    let user = {
      ip: ip,
      name: name
    };

    if (this.room == null) {
      l = 0;
    } else {
      l = this.room.filter(x => {
        return x.ip == ip;
      });
    }
    if (l <= 0) {
      this.room.push(user);
    }
   // console.log(this.room);
  }
  //tạo id socket
  setIp() {
    let ips=window.localStorage.getItem('ID');
    var json = '{"MaID":1,"content":"' + ips + '"}';
   // console.log(json);
    this.chatService.message.next(JSON.parse(json));
  }
  //close box chat
  close(ip,name){
    //document.getElementById(`chat_box${id}`).style.display = "none";
    let l;
    let user = {
      ip: ip,
      name: name
    };

    if (this.room == null) {
      l = 0;
    } else {
      l= this.room.findIndex(x=>x.ip===ip);
      console.log(l)
      this.room.splice(l,1);
    }
   // console.log(this.room);
  }
  //mở info san pham dau gia
  extend(id){
    let nav_item_1 = document.getElementsByTagName('nav')[0].getElementsByTagName('ul')[0].getElementsByTagName('li')[0].getElementsByTagName('a')[0],
      nav_item_2 = document.getElementsByTagName('nav')[0].getElementsByTagName('ul')[0].getElementsByTagName('li')[1].getElementsByTagName('a')[0],
      nav_item_3 = document.getElementsByTagName('nav')[0].getElementsByTagName('ul')[0].getElementsByTagName('li')[2].getElementsByTagName('a')[0],
      nav_item_4 = document.getElementsByTagName('nav')[0].getElementsByTagName('ul')[0].getElementsByTagName('li')[3].getElementsByTagName('a')[0],
      nav_item_5 = document.getElementsByTagName('nav')[0].getElementsByTagName('ul')[0].getElementsByTagName('li')[4].getElementsByTagName('a')[0];

      if(id==1){
        let details=document.getElementsByTagName('nav')[0].getElementsByTagName('ul')[0].getElementsByTagName('li')[0].getElementsByTagName('div')[0];
        if(nav_item_1.classList.contains('extend')){
          nav_item_1.classList.remove('top-50');
          nav_item_1.classList.add('top-0');
          nav_item_1.classList.remove('extend')
          nav_item_1.classList.add('narrow');
          setTimeout(() => {
            details.classList.add('detail')
          }, 1000);
        }else{
          nav_item_1.classList.add('top-50');
          nav_item_1.classList.remove('top-0');
          nav_item_1.classList.add('extend')
          nav_item_1.classList.remove('narrow');
          details.classList.remove('detail')
        }
          }
          else if(id==2){
            let details=document.getElementsByTagName('nav')[0].getElementsByTagName('ul')[0].getElementsByTagName('li')[1].getElementsByTagName('div')[0];

            if(nav_item_2.classList.contains('extend')){
              nav_item_2.classList.remove('top-50');
              nav_item_2.classList.add('top-0');
              nav_item_2.classList.remove('extend')
              nav_item_2.classList.add('narrow');
              setTimeout(() => {
                details.classList.add('detail')
              }, 1000);
            }else{
              nav_item_2.classList.add('top-50');
              nav_item_2.classList.remove('top-0');
              nav_item_2.classList.add('extend')
              nav_item_2.classList.remove('narrow');
              details.classList.remove('detail')

            }
          }
          else if(id==3){
            let details=document.getElementsByTagName('nav')[0].getElementsByTagName('ul')[0].getElementsByTagName('li')[2].getElementsByTagName('div')[0];

            if(nav_item_3.classList.contains('extend')){
              nav_item_3.classList.remove('top-50');
              nav_item_3.classList.add('top-0');
              nav_item_3.classList.remove('extend')
              nav_item_3.classList.add('narrow');
              setTimeout(() => {
                details.classList.add('detail')
              }, 1000)
            }else{
              nav_item_3.classList.add('top-50');
              nav_item_3.classList.remove('top-0');
              nav_item_3.classList.add('extend')
              nav_item_3.classList.remove('narrow');
              details.classList.remove('detail')

            }
          }
          else if(id==4){
            let details=document.getElementsByTagName('nav')[0].getElementsByTagName('ul')[0].getElementsByTagName('li')[3].getElementsByTagName('div')[0];

            if(nav_item_4.classList.contains('extend')){
              nav_item_4.classList.remove('top-50');
              nav_item_4.classList.add('top-0');
              nav_item_4.classList.remove('extend')
              nav_item_4.classList.add('narrow');
              setTimeout(() => {
                details.classList.add('detail')
              }, 1000)
            }else{
              nav_item_4.classList.add('top-50');
              nav_item_4.classList.remove('top-0');
              nav_item_4.classList.add('extend')
              nav_item_4.classList.remove('narrow');
              details.classList.remove('detail')

            }
          }
          else if(id==5){
            let details=document.getElementsByTagName('nav')[0].getElementsByTagName('ul')[0].getElementsByTagName('li')[4].getElementsByTagName('div')[0];

            if(nav_item_5.classList.contains('extend')){
              nav_item_5.classList.remove('top-50');
              nav_item_5.classList.add('top-0');
              nav_item_5.classList.remove('extend')
              nav_item_5.classList.add('narrow');
              setTimeout(() => {
                details.classList.add('detail')
              }, 1000)
            }else{
              nav_item_5.classList.add('top-50');
              nav_item_5.classList.remove('top-0');
              nav_item_5.classList.add('extend')
              nav_item_5.classList.remove('narrow');
              details.classList.remove('detail')

            }
          }


  }
  // mở xem chi tiết san pham dau gia
  info(){
    var overlay_navigation = document.getElementById('overlay-navigation'),
      nav_item_1 = document.getElementsByTagName('nav')[0].getElementsByTagName('ul')[0].getElementsByTagName('li')[0],
      nav_item_2 = document.getElementsByTagName('nav')[0].getElementsByTagName('ul')[0].getElementsByTagName('li')[1],
      nav_item_3 = document.getElementsByTagName('nav')[0].getElementsByTagName('ul')[0].getElementsByTagName('li')[2],
      nav_item_4 = document.getElementsByTagName('nav')[0].getElementsByTagName('ul')[0].getElementsByTagName('li')[3],
      nav_item_5 = document.getElementsByTagName('nav')[0].getElementsByTagName('ul')[0].getElementsByTagName('li')[4],
      top_bar = document.getElementsByClassName('bar-top'),
      middle_bar = document.getElementsByClassName('bar-middle'),
      bottom_bar = document.getElementsByClassName('bar-bottom');
      console.log(nav_item_2)
    overlay_navigation.classList.toggle('overlay-active');
    if (overlay_navigation.classList.contains('overlay-active')) {

      top_bar[0].classList.remove('animate-out-top-bar');
      top_bar[0].classList.add('animate-top-bar');
      middle_bar[0].classList.remove('animate-out-middle-bar');
      middle_bar[0].classList.add('animate-middle-bar');
      bottom_bar[0].classList.remove('animate-out-bottom-bar');
      bottom_bar[0].classList.add('animate-bottom-bar');
      overlay_navigation.classList.remove('overlay-slide-up');
      overlay_navigation.classList.add('overlay-slide-down');
      nav_item_1.classList.remove('slide-in-nav-item-reverse');
      nav_item_1.classList.add('slide-in-nav-item');
      nav_item_2.classList.remove('slide-in-nav-item-delay-1-reverse');
      nav_item_2.classList.add('slide-in-nav-item-delay-1');
      nav_item_3.classList.remove('slide-in-nav-item-delay-2-reverse');
      nav_item_3.classList .add('slide-in-nav-item-delay-2');
      nav_item_4.classList.remove('slide-in-nav-item-delay-3-reverse');
      nav_item_4.classList.add('slide-in-nav-item-delay-3');
      nav_item_5.classList.remove('slide-in-nav-item-delay-4-reverse');
      nav_item_5.classList.add('slide-in-nav-item-delay-4');
    } else {
      top_bar[0].classList.remove('animate-top-bar');
      top_bar[0].classList.add('animate-out-top-bar');
      middle_bar[0].classList.remove('animate-middle-bar');
      middle_bar[0].classList.add('animate-out-middle-bar');
      bottom_bar[0].classList.remove('animate-bottom-bar');
      bottom_bar[0].classList.add('animate-out-bottom-bar');
      overlay_navigation.classList.remove('overlay-slide-down');
      overlay_navigation.classList.add('overlay-slide-up')
      nav_item_1.classList.remove('slide-in-nav-item');
      nav_item_1.classList.add('slide-in-nav-item-reverse');
      nav_item_2.classList.remove('slide-in-nav-item-delay-1');
      nav_item_2.classList.add('slide-in-nav-item-delay-1-reverse');
      nav_item_3.classList.remove('slide-in-nav-item-delay-2');
      nav_item_3.classList.add('slide-in-nav-item-delay-2-reverse');
      nav_item_4.classList.remove('slide-in-nav-item-delay-3');
      nav_item_4.classList.add('slide-in-nav-item-delay-3-reverse');
      nav_item_5.classList.remove('slide-in-nav-item-delay-4');
      nav_item_5.classList.add('slide-in-nav-item-delay-4-reverse');
    }
  }
  slideConfig = ({
    centerMode: true,
    centerPadding: '60px',
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    variableWidth: true,
    dots: true,
    responsive: [
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
  });
  slides=[
    {img:'https://znews-photo.zadn.vn/w660/Uploaded/neg_rtlzofn/2017_06_30/cobe5t01.jpg'},
    {img:'http://www.asiaone.com/sites/default/files/inline/images/18335_1497926765.jpg'},
    {img:'https://static.wixstatic.com/media/fff718_84749a3ba0504b19ba1c73dd78fb3f34~mv2.jpg'},
  ];
  //che do tối
  switch(){
    if(document.getElementById('fullpage').classList.contains('night')){
      document.getElementById('fullpage').classList.remove('night');
      document.getElementById('switch').classList.remove("switched");
      document.getElementById('mode').textContent="Light Mode"
    }
    else{
      document.getElementById("fullpage").classList.add("night");
      document.getElementById("switch").classList.add("switched");
      document.getElementById('mode').textContent="Night Mode"
    }
  }
// lay ngay gio hien tai
  datetime(){
    const date = new Date();
    const dateSendingToServer = new DatePipe('en-US').transform(date, 'yyyy/MM/dd hh:mm:ss');
    return dateSendingToServer;
  }
  // lay ngay gio hien tại va dinh dang
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
  //lay ngay gio hien tai
  time(){
    const date = new Date();
   // const dateSendingToServer = new DatePipe('en-US').transform(date, 'yyyy/MM/dd hh:mm:ss');
    return date;
  }
  //chuyen chuoi sang ngày gio
  stringToDate(string){
    let date={
      Year:0,
      Month:0,
      Date:0,
      Hours:0,
      Minutes:0,
      Seconds:0,
    }
    date.Year= parseInt(string.slice(0,4));
    date.Month=parseInt(string.slice(5,7));
    date.Date=parseInt(string.slice(8,10));
    date.Hours=parseInt(string.slice(11,13));
    date.Minutes=parseInt(string.slice(14,16));
    date.Seconds=parseInt(string.slice(17,19));
    return date;
  }
  //tính khoảng cách mili giay giữa 2 thời gian
  subTime(x,y){
    let mili=(y.Year-x.Year)*31557600000+(y.Month-x.Month)*2629800000
    +(y.Date-x.Date)*86400000+(y.Hours-x.Hours)*3600000
    +(y.Minutes-x.Minutes)*60000+(y.Seconds-x.Seconds)*1000 ;
    return mili;
  }
  //đếm ngược
    downClock(time,id_auction){
      var target_date = new Date().getTime() + time; // set the countdown date
      if(this.checkA==true){
         this.interval_obj= setInterval( ()=>{
             // console.log(this.checkA)
              this.getCountdown(target_date,id_auction);
            // }
          },1000);
      }
    }
    //kiem tra và lay đặt sản phẩm về giỏ hàng sau khi đấu giá, set thông báo mặc định
   getCountdown=(target_date,id)=>{

    // find the amount of "seconds" between now and target
     var current_date = new Date().getTime();
    var seconds_left = (target_date - current_date) / 1000;
   // console.log(seconds_left);
    if(seconds_left>=0 && id!= 'Designed by Xuan Bach'){
      let ids={
        ID_Auction:id
      }
      this.eventService.getUserAuctionID(JSON.stringify(ids)).subscribe(res=>{
        let b=[];
        if(res==null){
          let b=[
                  {
                    ID_Auction: "0",
                    ID_Customer: "0",
                    Price_Auction: "0",
                    Time: "0",
                    id: "0",
                },
                {
                  ID_Auction: "0",
                  ID_Customer: "0",
                  Price_Auction: "0",
                  Time: "0",
                  id: "0",
              },
              {
                ID_Auction: "0",
                ID_Customer: "0",
                Price_Auction: "0",
                Time: "0",
                id: "0",
            }
            ];
            this.listUserAuction=b;
        }else{
        b.push(res.data[res.data.length-1]);
        b.push(res.data[res.data.length-2]);
        b.push(res.data[res.data.length-3]);
        this.listUserAuction=b;
        //console.log(b);
      }
      });
      if(seconds_left>=0 &&seconds_left<=1  && id!= 'Designed by Xuan Bach'){
        console.log('da set bag');
        let init={
          'ID_auction':'Designed by Xuan Bach',
          'Name_auction':'Please! Wait for the next auction product!',
          'Price_start':0,
          'Price_end':0,
          'charity_percent':0,
          'Time_start':"",
          'Time_end':"",
          'Detail':'Please! Wait for the next auction product!',
          'Shop':'Please! Wait for the next auction product!',
          'Title':'Please! Wait for the next auction product!',
          'Rate':0,
          'Img':'/assets/img/backgrounds/photo1.png',
         }

          this.AuctionNow[0].Status='Done',

          this.productService.upDateAuction(JSON.stringify(this.AuctionNow[0])).subscribe(res=>{
            console.log(res);
            this.sentProcToBag(this.AuctionNow[0]);
            this.AuctionNow[0]=init;
              this.checkA=false;
          })

          clearInterval(this.interval_obj);
      }
    }
    else{
      if(id== 'Designed by Xuan Bach'){
        let b=[
          {
            ID_Auction: "0",
            ID_Customer: "0",
            Price_Auction: "0",
            Time: "0",
            id: "0",
        },
        {
          ID_Auction: "0",
          ID_Customer: "0",
          Price_Auction: "0",
          Time: "0",
          id: "0",
      },
      {
        ID_Auction: "0",
        ID_Customer: "0",
        Price_Auction: "0",
        Time: "0",
        id: "0",
    }
    ];
    this.listUserAuction=b;
      };
    }
    this.days = this.pad( parseInt((seconds_left / 86400).toString()) );
    seconds_left = seconds_left % 86400;

    this.hours= this.pad( parseInt((seconds_left / 3600).toString()) );
    seconds_left = seconds_left % 3600;

    this.minutes = this.pad( parseInt((seconds_left / 60).toString()) );
    this.seconds = this.pad( parseInt( (seconds_left % 60 ).toString()) );

  }
  //định dạng ngày giời dưới 10
   pad(n) {
    return (n < 10 ? '0' : '') + n;
  }
  //kiểm tra trong thời gian ngày có sản phẩm đấu giá không
  getAuctionItem(){

      this.a=setInterval( ()=>{
        this.productService.update();
          this.ListAction.forEach(x=>{
           if(x.Time_start==this.datetime1()){
            let start=x.Time_start;
              let end=x.Time_end;
              this.days='01';
              this.AuctionNow[0]=x;
              this.checkA=true;
              console.log(this.AuctionNow )
              this.timeDown=this.subTime(this.stringToDate(start),this.stringToDate(end))
              this.downClock(this.timeDown,x.ID_auction);
              console.log(this.timeDown)
              console.log(this.AuctionNow)
              this.AuctionNow[0].Status='Auctioning'
              this.productService.upDateAuction(JSON.stringify(this.AuctionNow[0])).subscribe(res=>{
                console.log(res);
              })
           }
      });
    },1000);
  }
  //cược giá đấu
  upPrice(){
    console.log(this.AuctionNow[0].Price_end)
    if(parseInt(this.AuctionNow[0].Price_end)>= this.UpPrice){
      alert('Price is lower than current price, please pay higher price !!!');
    }
    else{
          let acu={
            'ID_auction':this.AuctionNow[0].ID_auction,
            'Name_auction':this.AuctionNow[0].Name_auction,
            'Price_start':parseInt(this.AuctionNow[0].Price_start),
            'Price_end':this.UpPrice,
            'charity_percent':parseInt(this.AuctionNow[0].charity_percent),
            'Time_start':this.AuctionNow[0].Time_start,
            'Time_end':this.AuctionNow[0].Time_end,
            'Detail':this.AuctionNow[0].Detail,
            'Shop':this.AuctionNow[0].Shop,
            'Title':this.AuctionNow[0].Title,
            'Rate':parseInt(this.AuctionNow[0].Rate),
            'Img':this.AuctionNow[0].Img,
            'Img1':this.AuctionNow[0].Img1,
            'Img2':this.AuctionNow[0].Img2,
            'Status':this.AuctionNow[0].Status,
    }
    var json ={
          'updateAction':1,
          'ID_auction':this.AuctionNow[0].ID_auction,
            'Name_auction':this.AuctionNow[0].Name_auction,
            'Price_start':parseInt(this.AuctionNow[0].Price_start),
            'Price_end':this.UpPrice,
            'charity_percent':parseInt(this.AuctionNow[0].charity_percent),
            'Time_start':this.AuctionNow[0].Time_start,
            'Time_end':this.AuctionNow[0].Time_end,
            'Detail':this.AuctionNow[0].Detail,
            'Shop':this.AuctionNow[0].Shop,
            'Title':this.AuctionNow[0].Title,
            'Rate':parseInt(this.AuctionNow[0].Rate),
            'Img':this.AuctionNow[0].Img,
            'Img1':this.AuctionNow[0].Img1,
            'Img2':this.AuctionNow[0].Img2,
            "ipFrom":'b',
            "name":'abch'
    };
      this.chatService.message.next(json);
      this.productService.upDateAuction(JSON.stringify(acu)).subscribe(res=>{
        console.log(res);
      });
      let user={
        ID_Customer:window.localStorage.getItem('ID'),
        ID_Auction:json.ID_auction,
        Time:this.datetime1(),
        Price_Auction:this.UpPrice
      }
      console.log(user);
      this.eventService.createUserAuction(JSON.stringify(user)).subscribe(res=>{
        console.log(res);
      })
    }

  }
  //update giá
  updateInfoAction(obj){
    this.AuctionNow[0].Price_end=obj.Price_end;
  }
  // đi nhanh tới chat
  goChat(){
      document.documentElement.scrollTop=document.getElementById('page').clientHeight;
  }
  // order sản phẩm đấu giá thành công
  sentProcToBag(item){
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      text+='OD-';
      for (let i = 0; i < 5; i++){text +=possible.charAt(Math.floor(Math.random() * possible.length));}
      this.AuctionOrder={
        id:text,
        ID_Shop: item.Shop,
        Name_Product: item.Name_auction,
        Category: 'Auction',
        price: item.Price_end,
        Number: 1,
        Img1:item.Img,
        Img2:item.Img1,
        Transport: 'SBS',
        Status: 1,
        time: this.datetime1(),
        Charity: item.charity_percent	,
        ID_Product:item.ID_auction,
        ID_Customer:window.localStorage.getItem('ID')
      }
      console.log(this.AuctionOrder);
      this.productService.createOrders(JSON.stringify(this.AuctionOrder)).subscribe(res=>{
        console.log(res);
      })
}
}

