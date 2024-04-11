import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './../../shared/services/authentication.service';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, Form, AbstractControl, FormControl } from '@angular/forms';
import { UserPasswordResetDto } from '../../_interfaces/user/userPasswordReset.model';
import { PasswordConfirmationValidatorService } from '../../shared/custom-validators/password-confirmation-validator.service';


@Component({
  selector: 'app-password-reset',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.css'
})
export class PasswordResetComponent {
  resetPasswordForm!: FormGroup;

  private returnUrl: string = "";
  showError: boolean = false;
  errorString: string = "";

  constructor(private authService: AuthenticationService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private passConfValidator: PasswordConfirmationValidatorService, ) {}

   ngOnInit(): void {
    this.resetPasswordForm = new FormGroup({
      email: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
      confirm: new FormControl('', [Validators.required])
    });
    this.resetPasswordForm.get('confirm')?.setValidators([this.passConfValidator.validateConfirmPassword(this.resetPasswordForm.get('password') as AbstractControl)]);

  }

  validateControl = (controlName: string) => {
    return this.resetPasswordForm.get(controlName)?.invalid && this.resetPasswordForm.get(controlName)?.touched
  }
  
  hasError = (controlName: string, errorName: string) => {
    return this.resetPasswordForm.get(controlName)?.hasError(errorName)
  }
  
  resetPassword = (resetPasswordFormValue: any) => {
    this.showError = false;
    const login = {... resetPasswordFormValue };
    const userNewPassword: UserPasswordResetDto = {
      email: login.email,
      password: login.password
    }
    this.authService.resetPassword('api/accounts/passwordreset', userNewPassword)
    .subscribe({
      next: (_) => {
        this.router.navigate(["/login"]);
    },
    error: (err: HttpErrorResponse) => {
      console.log(err.error.errors)
        if (err.error.errors.ConfirmPassword) {
          this.errorString = err.error.errors.ConfirmPassword[0]
        } else if (err.error.errors) {
          this.errorString = err.error.errors.join('\n ');
        } else {
          this.errorString = "Unknown error occurred.";
        }
        console.log(this.errorString);
    }})
  }
}
