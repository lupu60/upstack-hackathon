import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { LayoutComponent } from './layout/layout.component';
import { MessagesModule } from './messages/messages.module';
import { PagesRoutingModule } from './pages-routing.module';

@NgModule({
  declarations: [LayoutComponent],
  imports: [NgZorroAntdMobileModule, NzIconModule, MessagesModule, CommonModule, PagesRoutingModule]
})
export class PagesModule {}
