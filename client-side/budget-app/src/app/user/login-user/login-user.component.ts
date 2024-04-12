import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { UserForAuthenticationDto } from './../../_interfaces/user/userForAuthenticationDto.model';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { AuthenticationService } from './../../shared/services/authentication.service';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, Form, AbstractControl, FormControl } from '@angular/forms';
import { AuthResponseDto } from '../../_interfaces/response/AuthenticationResponseDto.model';

@Component({
  selector: 'app-login-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login-user.component.html',
  styleUrl: './login-user.component.css'
})
export class LoginUserComponent implements OnInit{

  loginForm!: FormGroup;

  private returnUrl: string = "";
  showError: boolean = false;

  constructor(
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

   ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  validateControl = (controlName: string) => {
    return this.loginForm.get(controlName)?.invalid && this.loginForm.get(controlName)?.touched
  }
  
  hasError = (controlName: string, errorName: string) => {
    return this.loginForm.get(controlName)?.hasError(errorName)
  }
  
  loginUser = (loginFormValue: any) => {
    this.showError = false;
    const login = {... loginFormValue };
    const userForAuth: UserForAuthenticationDto = {
      email: login.username,
      password: login.password
    }
    this.authService.loginUser('login', userForAuth)
    .subscribe({
      next: (res:AuthResponseDto) => {
        localStorage.setItem("token", res.accessToken);
        localStorage.setItem("email", userForAuth.email)
        if (res.accessToken){
          this.authService.sendAuthStateChangeNotification(true);
        }
        this.router.navigate([this.returnUrl]);
    },
    error: (err: HttpErrorResponse) => {
      this.showError = true;
    }})
  }
}
