
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {map} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { WebSocketService } from 'src/service/web-socket.service';
// export interface Message{
//   content:string,
//   message:number,
//   name:string,
//   ip:string
// }
//{"message":1,"content":"' + msg + '","ip":"' + ip + '","name":"' + name + '"
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public message :Subject<any>;
  constructor( private wsService: WebSocketService) {
    this.message= <Subject<any>>wsService
        .connect(environment.CHAT_URL)
        .pipe(
          map((response: MessageEvent):any =>{
            let data = JSON.parse(response.data);
            return data;
          })
        )
  }
}
