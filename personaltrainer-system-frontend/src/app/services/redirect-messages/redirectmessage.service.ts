import { Injectable } from '@angular/core';
import { Message } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class RedirectmessageService {

  private messages: Message[] = [];

  addMessage(message: Message) {
    this.messages.push(message);
  }

  getMessages(): Message[] {
    return [...this.messages];
  }

  clearMessages() {
    this.messages = [];
  }
}
