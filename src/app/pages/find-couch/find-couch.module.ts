import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapComponent } from './map/map.component';
import { GMapModule } from 'primeng/gmap';
import { NzSpinModule } from 'ng-zorro-antd';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';

@NgModule({
  declarations: [MapComponent],
  imports: [CommonModule, NgZorroAntdMobileModule, NzSpinModule, GMapModule],
  exports: [MapComponent]
})
export class FindCouchModule {}
