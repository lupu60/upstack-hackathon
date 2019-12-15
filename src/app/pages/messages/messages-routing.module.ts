import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatBoxComponent } from './chat-box/chat-box.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessagesRoutingModule {}
