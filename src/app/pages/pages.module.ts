import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';

@NgModule({
  declarations: [LayoutComponent],
  imports: [NgZorroAntdModule, NgZorroAntdMobileModule, CommonModule, PagesRoutingModule]
})
export class PagesModule {}
