import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (window.localStorage.getItem('token') && req.url.includes(environment.baseUrl)) {
      req = req.clone({
        setHeaders: {
          'X-API-Token': `${window.localStorage.getItem('token')}`
        }
      });
    }
    return next.handle(req);
  }
}
