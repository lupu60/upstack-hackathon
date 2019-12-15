import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessagesListComponent } from './messages-list/messages-list.component';
import { NzIconModule } from 'ng-zorro-antd';
import { NzListModule } from 'ng-zorro-antd/list';

@NgModule({
  declarations: [MessagesListComponent],
  imports: [NzIconModule, CommonModule, NzListModule],
  exports: [MessagesListComponent]
})
export class MessagesModule {}
