import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { RestMessages } from 'src/app/api/rest-messeges.service';
import { ApiResponse, MessageList } from 'src/app/shared/api.dto';

@Component({
  selector: 'app-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.scss']
})
export class MessagesListComponent implements OnInit, OnChanges {
  loading = true;
  hideChatBox = true;
  messagesList;
  currentChat: any;
  chatHistory: any;
  @Output()
  newMessages = new EventEmitter();

  @Input()
  selectedUserFromMap;

  constructor(private restMessages: RestMessages) {}

  ngOnInit(): void {
    this.fetchMessages();
    setInterval(() => {
      this.fetchMessages();
    }, 20000);
  }

  ngOnChanges(): void {
    if (this.selectedUserFromMap) {
      this.selectedUserFromMap.uuid = this.selectedUserFromMap.uid;
      this.openChatroom('', this.selectedUserFromMap);
    }
  }

  fetchMessages() {
    this.restMessages.getMessages().subscribe((response: ApiResponse) => {
      const messages: MessageList[] = response.data;
      this.messagesList = messages.map((message: MessageList) => {
        if (message.new_messages) {
          this.newMessages.emit(true);
        } else {
          this.newMessages.emit(false);
        }
        return {
          title: `${message.first_name} ${message.last_name}`,
          first_name: message.first_name,
          last_name: message.last_name,
          total: message.total,
          new_messages: message.new_messages,
          avatar: message.avatar,
          uuid: message.uid
        };
      });
      this.loading = false;
    });
  }

  openChatroom(event, item) {
    this.loading = true;
    this.currentChat = item;
    this.restMessages.getChatHistory(item.uuid).subscribe((response: ApiResponse) => {
      const messageList = response.data;
      this.chatHistory = messageList;
      this.hideChatBox = false;
      this.loading = false;
    });
  }

  sendMessage(value: string) {
    this.loading = true;

    this.restMessages.sendMessage({ uid: this.currentChat.uuid, body: value }).subscribe((response: ApiResponse) => {
      if (response.code === 200) {
        this.openChatroom('', this.currentChat);
      }
    });
  }
}
