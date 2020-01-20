import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatRoomComponent } from './chat-room.component';
import { ChatComponent } from './chat/chat.component';


const routes: Routes = [
  {
    path:'',
    redirectTo:'room/chat',
    pathMatch:'full'
  },
  {
    path:'room',
    component:ChatRoomComponent,
    children:[
      {
        path:'chat',
        component:ChatComponent
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoomRoutingModule { }
