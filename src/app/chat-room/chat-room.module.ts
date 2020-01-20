import { ChatRoomRoutingModule } from './chat-room-routing.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatRoomComponent } from './chat-room.component';
import { ChatModule } from './chat/chat.module';
import { SharedModule } from './shared/shared.module';
import { ChatUserComponent } from '../chat-user/chat-user.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SlickCarouselModule } from 'ngx-slick-carousel';



@NgModule({
  declarations: [ChatRoomComponent,ChatUserComponent],
  imports: [
    CommonModule,
    ChatModule,
    SharedModule,
    ChatRoomRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SlickCarouselModule
  ]

})
export class ChatRoomModule { }
