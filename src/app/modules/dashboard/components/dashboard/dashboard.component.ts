import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { ChatService } from 'src/app/services/chat/chat.service';
import {AuthService} from "../../../auth/services/auth.service";
import {map} from "rxjs/operators";
import {chatUser} from "../../../../models/chatUser.model";
import {Thread} from "../../../../models/thread.model";
import {Message} from "../../../../models/message.model";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  chatMembers: chatUser[] = [];
  selectedUserId!: number;
  isSelected: boolean = false;
  currentUserId = +this.authService.currentUser$.getValue().id;
  newMessage: string = '';
  currentThread!: Thread;
  messageList = [];

  constructor(public authService: AuthService, private chatService: ChatService) {}

  ngOnInit(): void {
    this.getChatUsers();
    // this.chatService.getNewMessage().subscribe((message: string) => {
    //   this.messageList.push(message);
    // })
  }

  getChatUsers() {
    this.chatService.getAllChatUsers()
      .pipe(
        map(users => users.filter((user: any) => user.email.toLowerCase() !== this.authService.currentUser$.getValue().email.toLowerCase()))
      )
      .subscribe(data => {
        console.log('getChatUsers: ', data)
        this.chatMembers = data;

      })
  }

  checkThread(chatMember: chatUser) {
    this.isSelected = !this.isSelected;
    this.selectedUserId = chatMember.id;
    this.chatService.checkThreadExistence(chatMember.id).subscribe(([data]) => {
      if (data) {
        this.currentThread = data;
        this.chatService.getConversationWithUser(this.currentThread.id)
          .subscribe(data => {
            this.currentThread.messages = data;
        })
      } else {
        const payload = new Thread({});
        payload.members = [this.currentUserId, chatMember.id]
        this.chatService.createThread(payload).subscribe(currentThread => {
          this.currentThread = currentThread;
        })
      }
    })
  }

  sendMessage() {
    const payload = new Message({});
    payload.threadId = Number(this.currentThread.id);
    payload.senderId = this.currentUserId;
    payload.receiverId = this.selectedUserId;
    payload.message = this.newMessage;

    this.chatService.sendMessage(this.currentThread.id, payload).subscribe();
    this.newMessage = '';
  }
}
