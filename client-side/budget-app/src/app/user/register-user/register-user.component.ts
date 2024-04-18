import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserForRegistrationDto } from './../../_interfaces/user/userForRegistrationDto.model';
import { AuthenticationService } from './../../shared/services/authentication.service';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, Form, AbstractControl, FormControl } from '@angular/forms';
import { PasswordConfirmationValidatorService } from '../../shared/custom-validators/password-confirmation-validator.service';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    RouterModule,
  ],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css'
})

export class RegisterUserComponent implements OnInit {

  registerForm!: FormGroup;

  errorString: string = "";

  constructor(
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private passConfValidator: PasswordConfirmationValidatorService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirm: new FormControl('', [Validators.required])
    });
    this.registerForm.get('confirm')?.setValidators([this.passConfValidator.validateConfirmPassword(this.registerForm.get('password') as AbstractControl)]);
  }

  public validateControl = (controlName: string) => {
    return this.registerForm.get(controlName)?.invalid && this.registerForm.get(controlName)?.touched
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.registerForm.get(controlName)?.hasError(errorName)
  }

  public registerUser = (registerFormValue: any) => {
    const formValues = { ...registerFormValue };

    const user: UserForRegistrationDto = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      password: formValues.password,
      confirmPassword: formValues.confirm
    };

    this.authService.registerUser("api/accounts/registration", user)
      .subscribe({
        next: (_) => {
          this.router.navigate(["/login"])
          this.snackBar.open('successfully registered', 'x', { duration: 2000 });
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
      });
  }
}
