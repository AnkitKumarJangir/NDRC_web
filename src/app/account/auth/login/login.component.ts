import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  error = '';
  returnUrl: string | undefined;
  isLive: boolean = true;
  checkWorkspace: boolean = false;
  buttonName = 'Next';

  // set the currenr year
  year: number = new Date().getFullYear();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    if (!this.checkWorkspace) {
    } else {
    }
  }

  editSubdomain() {
    this.checkWorkspace = false;
    this.buttonName = 'Next';
  }
}
