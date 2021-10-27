export class Message {
  id: number;
  threadId: number;
  senderId: number;
  receiverId: number;
  message: string;

  constructor(data: any) {
    this.id = data.id;
    this.threadId = data.threadId;
    this.senderId = data.senderId;
    this.receiverId = data.receiverId;
    this.message = data.message;
  }
}
