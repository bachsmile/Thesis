import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/service/function/event.service';
import  { AppComponent } from '../../app.component'
@Component({
  selector: 'app-salers-page',
  templateUrl: './salers-page.component.html',
  styleUrls: ['./salers-page.component.scss']
})
export class SalersPageComponent implements OnInit {
  display;
  layout;
  check_button;
  signal=false;

  constructor(private eventservice: EventService) { }

  ngOnInit() {
    this.eventservice.changeMessage(false);

    this.eventservice.headerCheck=false;
    this.eventservice.update();
    this.eventservice.watcher.subscribe(x=>{
      this.eventservice.headerCheck=false;
    })
  }
  displayCounter(count) {
    this.display=count;
    document.getElementById('display').style.height='100vh';
    setTimeout(() => {
      document.getElementById('display').style.height='100%'
    }, 1000);
}
  check_button_menu(e){
    setTimeout(() => {
      this.check_button=e;
    }, 50);
  }
  width_rep(e){
    if(e){
       document.getElementById('left-admin').style.width="16.67%";
      document.getElementById('right-admin').style.width="83.33%";
     }
     else{
       document.getElementById('left-admin').style.width="6%";
       document.getElementById('right-admin').style.width="94%"
     }
  }
  getSignal(){
    this.signal=!this.signal;
  }
  receiveLayout(data){
    this.layout=data;
  }
}
