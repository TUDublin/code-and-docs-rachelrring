import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { PasswordConfirmationValidatorService } from '../../shared/custom-validators/password-confirmation-validator.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterUserComponent } from './register-user.component';
import { of } from 'rxjs';
import { RegistrationResponseDto } from '../../_interfaces/response/registrationResponseDto.model';

describe('PasswordResetComponent', () => {
    let component: RegisterUserComponent;
    let fixture: ComponentFixture<RegisterUserComponent>;
    let authService: AuthenticationService;
    let router: Router;
    let route: ActivatedRoute;
    let snackBar: MatSnackBar;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                RegisterUserComponent,
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

        fixture = TestBed.createComponent(RegisterUserComponent);
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

    it('should initialize the registration form with empty fields', () => {
        expect(component.registerForm.get('firstName')?.value).toEqual('');
        expect(component.registerForm.get('lastName')?.value).toEqual('');
        expect(component.registerForm.get('email')?.value).toEqual('');
        expect(component.registerForm.get('password')?.value).toEqual('');
        expect(component.registerForm.get('confirm')?.value).toEqual('');
    });

    it('should mark email field as invalid if email is invalid', () => {
        const emailControl = component.registerForm.get('email');
        emailControl?.setValue('invalid-email');
        expect(emailControl?.valid).toBeFalsy();
        expect(emailControl?.hasError('email')).toBeTruthy();
    });

    it('should mark email field as valid if email is valid', () => {
        const emailControl = component.registerForm.get('email');
        emailControl?.setValue('valid@example.com');
        expect(emailControl?.valid).toBeTruthy();
        expect(emailControl?.hasError('email')).toBeFalsy();
    });

    it('should call authService.registerUser and navigate to login page on successful registration', () => {
        let r: RegistrationResponseDto = {
            isSuccessfulRegistration: false,
            errros: []
        }
        spyOn(authService, 'registerUser').and.returnValue(of(r));
        spyOn(router, 'navigate').and.stub();
        spyOn(snackBar, 'open').and.stub();
    
        component.registerForm.setValue({
            firstName: 'John',
            lastName: 'Doe',
            email: 'test@example.com',
            password: 'password',
            confirm: 'password'
        });
    
        component.registerUser(component.registerForm.value);
    
        expect(authService.registerUser).toHaveBeenCalledOnceWith('api/accounts/registration', {
            firstName: 'John',
            lastName: 'Doe',
            email: 'test@example.com',
            password: 'password',
            confirmPassword: 'password'
        });
        expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });

    it('should invalidate form when passwords do not match', () => {
        component.registerForm.setValue({
            firstName: 'Jane',
            lastName: 'Doe',
            email: 'jane@example.com',
            password: '123456',
            confirm: '654321'
        });
        fixture.detectChanges();
        expect(component.registerForm.hasError('mustMatch', ['confirm'])).toBeTrue();
    });

    it('should enable registration button only when form is valid', () => {
        const button = fixture.debugElement.nativeElement.querySelector('button[type="submit"]');
        expect(button.disabled).toBeTruthy();
        
        component.registerForm.setValue({
            firstName: 'Test',
            lastName: 'User',
            email: 'test@example.com',
            password: '123456',
            confirm: '123456'
        });
        fixture.detectChanges();
        
        expect(button.disabled).toBeFalsy();
    });
    
});