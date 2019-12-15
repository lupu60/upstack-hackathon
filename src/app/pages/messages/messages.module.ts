import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessagesListComponent } from './messages-list/messages-list.component';
import { NzIconModule, NzSkeletonModule } from 'ng-zorro-antd';
import { NzListModule } from 'ng-zorro-antd/list';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { MessagesRoutingModule } from './messages-routing.module';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';

@NgModule({
  declarations: [MessagesListComponent, ChatBoxComponent],
  imports: [
    NzIconModule,
    CommonModule,
    ScrollingModule,
    NzTimelineModule,
    NzListModule,
    NzSkeletonModule,
    MessagesRoutingModule,
    NzBreadCrumbModule
  ],
  exports: [MessagesListComponent]
})
export class MessagesModule {}
