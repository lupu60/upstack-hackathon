import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RestUser {
  constructor(private http: HttpClient) {}

  updateProfile(toBeUpdatedProfile) {
    return this.http.post('update-profile', toBeUpdatedProfile);
  }

  getUserDetails(uuid) {
    return this.http.get(`users/${uuid}`);
  }
}
