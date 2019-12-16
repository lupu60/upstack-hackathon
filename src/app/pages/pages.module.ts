import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { LayoutComponent } from './layout/layout.component';
import { MessagesModule } from './messages/messages.module';
import { PagesRoutingModule } from './pages-routing.module';
import { FindCouchModule } from './find-couch/find-couch.module';
import { UserProfileModule } from './user-profile/user-profile.module';
import { HttpClientModule } from '@angular/common/http';
import { ApiModule } from '../api/api.module';
@NgModule({
  declarations: [LayoutComponent],
  imports: [
    ApiModule,
    NgZorroAntdMobileModule,
    NzIconModule,
    MessagesModule,
    CommonModule,
    PagesRoutingModule,
    FindCouchModule,
    UserProfileModule,
    MessagesModule,
    HttpClientModule
  ]
})
export class PagesModule {}
