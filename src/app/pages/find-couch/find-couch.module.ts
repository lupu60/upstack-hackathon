import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FindCouchRoutingModule } from './find-couch-routing.module';
import { MapComponent } from './map/map.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { GMapModule } from 'primeng/gmap';

@NgModule({
  declarations: [MapComponent, SearchBarComponent],
  imports: [CommonModule, FindCouchRoutingModule, GMapModule]
})
export class FindCouchModule {}
