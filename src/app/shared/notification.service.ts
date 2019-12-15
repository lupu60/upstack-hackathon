import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

@Injectable()
export class NotificationService {
  constructor(private messageService: NzMessageService) {}

  displayError(err: Error) {}

  displaySuccess(msg) {}
}

interface Error {
  name;
  message;
}
