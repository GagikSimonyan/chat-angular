import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { ChatService } from 'src/app/services/chat/chat.service';
import {AuthService} from "../../../auth/services/auth.service";
import {map} from "rxjs/operators";
import {chatUser} from "../../../../models/chatUser.model";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  chatMembers: chatUser[] = [];
  message: string = '';
  selectedUserId: number | undefined;
  currentUserID = this.authService.currentUser$.getValue().id

  constructor(public authService: AuthService, private chatService: ChatService) {}

  ngOnInit(): void {
    this.getChatUsers();
    this.chatService.setupSocketConnection();
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

  getSelectedUserId(chatMember: chatUser) {
    this.selectedUserId = chatMember.id;
  }

  sendData() {
    let data = {
      senderId: this.currentUserID,
      receiverId: this.selectedUserId,
      message: this.message
    }

    console.log('Data: ', data)
  }
}
