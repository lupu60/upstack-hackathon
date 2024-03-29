import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapComponent } from './map/map.component';
import { GMapModule } from 'primeng/gmap';
import { NzSpinModule } from 'ng-zorro-antd';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { ApiModule } from '../../../app/api/api.module';
import { NzModalModule } from 'ng-zorro-antd/modal';

@NgModule({
  declarations: [MapComponent],
  imports: [CommonModule, NzMessageModule, NzModalModule, NgZorroAntdMobileModule, NzSpinModule, GMapModule, ApiModule],
  exports: [MapComponent]
})
export class FindCouchModule {}
