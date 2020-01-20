import { ToastrService } from 'ngx-toastr';
import { EventService } from 'src/service/function/event.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  info:boolean=false;
  mail='';
  constructor(private eventService: EventService, private toask: ToastrService) { }

  ngOnInit() {
    this.eventService.getDis().subscribe(res=>{
      console.log(res);
    })
  }
  focus(){
    this.info=!this.info;
  }
  sentKey(){
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";


      text+='code15-';
      for (let i = 0; i < 10; i++){text +=possible.charAt(Math.floor(Math.random() * possible.length));}
    let key={
      To:this.mail,
      Content:'My discount code is: '+text,
      Subject:'discount code 15 % '
    }
    let dis={
      Discount:text,
      Status:'Not used yet'
    }
    this.eventService.createMail(JSON.stringify(key)).subscribe(res=>{

    }, err=>{

    });

    this.eventService.createDis(JSON.stringify(dis)).subscribe(res=>{
      console.log(res);
      this.toask.success('Sent discout to mail');
      this.mail='';
    })
  }
}
