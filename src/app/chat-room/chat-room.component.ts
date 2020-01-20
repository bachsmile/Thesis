import { Component, OnInit } from '@angular/core';
import { LinkService } from 'src/service/link.service';
@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit {

  constructor(private link:LinkService) { }
  ngOnInit() {

  }
  top(){
     document.documentElement.scrollTop=0
  }
  bottom(event?){
    document.documentElement.scrollTop=document.getElementById('page').scrollHeight;
  }
}
