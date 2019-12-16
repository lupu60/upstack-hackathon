import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserProfileComponent } from './component/user-profile.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd';
import { ApiModule } from 'src/app/api/api.module';
@NgModule({
  declarations: [UserProfileComponent],
  imports: [
    CommonModule,
    NzCardModule,
    NzIconModule,
    NzSwitchModule,
    NzSkeletonModule,
    NzAvatarModule,
    NzInputModule,
    NzGridModule,
    NzFormModule,
    NzGridModule,
    NzButtonModule,
    NzIconModule,
    NzSelectModule,
    NzRadioModule,
    NzDatePickerModule,
    NzTimePickerModule,
    NzInputNumberModule,
    NzCheckboxModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    HttpClientModule,
    ApiModule
  ],
  exports: [UserProfileComponent]
})
export class UserProfileModule {}
