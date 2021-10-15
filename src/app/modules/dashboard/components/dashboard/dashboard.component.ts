import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat/chat.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  img = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg'

  public roomId!: string;
  public messageText!: string;
  public messageArray: {user: string, message: string}[] = [];

  public phone!: string;
  public currentUser: any;
  public selectedUser: any;

  public userList = [
    {
      id: 1,
      name: 'Babken',
      phone: '444555666',
      roomId: {
        2: 'room-1',
        3: 'room-2',
        4: 'room-3',
      }
    },
    {
      id: 2,
      name: 'Vle',
      phone: '111222333',
      roomId: {
        1: 'room-1',
        3: 'room-4',
        4: 'room-5',
      }
    },
    {
      id: 3,
      name: 'Vaxo',
      phone: '777888999',
      roomId: {
        1: 'room-2',
        2: 'room-4',
        4: 'room-6',
      }
    },
    {
      id: 4,
      name: 'Antaram',
      phone: '000000000',
      roomId: {
        1: 'room-3',
        2: 'room-5',
        3: 'room-6',
      }
    }
  ]

  constructor(private chatService: ChatService) { 
    this.chatService.getMessage().subscribe((data: {user: string, message: string}) => {
      this.messageArray.push(data);
    })
  }

  ngOnInit(): void {
    this.currentUser = this.userList[0];
  }

  selectUserHandler(phone: string):void {
    this.selectedUser = this.userList.find((user) => user.phone === phone);
    this.roomId = this.selectedUser.roomId[this.selectedUser.id];
    this.messageArray = [];

    this.join(this.currentUser.name, this.roomId);
  }

  join(username: string, roomId: string):void {
    this.chatService.joinRoom({user: username, roomId: roomId});
  }

  sendMessage(): void {
    this.chatService.sendMessage({data: this.currentUser.name, room: this.roomId, message: this.messageText});
    this.messageText = '';
  }

}
