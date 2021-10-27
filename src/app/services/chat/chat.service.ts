import {BehaviorSubject, Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {io} from 'socket.io-client'
import {HttpClient} from "@angular/common/http";
import {chatUser} from "../../models/chatUser.model";
import {environment} from "../../../environments/environment";
import {map, tap} from "rxjs/operators";
import {Thread} from "../../models/thread.model";
import {AuthService} from "../../modules/auth/services/auth.service";
import {Message} from "../../models/message.model";


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public message$: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) {
  }

  socket = io(environment.SOCKET_ENDPOINT);

  getAllChatUsers(): Observable<chatUser[]> {
    return this.http.get<chatUser[]>(`${environment.baseUrl}/users`)
  }

  public sendMessage(threadId: number, payload: Message) {
    return this.http.post<Thread>(`${environment.baseUrl}/threads/${threadId}/messages`, payload)
  }

  public getNewMessage = () => {
    this.socket.on('message', (message) => {
      this.message$.next(message);
    });

    return this.message$.asObservable();
  };

  checkThreadExistence(memberId: number): Observable<Thread[]> {
    return this.http.get<Thread[]>(`${environment.baseUrl}/threads`)
      .pipe(
        map(threads => {
            return threads.filter(thread => {
                return thread.members.includes(memberId) && thread.members.includes(this.authService.currentUser$.getValue().id)
            })
          }
        )
      )
  }

  createThread(thread: Thread) {
    return this.http.post<Thread>(`${environment.baseUrl}/threads`, thread)
  }

  getConversationWithUser(threadId: number) {
    return this.http.get<Message[]>(`${environment.baseUrl}/messages?threadId=${threadId}`)
  }
}


