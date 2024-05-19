import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PasswordResetComponent } from './password-reset.component';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { PasswordConfirmationValidatorService } from '../../shared/custom-validators/password-confirmation-validator.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { of } from 'rxjs';
import { UserPasswordResetDto } from '../../_interfaces/user/userPasswordReset.model';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('PasswordResetComponent', () => {
    let component: PasswordResetComponent;
    let fixture: ComponentFixture<PasswordResetComponent>;
    let authService: AuthenticationService;
    let router: Router;
    let route: ActivatedRoute;
    let snackBar: MatSnackBar;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                PasswordResetComponent,
                HttpClientTestingModule,
                MatSnackBarModule,
                RouterTestingModule,
                BrowserAnimationsModule,
                NoopAnimationsModule,
            ],
            providers: [
                AuthenticationService,
                PasswordConfirmationValidatorService,
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(PasswordResetComponent);
        component = fixture.componentInstance;
        authService = TestBed.inject(AuthenticationService);
        snackBar = TestBed.inject(MatSnackBar);
        fixture.detectChanges();
    });
    beforeEach(() => {
        router = TestBed.get(Router);
        route = TestBed.get(ActivatedRoute);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should reset password successfully', () => {
        const x: UserPasswordResetDto = {email:'testUser@email.com', password:'newPassword1!'}
        spyOn(authService, 'resetPassword').and.returnValue(of(x));
        spyOn(snackBar, 'open').and.stub();

        const submitButton = fixture.debugElement.nativeElement.querySelector('button[type="submit"]');
        const inputFieldUsername = fixture.debugElement.nativeElement.querySelector('#email');
        const passwordInput = fixture.debugElement.nativeElement.querySelector('#password');
        const passwordInputConfirm = fixture.debugElement.nativeElement.querySelector('#confirm');

        inputFieldUsername.value = 'testUser@email.com';
        passwordInput.value = 'Password1!';
        passwordInputConfirm.value = 'Password1!';

        submitButton.click();

        component.resetPasswordForm.patchValue({
            email: 'testUser@email.com',
            password: 'Password1!',
            confirm: 'Password1!',
          });

        component.resetPassword(component.resetPasswordForm.value);

        expect(authService.resetPassword).toHaveBeenCalledWith('api/accounts/passwordreset', {
            email: 'testUser@email.com',
            password: 'Password1!'
        });
        expect(router.url).toBe('/');
    });

    it('should keep submit button disabled when form is invalid', () => {
        component.resetPasswordForm.controls['email'].setValue('');
        component.resetPasswordForm.controls['password'].setValue('');
        component.resetPasswordForm.controls['confirm'].setValue('');
        fixture.detectChanges();
        const submitButton = fixture.debugElement.nativeElement.querySelector('button[type="submit"]');
        expect(submitButton.disabled).toBeTruthy();
    });

    it('should validate password and confirm password fields for mismatch', () => {
        component.resetPasswordForm.controls['password'].setValue('Password1');
        component.resetPasswordForm.controls['confirm'].setValue('Password2');
        fixture.detectChanges();
        const errors = component.resetPasswordForm.get('confirm')?.errors || {};
        expect(errors['mustMatch']).toBeTruthy();
    });

    it('should navigate to login page after successful password reset', () => {
        spyOn(authService, 'resetPassword').and.returnValue(of({email:'testUser@email.com', password:'newPassword1!'}));
        spyOn(router, 'navigate');
        component.resetPasswordForm.patchValue({
            email: 'testUser@email.com',
            password: 'Password1!',
            confirm: 'Password1!'
        });
        component.resetPassword(component.resetPasswordForm.value);
        expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });
});