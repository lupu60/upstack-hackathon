import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RestMapService {
  constructor(private http: HttpClient) {}

  searchMap(searchParams) {
    return this.http.post(`search-map`, searchParams);
  }
}
