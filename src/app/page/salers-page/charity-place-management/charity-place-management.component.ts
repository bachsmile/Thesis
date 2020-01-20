import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/service/function/event.service';

@Component({
  selector: 'app-charity-place-management',
  templateUrl: './charity-place-management.component.html',
  styleUrls: ['./charity-place-management.component.scss']
})
export class CharityPlaceManagementComponent implements OnInit {
  ListPlace=[];
  vote=[];

  constructor(private eventservice:EventService) { }

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
    if(window.localStorage.getItem('Vote')){
      this.vote=JSON.parse(window.localStorage.getItem('Vote'));
    }
    this.eventservice.getPlace().subscribe(res=>{
      console.log(res);
      let a=[];
      a=res.data
      a.forEach(x=>{
        if(x.Status==1){
          this.ListPlace.push(x);
        }
      })
    })
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
}
