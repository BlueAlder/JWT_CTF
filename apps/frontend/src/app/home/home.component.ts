import { Component, OnInit } from '@angular/core';
import { UserRO } from '@lovely-jwt-security/authentication';
import { FlagService } from '../authentication/flag.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'lovely-jwt-security-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user_details: UserRO = JSON.parse(localStorage.getItem('currentUser'));
  flag: string;
  fake_admin = false;

  client_flag = 'FLAG{n0w_th3_r341_ch4113nge_b3g1ns}';

  constructor(private flagService: FlagService,
              private message: NzMessageService) { }

  ngOnInit() {
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
}
