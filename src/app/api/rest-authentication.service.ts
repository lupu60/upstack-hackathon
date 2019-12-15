import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiResponse, User } from '../shared/api.dto';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';

@Injectable()
export class RestAuthenticationService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient, private notification: NzMessageService, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  login(loginDetails: any) {
    this.http.post(`auth`, loginDetails).subscribe(
      (res: ApiResponse) => {
        const user: User = res.data;
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', user.token);
        this.router.navigateByUrl('/');
      },
      err => {
        this.notification.create('error', err.message);
      }
    );
  }

  register(form) {
    return this.http.post('sign-up', form).subscribe((res: ApiResponse) => {
      const user: User = res.data;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', user.token);
      this.router.navigateByUrl('/');
    });
  }
  logout() {}
}
