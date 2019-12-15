import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchMapParam } from '../shared/api.dto';

@Injectable()
export class RestMapService {
  constructor(private http: HttpClient) {}

  searchMap(searchParams: SearchMapParam) {
    return this.http.post(`search-map`, searchParams);
  }
}
