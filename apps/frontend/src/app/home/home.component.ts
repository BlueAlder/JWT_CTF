import { Component, OnInit } from '@angular/core';
import { ListUserRO, User, UserRO } from '@lovely-jwt-security/authentication';
import { FlagService } from '../authentication/flag.service';
import { NzMessageService } from 'ng-zorro-antd';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'lovely-jwt-security-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user_details: UserRO = JSON.parse(localStorage.getItem('currentUser'));
  flag: string;
  fake_admin = false;

  users: ListUserRO;

  client_flag = atob('RkxBR3tuMHdfdGgzX3IzNDFfY2g0MTEzbmdlX2IzZzFuc30=');

  constructor(private flagService: FlagService,
              private message: NzMessageService,
              private authService: AuthenticationService) { }

  ngOnInit() {
    this.getUsers();
  }

  getFlag() {
    this.flagService.getFlag()
      .subscribe(res => {
          this.fake_admin = false;
          this.message.success('Flag successfully GOT, thanks adm\'n');
          return this.flag = res.flag;
        },
        err => {
          this.fake_admin = true;
          this.message.error(err.error.message);
        })
  }

  getUsers() {
    this.authService.getUsers()
      .subscribe(res => {
        this.message.success('Updated list of registered users');
        return this.users = res;
      })
  }
}
