import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessagesListComponent } from './messages-list/messages-list.component';
import { NzIconModule, NzSkeletonModule, NzSpinModule } from 'ng-zorro-antd';
import { NzListModule } from 'ng-zorro-antd/list';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { MessagesRoutingModule } from './messages-routing.module';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { ApiModule } from 'src/app/api/api.module';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';

@NgModule({
  declarations: [MessagesListComponent],
  imports: [
    NzButtonModule,
    NzInputModule,
    NzBadgeModule,
    NzSpinModule,
    ApiModule,
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
