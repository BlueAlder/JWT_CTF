import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ListUserRO, User, UserDto } from '@lovely-jwt-security/authentication';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) {

  }

  login(user: UserDto) {
    return this.http.post<any>('http://localhost:3333/api/user/login', user)
      .pipe(map(userRes => {
        if (userRes && userRes.token) {
          localStorage.setItem('currentUser', JSON.stringify(userRes));
        }

        return userRes;
      }))
  }

  register(user: UserDto) {
    return this.http.post<any>('http://localhost:3333/api/user/register', user);
  }

  getUsers() {
    return this.http.get<ListUserRO>('http://localhost:3333/api/user');
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  get userToken() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }
}
