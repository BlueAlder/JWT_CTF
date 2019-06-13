import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserDto } from '@lovely-jwt-security/authentication';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'lovely-jwt-security-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  validateForm: FormGroup;

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    if (this.validateForm.valid) {
      console.log(this.validateForm.value);
      const user: UserDto = this.validateForm.value;
      this.authService.register(user)
        .subscribe(data => {
          this.message.success('Successfully registered in!');
          this.router.navigate(['/login']);
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
