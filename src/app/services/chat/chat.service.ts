import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client'
import {HttpClient} from "@angular/common/http";
import {chatUser} from "../../models/chatUser.model";
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  //after calling the setupSocketConnection method, socket variable would be
  // containing the connected socket object
  private socket!: Socket;

  constructor(private http: HttpClient) {}

  setupSocketConnection() {
    this.socket = io(environment.SOCKET_ENDPOINT);
    this.socket.emit('my message', 'Hello there from Angular.');
    this.socket.on('my broadcast', (data: string) => {
      console.log(data);
    });
  }

  getAllChatUsers(): Observable<chatUser[]> {
    return this.http.get<chatUser[]>(`${environment.baseUrl}/users`)
  }

  // sendMessage(msg: string) {
  //   this.socket.emit('sendMessage', { message: msg });
  // }


  // joinRoom(data: any): void {
  //   this.socket.emit('join', data);
  // }

  // sendMessage(data): void {
  //   this.socket.emit('message', data);
  // }

  // getMessage(): Observable<any> {
  //   return new Observable<{user: string, message: string}>(observer => {
  //     this.socket.on('new message', (data) => {
  //       observer.next(data);
  //     });
  //
  //     return () => {
  //       this.socket.disconnect();
  //     }
  //   });
  // }
}

