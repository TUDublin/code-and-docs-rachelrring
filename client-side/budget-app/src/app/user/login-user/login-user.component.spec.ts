import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginUserComponent } from './login-user.component';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { of } from 'rxjs';
import { AuthResponseDto } from '../../_interfaces/response/AuthenticationResponseDto.model';
import { HarnessLoader } from '@angular/cdk/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

describe('LoginUserComponent', () => {
    let component: LoginUserComponent;
    let fixture: ComponentFixture<LoginUserComponent>;
    let authServiceSpy: jasmine.SpyObj<AuthenticationService>;
    let route: ActivatedRoute;
    let router: Router;

    beforeEach(async () => {
        const authServiceSpyObj = jasmine.createSpyObj('AuthenticationService', ['loginUser', 'sendAuthStateChangeNotification']);
        await TestBed.configureTestingModule({
            imports: [
                LoginUserComponent,
                NoopAnimationsModule,
                RouterLink,
                RouterTestingModule.withRoutes([]),
            ],
            providers: [
                {
                    provide: ActivatedRoute, useValue: {
                        snapshot: {
                            queryParams: {
                                returnUrl: '/login'
                            }
                        }
                    }
                },
                { provide: AuthenticationService, useValue: authServiceSpyObj },
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(LoginUserComponent);
        component = fixture.componentInstance;
        authServiceSpy = TestBed.inject(AuthenticationService) as jasmine.SpyObj<AuthenticationService>;
        route = TestBed.inject(ActivatedRoute);
        fixture.detectChanges();
    });
    beforeEach(() => {
        router = TestBed.get(Router);
        route = TestBed.get(ActivatedRoute);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize login form', () => {
        expect(component.loginForm).toBeDefined();
        expect(component.loginForm.get('username')).toBeDefined();
        expect(component.loginForm.get('password')).toBeDefined();
    });

    it('should navigate to returnUrl after successful login', async () => {
        const submitButton = fixture.debugElement.nativeElement.querySelector('button[type="submit"]');
        const inputFieldUsername = fixture.debugElement.nativeElement.querySelector('#username');
        const passwordInput = fixture.debugElement.nativeElement.querySelector('#password');

        inputFieldUsername.value = 'testUser@email.com';
        passwordInput.value = 'Password1!';

        submitButton.click();

        const authResponse: AuthResponseDto = {
            accessToken: 'fakeAccessToken',
            tokenType: '',
            expiresIn: 0,
            refreshToken: ''
        };

        authServiceSpy.loginUser.and.returnValue(of(authResponse));
        expect(router.url).toBe('/');
    });

    it('should display an error message when login fails', () => {
        const loginErrorResponse = new HttpErrorResponse({
            error: 'Login failed',
            status: 401
        });
        authServiceSpy.loginUser.and.returnValue(throwError(() => loginErrorResponse));
        component.loginUser(component.loginForm.value);
        fixture.detectChanges();
        expect(component.showError).toBeTrue();
        const errorAlert = fixture.debugElement.nativeElement.querySelector('.alert-danger');
        expect(errorAlert.textContent).toContain('You are unable to log in at this time.');
    });

    it('should navigate to default route when no returnUrl is provided', () => {
        route.snapshot.queryParams['returnUrl'] = undefined;
        spyOn(router, 'navigate');
        authServiceSpy.loginUser.and.returnValue(of({
            accessToken: 'fakeAccessToken',
            tokenType: '',
            expiresIn: 0,
            refreshToken: ''
        }));
        component.loginUser(component.loginForm.value);
        expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });

    it('should validate password field correctly for empty input', () => {
        const passwordInput = component.loginForm.controls['password'];
        passwordInput.setValue('');
        expect(passwordInput.valid).toBeFalse();
        expect(passwordInput.errors?.['required']).toBeTruthy();
    });
});