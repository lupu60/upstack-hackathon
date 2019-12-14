import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessagesListComponent } from './messages-list/messages-list.component';
import { NzIconModule } from 'ng-zorro-antd';

@NgModule({
  declarations: [MessagesListComponent],
  imports: [NzIconModule, CommonModule],
  exports: [MessagesListComponent]
})
export class MessagesModule {}
