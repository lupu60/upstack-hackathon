import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserProfileComponent } from './component/user-profile.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzIconModule } from 'ng-zorro-antd';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzSwitchModule } from 'ng-zorro-antd/switch';

@NgModule({
  declarations: [UserProfileComponent],
  imports: [CommonModule, NzCardModule, NzIconModule, NzSwitchModule, NzSkeletonModule, NzAvatarModule],
  exports: [UserProfileComponent]
})
export class UserProfileModule {}
