import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RestMessages {
  constructor(private http: HttpClient) {}

  getMessages() {
    return this.http.get('messages');
  }

  getChatHistory(uuid: string) {
    return this.http.get(`messages/${uuid}`);
  }

  sendMessage(message) {
    return this.http.post('messages', message);
  }
}
