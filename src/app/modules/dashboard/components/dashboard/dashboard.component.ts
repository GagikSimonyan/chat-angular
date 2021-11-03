import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat/chat.service';
import { AuthService } from "../../../auth/services/auth.service";
import { map } from "rxjs/operators";
import { chatUser } from "../../../../models/chatUser.model";
import { Thread } from "../../../../models/thread.model";
import { Message } from "../../../../models/message.model";
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
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

  constructor(public authService: AuthService, private chatService: ChatService) {
  }

  ngOnInit(): void {
    this.getChatUsers();
    this.addNewMessageToMessages();
  }

  getChatUsers() {
    this.chatService.getAllChatUsers()
      .pipe(
        map(users => users.filter((user: any) => user.email.toLowerCase() !== this.authService.currentUser$.getValue().email.toLowerCase()))
      )
      .subscribe(data => {
        this.chatMembers = data;
      })
  }

  addNewMessageToMessages() {
    this.chatService.getNewMessage()
      .pipe(untilDestroyed(this))
      .subscribe((message) => {
        this.currentThread.messages.push(message)
      })
  }

  checkThread(chatMember: chatUser) {
    this.isSelected = true;
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
    payload.date = Date.now();

    this.chatService.sendMessage(this.currentThread.id, payload).subscribe(data => {
      this.currentThread.messages.push(data);
    });

    this.newMessage = '';
  }
}
