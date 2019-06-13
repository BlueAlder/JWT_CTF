import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FlagService {

  constructor(private http: HttpClient) { }

  getFlag() {
    return this.http.get<any>('http://localhost:3333/api/flag');
  }
}
