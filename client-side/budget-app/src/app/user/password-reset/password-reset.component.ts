import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './../../shared/services/authentication.service';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, Form, AbstractControl, FormControl } from '@angular/forms';
import { UserPasswordResetDto } from '../../_interfaces/user/userPasswordReset.model';
import { PasswordConfirmationValidatorService } from '../../shared/custom-validators/password-confirmation-validator.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-password-reset',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
  ],
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.css'
})
export class PasswordResetComponent implements OnInit {
  resetPasswordForm!: FormGroup;

  private returnUrl: string = "";
  showError: boolean = false;
  errorString: string = "";
  public auth: boolean = false;
  public isUserAuthenticated: boolean = false;
  public setField: boolean = false;
  public userEmail: string = "";

  constructor(
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private passConfValidator: PasswordConfirmationValidatorService,
    private snackBar: MatSnackBar,
    @Inject(DOCUMENT) private document: Document,
  ) {
    this.authService.authChanged.subscribe(res => {
      this.isUserAuthenticated = res;
    })
    const localStorage = document.defaultView?.localStorage;
    if (localStorage) {
      this.auth = true;
    }
    if (this.auth || this.isUserAuthenticated) {
      const ue = this.authService.getUserEmail();
      if (ue != "") {
        this.userEmail = ue;
        this.setField = true;
      }
    }
  }

  ngOnInit(): void {
    this.resetPasswordForm = new FormGroup({
      email: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
      confirm: new FormControl("", [Validators.required])
    });
    this.resetPasswordForm.get('confirm')?.setValidators([this.passConfValidator.validateConfirmPassword(this.resetPasswordForm.get('password') as AbstractControl)]);
    if (this.setField) {
      this.resetPasswordForm.get('email')?.patchValue(this.userEmail);
      this.resetPasswordForm.get('email')?.disable();
    }
  }

  validateControl = (controlName: string) => {
    return this.resetPasswordForm.get(controlName)?.invalid && this.resetPasswordForm.get(controlName)?.touched
  }

  hasError = (controlName: string, errorName: string) => {
    return this.resetPasswordForm.get(controlName)?.hasError(errorName)
  }

  resetPassword = (resetPasswordFormValue: any) => {
    this.showError = false;
    const login = { ...resetPasswordFormValue };
    const userNewPassword: UserPasswordResetDto = {
      email: login.email,
      password: login.password
    }
    this.authService.resetPassword('api/accounts/passwordreset', userNewPassword)
      .subscribe({
        next: (_) => {
          this.router.navigate(["/login"]);
          this.snackBar.open('password successfully changed', 'x', { duration: 2000 });
        },
        error: (err: HttpErrorResponse) => {
          if (err.error.errors.ConfirmPassword) {
            this.errorString = err.error.errors.ConfirmPassword[0]
          } else if (err.error.errors) {
            this.errorString = err.error.errors.join('\n ');
          } else {
            this.errorString = "Unknown error occurred.";
          }
          console.log(this.errorString);
        }
      })
  }
}
