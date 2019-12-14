import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { CustomerGuard } from './customer.guard';

const routes: Routes = [
  {
    path: 'web',
    component: LayoutComponent,
    canActivate: [CustomerGuard],
    children: [
      { path: 'couch-surf', loadChildren: () => import('./find-couch/find-couch.module').then(m => m.FindCouchModule) },
      {
        path: 'user-profile',
        loadChildren: () => import('./user-profile/user-profile.module').then(m => m.UserProfileModule)
      },
      {
        path: 'messages',
        loadChildren: () => import('./messages/messages.module').then(m => m.MessagesModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
