import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapComponent } from './map/map.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { GMapModule } from 'primeng/gmap';
import { NzSpinModule } from 'ng-zorro-antd';

@NgModule({
  declarations: [MapComponent, SearchBarComponent],
  imports: [CommonModule, NzSpinModule, GMapModule],
  exports: [MapComponent]
})
export class FindCouchModule {}
