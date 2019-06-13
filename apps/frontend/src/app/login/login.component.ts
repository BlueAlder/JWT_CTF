import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication/authentication.service';
import { UserDto } from '@lovely-jwt-security/authentication';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'lovely-jwt-security-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  validateForm: FormGroup;

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    if (this.validateForm.valid) {
      console.log(this.validateForm.value);
      const user: UserDto = this.validateForm.value;
      this.authService.login(user)
        .subscribe(data => {
          this.message.success('Successully logged in!');
          this.router.navigate(['/home']);
        }, err => {
          this.message.error(err.error.message)
        });
    }
  }

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthenticationService,
              private message: NzMessageService) {}

  ngOnInit(): void {
    this.authService.logout();

    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

}
