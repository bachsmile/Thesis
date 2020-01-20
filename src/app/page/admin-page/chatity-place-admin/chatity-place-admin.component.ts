import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/service/function/event.service';
import { LinkService } from 'src/service/link.service';

@Component({
  selector: 'app-chatity-place-admin',
  templateUrl: './chatity-place-admin.component.html',
  styleUrls: ['./chatity-place-admin.component.scss']
})
export class ChatityPlaceAdminComponent implements OnInit {
  ListPlace=[];
  vote=[];
  constructor(private eventservice:EventService,private link:LinkService) { }

  ngOnInit() {

    if(window.localStorage.getItem('Vote')){
      this.vote=JSON.parse(window.localStorage.getItem('Vote'));
    }
    this.eventservice.getPlace().subscribe(res=>{
      console.log(res);
      this.ListPlace=res.data;
    });
    this.eventservice.watcher.subscribe(x=>{
      this.eventservice.getPlace().subscribe(res=>{
        console.log(res);
        this.ListPlace=res.data;
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
  Vote(x){
    const a=x;
    let l;
    let b=a;
    let votes={
      ID_Place:x.ID_Place
    }
    l=0;
      l=this.vote.filter(y=>{
        return y.ID_Place==x.ID_Place;
    });
    if (l <= 0){
      this.vote.push(votes);
      window.localStorage.setItem('Vote',JSON.stringify(this.vote));
      b.Point++;
      console.log(b);
      this.eventservice.updatePlace(JSON.stringify(b)).subscribe(res=>{
        console.log(res);
      })
    }
  }
  updateStatus(x){
    console.log(x.Status);
    if(x.Status==1){
      x.Status=0;
    }else{
      if(x.Status==0){
        x.Status=1
      }
    }

    console.log(x.Status);
    this.eventservice.updatePlace(JSON.stringify(x)).subscribe(res=>{
      console.log(res);
    })
  }
  delete(data){
    this.eventservice.deletePlace(JSON.stringify(data.ID_Place)).subscribe(res=>{
      console.log(res);
      this.eventservice.update();
    })
  }
}
