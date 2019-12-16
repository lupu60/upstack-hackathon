import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { httpInterceptorProviders } from './http-interceptors';
import { RestAuthenticationService } from './rest-authentication.service';
import { RestMapService } from './rest-map.service';
import { RestMessages } from './rest-messeges.service';

@NgModule({
  imports: [CommonModule],
  declarations: [],
  providers: [httpInterceptorProviders, RestAuthenticationService, RestMapService, RestMessages]
})
export class ApiModule {}
