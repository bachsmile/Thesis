import { Injectable } from '@angular/core';
import {Observable,of, from } from 'rxjs';
import { Observer } from 'rxjs';
import { Message } from '../model/message';
import { Event } from '../model/event';

import * as socketIo from 'socket.io-client';

const SERVER_URL = 'http://localhost:8090';

@Injectable()
export class SocketService {
    private socket;
    public ListUser=[];
    public initSocket(): void {
        this.socket = socketIo(SERVER_URL);
    }

    public send(message: Message): void {
        this.socket.emit('message', message);
    }

    public onMessage(): Observable<Message> {
        return new Observable<Message>(observer => {
            this.socket.on('message', (data: Message) => observer.next(data));
        });
    }

    public onEvent(event: Event): Observable<any> {
        return new Observable<Event>(observer => {
            this.socket.on(event, (x) => observer.next(x));
        });
    }
    public getCLient():void{
      this.socket.emit('getClient');
    }
      public OngetCLient(): Observable<any> {
        return new Observable<any>(observer => {
            this.socket.on('getClient', (x)=> observer.next(x))
        });
    }
    public getRoom():void{
      this.socket.emit('room');
    }
      public OnGetRoom(): Observable<any> {
        return new Observable<any>(observer => {
            this.socket.on('room', (x)=> observer.next(x))
        });
    }
    public listUserChat():void{
      this.socket.emit('ListUser');
    }
      public OnGetUserChat(): Observable<any> {
        return new Observable<any>(observer => {
            this.socket.on('ListUser',(x)=> observer.next(x));
        });
    }
}
