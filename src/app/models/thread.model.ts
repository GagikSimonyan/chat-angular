import {Message} from "./message.model";

export class Thread {
  id: number;
  members: number[];
  messages: Array<Message>;

  constructor(data: any) {
    this.id = data.id;
    this.members = data.members;
    this.messages = data.messages || [];
  }
}
