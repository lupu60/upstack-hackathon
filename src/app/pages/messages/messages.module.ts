import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessagesRoutingModule } from './messages-routing.module';
import { MessagesListComponent } from './messages-list/messages-list.component';
import { NzIconModule } from 'ng-zorro-antd';

@NgModule({
  declarations: [MessagesListComponent],
  imports: [NzIconModule, CommonModule, MessagesRoutingModule]
})
export class MessagesModule {}
